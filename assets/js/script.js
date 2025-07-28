$(document).ready(function() {

    // --- Lógica para el Acordeón de "Leer Paper Completo" ---
    $('.toggle-paper-btn').on('click', function() {
        // Encuentra el contenido oculto dentro del mismo card-body
        const content = $(this).siblings('.full-paper-content');
        
        // Alterna la visibilidad con una animación de deslizamiento
        content.slideToggle(400); // 400 milisegundos de animación

        // Cambia el texto del botón
        if ($(this).text() === 'Leer Paper Completo') {
            $(this).text('Ocultar Paper');
        } else {
            $(this).text('Leer Paper Completo');
        }
    });


    // --- Lógica para el Lightbox de la Galería ---
    $('.gallery-item a').on('click', function(event) {
        // Prevenir el comportamiento por defecto (que es abrir el enlace de la imagen)
        event.preventDefault();

        // Obtener la URL de la imagen del enlace en el que se hizo clic
        const imageUrl = $(this).attr('href');

        // Poner esa URL en la imagen dentro del modal
        $('#modalImage').attr('src', imageUrl);

        // Crear una nueva instancia del modal de Bootstrap y mostrarlo
        const galleryModal = new bootstrap.Modal($('#galleryModal'));
        galleryModal.show();
    });

});