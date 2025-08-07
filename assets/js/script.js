$(document).ready(function() {
    $('.toggle-paper-btn').on('click', function() {
        const content = $(this).siblings('.full-paper-content');
       
        content.slideToggle(400);
        if ($(this).text() === 'Leer Paper Completo') {
            $(this).text('Ocultar Paper');
        } else {
            $(this).text('Leer Paper Completo');
        }
    });

    $('.gallery-item a').on('click', function(event) {
        event.preventDefault();

        const imageUrl = $(this).attr('href');

        $('#modalImage').attr('src', imageUrl);

        const galleryModal = new bootstrap.Modal($('#galleryModal'));
        galleryModal.show();
    });

    $('#petType').on('change', function() {
        const otherTypeWrapper = $('#otherPetTypeWrapper');
        const otherTypeInput = $('#otherPetType');

        if ($(this).val() === 'otro') {
            otherTypeWrapper.slideDown();
            otherTypeInput.prop('required', true);
        } else {
            otherTypeWrapper.slideUp();
            otherTypeInput.prop('required', false);
        }
    });

    $('#paperSubmissionForm').on('submit', function(event) {
        event.preventDefault();
        
        const form = $(this);
        let isFormValid = true;
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

        if (form[0].checkValidity() === false || !isFormValid) {
            event.stopPropagation();
        } else {
            alert('¡Gracias! Hemos recibido el paper y la foto para su revisión. Nuestro comité editorial (y de siestas) se pondrá a ello.');
            form[0].reset();
            form.removeClass('was-validated');
            $('#otherPetTypeWrapper').slideUp();
            $('#otherPetType').prop('required', false);
            invalidFeedback.html('Por favor, sube una foto de tu mascota en formato JPG o PNG.');
            return;
        }
        form.addClass('was-validated');
    });

});