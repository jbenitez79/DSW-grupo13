(function () {
  const newParticlesPerFrame = 5;

  const color = (hsl, o) => `hsla(${Math.round(hsl.h)}, ${hsl.s}%, ${hsl.l}%, ${o})`;

  class TextSparks {
    constructor(selector = '.name-effect') {
      this.container = document.querySelector(selector);
      if (!this.container) {
        console.warn('TextSparks: no container found for selector', selector);
        return;
      }

      this.canvas = this.container.querySelector('canvas');
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
      }
      this.engine = this.canvas.getContext('2d');

      this.opa = 0;
      this.tick = 0;
      this.drawCB = null;
      this.mask = null;

      this.maskTick = 0;
      this.nextMaskCb = this.nextMask.bind(this);
      this.maskCache = [];
      this.particleMap = new Map();

      this.resize = this.resize.bind(this);
      window.addEventListener('resize', this.resize);

      this.resize();
      this.fetchData();
      if (!this.stack || this.stack.length === 0) {
        // nothing to render
        return;
      }
      this.buildStackCache();
    }

    fetchData() {
      this.stackId = -1;
      this.stack = [...this.container.querySelectorAll('ul')].map(ul => {
        return {
          ticks: 0.05 * (ul.hasAttribute('data-time') ? Number(ul.getAttribute('data-time')) : 0),
          fadeIn: ul.hasAttribute('data-fade-in') ? 50 / Number(ul.getAttribute('data-fade-in')) : 0,
          fadeOut: ul.hasAttribute('data-fade-out') ? 50 / Number(ul.getAttribute('data-fade-out')) : 0,
          texts: [...ul.querySelectorAll('li')].map(li => ({
            text: li.textContent || '',
            hsl: {
              h: li.hasAttribute('data-hue') ? Number(li.getAttribute('data-hue')) : 0,
              s: li.hasAttribute('data-saturation') ? Number(li.getAttribute('data-saturation')) : 100,
              l: li.hasAttribute('data-lightness') ? Number(li.getAttribute('data-lightness')) : 50
            }
          }))
        };
      });
    }

    resize() {
      const rect = this.container.getBoundingClientRect();
      this.width = Math.max(1, Math.floor(rect.width));
      this.height = Math.max(1, Math.floor(rect.height));

      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
    }

    buildStackCache() {
      this.maskCache = this.stack.map((stack) => this.buildTextMask(stack.texts));
    }

    buildTextMask(texts) {
      const mask = [];
      const textAll = texts.reduce((all, t) => all.concat(t.text), '');

      const size = 0.8;
      const width = 200;
      const height = Math.max(20, Math.floor(width / (this.width / (this.height || 1))));
      const baseFontSize = 20;

      const canvas = document.createElement('canvas');
      const engine = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      const font = s => `bold ${s}px Arial`;

      engine.fillStyle = '#000';
      engine.font = font(baseFontSize);
      const m = engine.measureText(textAll);
      const rel = m.width / (width * size) || 1;
      const fSize = Math.min(height * 0.8, Math.floor(baseFontSize / rel));

      engine.font = font(fSize);
      const fontWidth = engine.measureText(textAll).width;

      engine.fillText(textAll, (width - fontWidth) / 2, height / 2 + fSize * 0.35);

      let left = (width - fontWidth) / 2;
      const bot = height / 2 + fSize * 0.35;

      texts.forEach(textStack => {
        engine.clearRect(0, 0, width, height);
        engine.fillText(textStack.text, left, bot);
        left += engine.measureText(textStack.text).width;

        const data = engine.getImageData(0, 0, width, height);
        const subStack = [];

        for (let i = 0, max = data.width * data.height; i < max; i++) {
          if (data.data[i * 4 + 3]) {
            subStack.push({
              x: (i % data.width) / data.width,
              y: (i / data.width | 0) / data.height,
              o: Math.random(),
              t: Math.random()
            });
          }
        }

        mask.push({
          hsl: textStack.hsl,
          s: subStack
        });
      });

      return mask;
    }

    createNewParticle() {
      if (!this.mask) return;
      for (let i = 0; i < newParticlesPerFrame; i++) {
        const main = (Math.random() * this.mask.length) | 0;
        const subMask = this.mask[main];
        if (!subMask || !subMask.s || subMask.s.length === 0) continue;
        const maskElement = subMask.s[(Math.random() * subMask.s.length) | 0];
        if (maskElement) {
          const particle = {
            x: maskElement.x,
            y: maskElement.y,
            hsl: subMask.hsl,
            c: this.prepareParticle
          };
          this.particleMap.set(particle, particle);
        }
      }
    }

    clear() {
      this.engine.clearRect(0, 0, this.width, this.height);
    }

    randFromList(...rands) {
      return rands.reduce((acc, r) => acc + r, 0) / rands.length;
    }

    prepareParticle(particle) {
      const r1 = Math.random();
      const r2 = Math.random();
      const r3 = Math.random();
      const rad = r3 * Math.PI * 2;

      particle.x += (-0.5 + r1) / 300;
      particle.y += (-0.5 + r2) / 300;
      particle.si = 1 + (Math.random() * 4) | 0;
      particle.s = 0.003 + this.randFromList(r1, r2) / 10;
      particle.l = 0;

      particle.mx = Math.cos(rad) * (particle.s / (r1 < 0.05 ? 10 : 400));
      particle.my = Math.sin(rad) * (particle.s / (r1 < 0.05 ? 10 : 400));

      particle.c = this.drawParticle;
    }

    drawParticle(particle) {
      if (particle.l >= 1) { particle.c = null; return; }
      particle.l += particle.s;
      particle.x += particle.mx;
      particle.y += particle.my;
      this.engine.fillStyle = color(particle.hsl, this.opa * Math.sin(particle.l * Math.PI));
      this.engine.fillRect(particle.x * this.width, particle.y * this.height, particle.si, particle.si);
    }

    renderParticles() {
      this.particleMap.forEach((particle) => {
        particle.c.call(this, particle);
        if (!particle.c) this.particleMap.delete(particle);
      });
    }

    drawStatic() {
      let i = 0;
      this.mask.forEach(subMask => {
        subMask.s.forEach(pos => {
          i++;
          this.engine.fillStyle = color(subMask.hsl, (1 + Math.cos(pos.x * 5 * pos.y * 5 + this.tick / 10)) / 2 * this.opa * pos.t * 0.5);
          const cell = Math.max(1, Math.floor(this.width / 150));
          this.engine.fillRect(pos.x * this.width, pos.y * this.height, cell, cell);

          if (i % 2) return;

          pos.o += 0.01;
          const opa = Math.max(0, Math.sin(pos.o * Math.PI * 2));
          const padding = opa * this.width / 200;

          this.engine.fillStyle = color(subMask.hsl, this.opa * opa * 0.2);

          if (pos.t < 0.5) {
            this.engine.beginPath();
            this.engine.arc(pos.x * this.width, pos.y * this.height, this.width / 500 + padding, 0, Math.PI * 2);
            this.engine.fill();
          } else {
            this.engine.fillRect(pos.x * this.width - padding, pos.y * this.height - padding, this.width / 150 + padding * 2, this.width / 150 + padding * 2);
          }
        });
      });
    }

    draw() {
      this.tick++;
      this.nextMaskCb();
      this.createNewParticle();
      this.clear();

      this.engine.globalCompositeOperation = 'lighter';
      if (this.mask) this.drawStatic();
      this.renderParticles();
      this.engine.globalCompositeOperation = 'source-over';

      requestAnimationFrame(this.drawCB);
    }

    fadeInMask() {
      this.opa += this.stack[this.stackId].fadeIn;
      if (this.opa >= 1) { this.opa = 1; this.afterFadeIn(); }
    }

    afterFadeIn() {
      this.opa = 1;
      if (this.stack[this.stackId].ticks) {
        this.maskTick = 0;
        this.nextMaskCb = this.tickMask.bind(this);
      } else this.nextMaskCb = () => { };
    }

    fadeOutMask() {
      this.opa -= this.stack[this.stackId].fadeOut;
      if (this.opa <= 0) this.afterFadeOut();
    }

    afterFadeOut() {
      this.opa = 0;
      this.nextMaskCb = this.nextMask.bind(this);
    }

    tickMask() {
      this.maskTick++;
      if (this.maskTick >= this.stack[this.stackId].ticks) {
        if (this.stack[this.stackId].fadeOut) this.nextMaskCb = this.fadeOutMask.bind(this);
        else this.afterFadeOut();
      }
    }

    nextMask() {
      this.stackId++;
      if (this.stackId >= this.stack.length) this.stackId = 0;
      this.mask = this.maskCache[this.stackId];
      if (this.stack[this.stackId].fadeIn) this.nextMaskCb = this.fadeInMask.bind(this);
      else { this.opa = 1; this.afterFadeIn(); }
    }

    run() {
      if (!this.stack || this.stack.length === 0) return;
      this.drawCB = this.draw.bind(this);
      this.drawCB();
    }
  }

  // Auto init after DOM loaded
  document.addEventListener('DOMContentLoaded', () => {
    const sparks = new TextSparks('.name-effect');
    if (sparks) sparks.run();
  });

  // expose for debugging if needed
  window.TextSparks = TextSparks;
})();

document.addEventListener("DOMContentLoaded", () => {
  const toggleIcon = document.querySelector(".badgescard i");
  const extraCard = document.querySelector(".card.extra-info");

  toggleIcon.addEventListener("click", () => {
    extraCard.classList.toggle("show");

    if (extraCard.classList.contains("show")) {
      toggleIcon.classList.remove("fa-angle-down");
      toggleIcon.classList.add("fa-angle-up");
    } else {
      toggleIcon.classList.remove("fa-angle-up");
      toggleIcon.classList.add("fa-angle-down");
    }
  });
});