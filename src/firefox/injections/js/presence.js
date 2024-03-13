/* Injection for the presence /student/presences/<id> */

const upload_presence = async (page_id) => {
    // Attempt to upload presence

    data = await $.ajax({
        url: 'upload.php',
        type: 'POST',
        data: {
            'act': 'set_present',
            'seance_pk': page_id
        },
        cache: false
    })
    
    console.log('Received data:', data)
    // eval(data)
}

window.addEventListener('load', () => {

    page_id = window.location.href.split('/').slice(-1)[0]

    // Don't inject anything if presence is already set
    if ($('#body_presence > div.alert-success').length) return

    activate = document.createElement('button')
    activate.innerHTML = 'Automatic presence'
    activate.id = 'bdv-auto-presence'

    activate.addEventListener('click', () => {

        // Toggle visibility
        activate.innerHTML = 'Automatic presence - ENABLED'
        activate.classList.toggle('active')

        if (!activate.classList.contains('active'))
            window.location.reload()

        setInterval(async () => {
            console.log('Attemping to upload presence')
            await upload_presence(page_id)
        }, 8000)
    })

    $('#body_presence').append(activate)
})