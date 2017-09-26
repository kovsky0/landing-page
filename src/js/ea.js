if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    onDocumentReady();
} else {
    document.addEventListener('DOMContentLoaded', onDocumentReady);
}

function onDocumentReady() {
    (function(l){var i,s={touchend:function(){}};for(i in s)l.addEventListener(i,s)})(document); // sticky hover fix in iOS

    document.querySelectorAll('.js-toggle-section-team').forEach(function(elem) {
        elem.addEventListener('click', function(event) {
            event.preventDefault();
            document.getElementsByClassName('section-team')[0].classList.toggle('section-team--expanded');
        });
    });

    document.querySelectorAll('.js-project-toggle').forEach(function(elem) {
        elem.addEventListener('click', function(event) {
            event.preventDefault();
            elem.parentNode.parentNode.classList.toggle('project--expanded');
        });
    });

    var submit = document.getElementsByClassName('contact-form__button');

    if (submit.length > 0) {
        submit[0].addEventListener('click', function() {
            document.getElementsByClassName('contact-form')[0].classList.add('was-validated');
        });
    }
}

