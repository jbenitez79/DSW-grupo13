document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa (ocultar/mostrar)
    const toggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('header nav ul');
    if (toggle && navList) {
        toggle.addEventListener('click', function() {
            navList.classList.toggle('open');
        });
    }
});