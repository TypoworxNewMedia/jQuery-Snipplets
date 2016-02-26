/*
 * trace coordinates
 */
$('img[usemap]').click(function(e){
    var offset = $(this).offset(),
        size = 8,
        mapX = Math.floor(e.pageX - offset.left),
        mapY = Math.floor(e.pageY - offset.top)
    ;

    console.log('RECT', [mapX, mapY, mapX+size, mapY+size].join(','));
    console.log('CIRCLE', [mapX, mapY, size].join(','));
});
