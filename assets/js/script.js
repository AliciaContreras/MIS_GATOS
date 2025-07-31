// Espera a que el documento esté completamente cargado para ejecutar el script.
$(document).ready(function() {

    // --- Lógica para el Acordeón de "Leer Paper Completo" ---
    // Selecciona todos los botones con la clase 'toggle-paper-btn'
    $('.toggle-paper-btn').on('click', function() {
        // Encuentra el contenido oculto que es hermano del botón
        const content = $(this).siblings('.full-paper-content');
        
        // Alterna la visibilidad del contenido con una animación de deslizamiento
        content.slideToggle(400); // La animación dura 400 milisegundos

        // Cambia el texto del botón para reflejar la acción actual
        if ($(this).text() === 'Leer Paper Completo') {
            $(this).text('Ocultar Paper');
        } else {
            $(this).text('Leer Paper Completo');
        }
    });


    // --- Lógica para el Lightbox de la Galería ---
    // Selecciona todos los enlaces dentro de un item de la galería
    $('.gallery-item a').on('click', function(event) {
        // Previene el comportamiento por defecto del enlace (que es abrir la imagen en una nueva página)
        event.preventDefault();

        // Obtiene la URL de la imagen del atributo 'href' del enlace clickeado
        const imageUrl = $(this).attr('href');

        // Establece esa URL como la fuente de la imagen dentro del modal
        $('#modalImage').attr('src', imageUrl);

        // Crea una nueva instancia del modal de Bootstrap y lo muestra
        const galleryModal = new bootstrap.Modal($('#galleryModal'));
        galleryModal.show();
    });


    // --- Lógica para el Formulario de Envío de Papers ---

    // 1. Mostrar/ocultar el campo condicional para "especificar otro tipo de mascota"
    $('#petType').on('change', function() {
        const otherTypeWrapper = $('#otherPetTypeWrapper');
        const otherTypeInput = $('#otherPetType');

        if ($(this).val() === 'otro') {
            otherTypeWrapper.slideDown();
            otherTypeInput.prop('required', true); // Hacerlo requerido solo si es visible
        } else {
            otherTypeWrapper.slideUp();
            otherTypeInput.prop('required', false); // Quitar el 'required' si se oculta
        }
    });

    // 2. Validación completa del formulario al intentar enviarlo
    $('#paperSubmissionForm').on('submit', function(event) {
        event.preventDefault(); // Siempre prevenir el envío real del formulario
        
        const form = $(this);
        let isFormValid = true; // Variable para nuestra validación personalizada

        // Validación personalizada para el tipo de archivo de la foto
        const fileInput = $('#petPhoto')[0];
        const invalidFeedback = $(fileInput).next('.invalid-feedback');

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                invalidFeedback.html('Formato no válido. Solo se aceptan JPG y PNG.');
                isFormValid = false;
            }
        }

        // Si la validación de Bootstrap o nuestra validación personalizada fallan...
        if (form[0].checkValidity() === false || !isFormValid) {
            event.stopPropagation(); // Detener otros eventos
        } else {
            // Si el formulario es completamente válido...
            alert('¡Gracias! Hemos recibido el paper y la foto para su revisión. Nuestro comité editorial (y de siestas) se pondrá a ello.');
            
            // Limpiar el formulario para un nuevo envío
            form[0].reset();
            form.removeClass('was-validated');

            // Resetear los campos y mensajes personalizados
            $('#otherPetTypeWrapper').slideUp();
            $('#otherPetType').prop('required', false);
            invalidFeedback.html('Por favor, sube una foto de tu mascota en formato JPG o PNG.');
            return;
        }
        
        // Añadir la clase de Bootstrap para mostrar los mensajes de error de los campos inválidos
        form.addClass('was-validated');
    });

});