/* Injection for the presence /student/presences/<id> */


window.addEventListener('load', () => {

    setter = $('#set-presence')

    // Don't inject anything if presence is already set
    if (setter.css('display') !== 'none') return
    
    activate = document.createElement('button')
    activate.innerHTML = 'Automatic presence'
    activate.id = 'bdv-auto-presence'

    activate.addEventListener('click', ev => {
        inerval = setInterval(() => {
            activate.innerHTML = 'Refreshing...'

            // TODO - Fetch page or reload current page

        }, 5000)
    })

    $('#body_presence').append(activate)
})