/* Injections for /students/cours */

$(window).on('load', () => {

    $('#main .pointer').each((i, el) => {
    
        let parent = $(el).parent().find('> ol')
        parent.addClass('flipped')

        $(el).on('click', {p: parent}, (ev) => {
            $(ev.data.p).toggleClass('flipped')
        })
    })
})

// EOF