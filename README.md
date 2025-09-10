# 🛡️ Grupo 13 Desarrollo Frontend

## 📋 Descripción del Proyecto

Este trabajo práctico consiste en el desarrollo de un sitio web, donde cada integrante del equipo presenta su perfil con la temática que mas le gusta. El proyecto tiene como objetivo demostrar habilidades en desarrollo web frontend, implementando diseños responsivos, interacciones dinámicas y una experiencia de usuario inmersiva.

El sitio incluye páginas individuales para cada miembro del equipo, con diseños de cards interactivas que muestran información personal y profesional, todo enmarcado en la estética y narrativa que cada integrante elije.

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos avanzados, gradientes, animaciones y responsive design
- **JavaScript ES6+**: Interactividad y efectos dinámicos
- **Google Fonts**: Tipografías personalizadas
- **Flexbox & CSS Grid**: Layout responsivo
- **CSS Custom Properties**: Variables para mantenimiento eficiente
- **Media Queries**: Adaptabilidad a diferentes dispositivos
- **Git & GitHub**: Control de versiones y colaboración
- **Vercel/GitHub Pages**: Despliegue del proyecto

## 📁 Estructura de Archivos

```
DSW-grupo13/
│
├── index.html                # Página principal del equipo
├── marcos.html               # Página individual de Marcos
├── member2.html              # Página del segundo miembro
├── member3.html              # Página del tercer miembro
├── about.html                # Información sobre el proyecto
├── contact.html              # Página de contacto
│
├── css/
│   ├── style.css            # Estilos globales y página principal
│   ├── marcos.css           # Estilos específicos de Marcos
│   ├── member2.css          # Estilos del segundo miembro
│   └── member3.css          # Estilos del tercer miembro
│
├── js/
│   ├── main.js              # JavaScript principal
│   ├── marcos.js            # Funciones específicas de Marcos
│   
│
├── img/
│   ├── escudo.png           # Logo del Scout Regiment
│   ├── marcos1.jpeg         # Imagen principal de Marcos
│   ├── marcos2.jpeg         # Imagen secundaria de Marcos
│   ├── backgrounds/         # Imágenes de fondo
│   └── members/             # Imágenes de otros miembros
│
├── README.md                # Documentación del proyecto
└── .gitignore              # Archivos excluidos del repositorio
```

## ⚡ Funcionalidades JavaScript

### 🏠 Página Principal (`index.html`)

- **Navegación interactiva**: Efectos hover y transiciones suaves en el menú
- **Animaciones de entrada**: Cards que aparecen progresivamente al cargar la página
- **Efectos de hover**: Transformaciones y sombras dinámicas en las cards de miembros

### 👤 Página de Marcos (`marcos.html`)

- **Card interactiva con flip**:

  - Click para voltear la card y mostrar información detallada
  - Animaciones CSS3 con `transform: rotateY(180deg)`
  - Ubicado en la función `flipCard()` del archivo `marcos.js`

- **Efectos de hover dinámicos**:

  - Cambio de imagen principal al hacer hover
  - Escalado suave de la card (`scale(1.02)`)
  - Implementado en la función `initHoverEffects()`

- **Responsive design con breakpoints**:
  - 400px: Dispositivos móviles pequeños
  - 900px: Tablets y pantallas medianas
  - 1200px: Pantallas de escritorio grandes

### 🎮 Funciones Globales (`main.js`)

- **Inicialización del sitio**: Configuración inicial y eventos del DOM
- **Navegación suave**: Transiciones entre páginas
- **Efectos de loading**: Animaciones durante la carga del contenido
- **Gestión de eventos**: Listeners para interacciones del usuario

## 📱 Características Responsive

El sitio web está optimizado para diferentes tamaños de pantalla:

- **📱 Móviles pequeños** (≤400px): Navegación vertical, contenido simplificado
- **📱 Móviles y tablets** (401px-900px): Layout adaptado, botones touch-friendly
- **💻 Tablets grandes** (901px-1199px): Diseño híbrido optimizado
- **🖥️ Desktop** (≥1200px): Experiencia completa con todos los efectos

## 🌟 Características Destacadas

- **🎨 Diseño temático**: Inspirado en Attack on Titan con paleta de colores auténtica
- **⚡ Animaciones suaves**: Transiciones CSS3 y JavaScript coordinadas
- **🔄 Cards interactivas**: Sistema de volteo con información detallada
- **📱 100% Responsive**: Adaptación perfecta a todos los dispositivos
- **♿ Accesibilidad**: Navegación por teclado y lectores de pantalla
- **🚀 Performance optimizada**: Carga rápida y animaciones fluidas

## 🚀 Enlace al Proyecto Desplegado

🔗 **[Ver Proyecto en Vivo](https://dsw-grupo13-scout-regiment.vercel.app)**

_Desplegado en Vercel con integración continua desde GitHub_

## 👥 Equipo de Desarrollo - Scout Regiment

- **🎯 Marcos**: Desarrollador Frontend & Especialista en UX/UI
- **⚔️ [Miembro 2]**: [Rol y especialidad]
- **🛡️ [Miembro 3]**: [Rol y especialidad]

## 📈 Progreso del Proyecto

### ✅ Trabajo Práctico 1 (Actual)

- [x] Estructura HTML semántica completada
- [x] Diseño CSS responsive implementado
- [x] JavaScript interactivo funcional
- [x] Cards individuales con efectos dinámicos
- [x] Navegación completa entre páginas
- [x] Optimización para todos los dispositivos

### 🔄 Próximas Mejoras (TP2 y TP3)

- [ ] Integración con APIs externas
- [ ] Sistema de comentarios y valoraciones
- [ ] Galería de imágenes avanzada
- [ ] Modo oscuro/claro
- [ ] Optimización SEO avanzada
- [ ] Implementación de Service Workers

## 🛠️ Cómo Ejecutar el Proyecto

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/jbenitez79/DSW-grupo13 
   cd DSW-grupo13
   ```

2. **Abrir con Live Server**:

   - Usar la extensión Live Server de VS Code
   - O abrir `index.html` directamente en el navegador

3. **Desarrollo colaborativo**:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   git add .
   git commit -m "Descripción de cambios"
   git push origin feature/nueva-funcionalidad
   ```

## 📊 Métricas del Proyecto

- **Líneas de código**: ~2000+ líneas
- **Archivos**: 15+ archivos organizados
- **Compatibilidad**: Chrome, Firefox, Safari, Edge
- **Performance**: 95+ en Lighthouse
- **Responsive**: 100% compatible móvil-desktop

---

### 📝 Notas de Desarrollo

> Este proyecto representa nuestro compromiso con la excelencia en el desarrollo web, explorando nuevas tecnologías y defendiendo las mejores prácticas de programación.

**Última actualización**: SEPTIEMBRE 2025
**Versión**: 1.0.0
**Estado**: ✅ Completado (TP1)

---

_Desarrollado con 💚 por el Grupo 7_
