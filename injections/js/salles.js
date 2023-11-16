/* student/salles injections */

const validate_date = /^(?:(?:31(-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(-)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g

window.bdv.init(async () => {

    input = $('#select_day')
    input.val('')
    input.attr('placeholder', 'dd-mm-yyyy')

    $('#select_day_btn').html('OK')

    selector = $(`<select id="bdv-select">
        <option value=''>Tous</option>
        <option value='ARCH'>Arche</option>
        <option value='PULV'>PULV</option>
        <option value='NTES'>Nantes</option>
        <option value='CYBR'>Cyber</option>
    <select>`)
    
    selector.insertAfter(input)

    $('#select_day_btn').off('click')
    $('#select_day_btn').on('click', ev => {

        date = $('#select_day').val()
        env = $('#bdv-select').val()

        if (!date) $(location).attr('href', './env=' + env)

        if (!validate_date.test(date)) {
            // Prevent server call if date is invalid
            return alert('Invalid date. Please enter a date that has the following format:\ndd-mm-yyyy')
        }

        $(location).attr('href', `./day=${date}&env=${env}`)
    })

    // Parse filter
    filter = /env=([A-Z]{4})/g.exec(location.href)
    filter = filter?.length > 1 ? filter[1] : ''

    $('table tr').each((i, el) => {

        // Reformat title
        line = $(el).find('th a')[0]
        title = line.html().replace('((\[|\()\d*?(\)|\]))', '').trim()

        if (!title.startsWith(filter)) {
            // Delete
            $(el).remove()
        }
    })
})

// EOF