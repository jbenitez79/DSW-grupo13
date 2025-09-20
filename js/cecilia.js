document.addEventListener('DOMContentLoaded', function() {
    // Modal flotante después de 3 segundos
    setTimeout(() => {
        const modalBg = document.createElement('div');
        modalBg.className = 'modal-bg';
        const modal = document.createElement('div');
        modal.className = 'modal-window';

        const text = document.createElement('p');
        text.textContent = 'pasaste el mouse sobre la imagen de perfil?';

        const btnSi = document.createElement('button');
        btnSi.textContent = 'si';

        const btnNo = document.createElement('button');
        btnNo.textContent = 'no';

        modal.appendChild(text);
        modal.appendChild(btnSi);
        modal.appendChild(btnNo);
        modalBg.appendChild(modal);
        document.body.appendChild(modalBg);

        btnSi.addEventListener('click', () => {
            document.body.removeChild(modalBg);
        });

        btnNo.addEventListener('click', () => {
            let countdown = 3;
            text.textContent = `hacelo en ${countdown}`;
            btnSi.style.display = 'none';
            btnNo.style.display = 'none';

            const interval = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    text.textContent = `hacelo en ${countdown}`;
                } else {
                    clearInterval(interval);
                    if (document.body.contains(modalBg)) {
                        document.body.removeChild(modalBg);
                    }
                }
            }, 1000);
        });
    }, 3000);

    // Animar color del texto de habilidades
    const habilidades = document.querySelector('.habilidades');
    if (habilidades) {
        const colors = ['#fa541c', '#722ed1', '#52c41a', '#1890ff', '#eb2f96'];
        let colorIndex = 0;
        setInterval(() => {
            habilidades.style.transition = 'color 0.5s';
            habilidades.style.color = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }, 3000);
    }

});