

$(window).on('load', async () => {

    input = $('#select_day')
    input.val('')
    input.attr('placeholder', 'dd-mm-yyyy')

    $('#select_day_btn').html('OK')

    selector = $(`<select id="pork-select">
    <option value=''>Tous</option>
        <option value='ARCH'>Arche</option>
        <option value='PULV'>PULV</option>
        <option value='NTES'>Nantes</option>
        <option value='CYBR'>Cyber</option>
    <select>`)
    
    selector.on('change', ev => {
        
        value = selector.val()

        if (location.href.includes('filter=')) {
            url = location.href.replace(/filter=(.*?)/g, value)
        }

        else {
            pre = location.href.includes('?') ? '&' : '?'
            url = location.href + pre + 'filter=' + value
        }

        location.replace(url)
    })
    
    selector.insertAfter(input)

    // Filter
    filter = /filter=(.*?)/g.exec(location.href)[0]
    console.log(filter)
    $('table th').each((i, el) => {

        salle = $(el)
        salle.html(salle.html().replace(/(\(|\[).*?(\)|\])/g, ''))

        if (salle.html().startsWith(filter[0])) {
        
        }
        else { 
            console.log('hiding', salle)
            salle.parent().css('display', 'none')
        }
    })

})