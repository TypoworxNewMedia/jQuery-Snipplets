$('.carousel.rtl, .carousel[data-direction="rtl"]').each(function() {
    $('.left carousel-control, a[data-slide="prev"]').first().click(function (e) {
        e.preventDefault();
        $(this).parents('.carousel').carousel('next');
        e.stopPropagation();
    });

    $('.right carousel-control, a[data-slide="next"]').first().click(function (e) {
        e.preventDefault();
        $(this).parents('.carousel').carousel('prev');
        e.stopPropagation();
    });
});
