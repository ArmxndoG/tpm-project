document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarTrigger = document.querySelector('.sidebar-trigger');
    const dropdownTriggers = document.querySelectorAll('.sidebar-nav li.has-dropdown > a');

    // Hover para mostrar sidebar
    sidebarTrigger.addEventListener('mouseenter', () => {
        sidebar.classList.add('open');
    });

    // Ocultar sidebar al salir
    sidebar.addEventListener('mouseleave', () => {
        sidebar.classList.remove('open');
        // Cerrar todos los desplegables al cerrar el sidebar
        document.querySelectorAll('.sidebar-nav li.has-dropdown').forEach(item => {
            item.classList.remove('active');
        });
    });

    // Toggle para desplegables - Versión mejorada
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Evitar propagación
            
            console.log('Dropdown clicked'); // Log de depuración
            
            // Obtener el elemento li padre
            const parentItem = this.parentElement;
            
            // Comprobar si ya está activo
            const isActive = parentItem.classList.contains('active');
            
            // Primero cerrar todos los otros desplegables
            document.querySelectorAll('.sidebar-nav li.has-dropdown').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('active');
                }
            });
            
            // Luego activar/desactivar el actual
            if (isActive) {
                parentItem.classList.remove('active');
            } else {
                parentItem.classList.add('active');
            }
        });
    });
});