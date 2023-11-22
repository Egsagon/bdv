/* Injections for /students/cours */

/*
    Retract pointers level
    0 - Deploy all
    1 - Deploy track and termes
    2 - Deploy track
*/
const retract_level = 1

$(window).on('load', () => {

    $('#main .pointer').each((i, el) => {
    
        let parent = $(el).parent().find('> ol')
        parent.addClass('flipped')

        $(el).on('click', {p: parent}, (ev) => {
            $(ev.data.p).toggleClass('flipped')
        })
    })

    ;/*~*/;['ue', 'terme', 'track'].slice(retract_level).forEach(cls => {
        $(`#main .pointer.collapse_${cls}`).each((i, el) => {
            console.log('Showing', el.classList)
            $(el).parent().find('> ol').removeClass('flipped')
        })  
    })
})

// EOF