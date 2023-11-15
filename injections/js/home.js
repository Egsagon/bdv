// Injections for the home page and auth page


sidebar_icons = Object.entries({
    'Home page':                 'fa-solid fa-house',
    'Help center':               'fa-solid fa-circle-question',
    'Office portal':             'fa-brands fa-microsoft',
    'Intranet SI':               'fa-solid fa-comment',
    'DeVinci Learning':          'fa-solid fa-folder',
    'DeVinci Online':            'fa-solid fa-folder-minus',
    'Espace santé':              'fa-solid fa-heart',
    'DeVinci Innovation center': 'fa-solid fa-brain',
    'Promotions':                'fa-solid fa-star',
    'Digital learning center':   'fa-solid fa-share-nodes',
    'Vie du campus':             'fa-solid fa-tent',
    'Impressions':               'fa-solid fa-print',
    'Salles':                    'fa-solid fa-building',
    'Langues':                   'fa-solid fa-language'
})

navbar_icons = [
    // Honestly almost the same, this is just
    // for modding 
    'fa-solid fa-user',
    'fa-solid fa-hotel',
    'fa-solid fa-book-open',
    'fa-solid fa-briefcase',
    'fa-solid fa-flag',
    'fa-regular fa-map',
    'fa-solid fa-envelope',
    'fa-solid fa-ellipsis-vertical'
]

hello_sentences = [
    // @ = name placeholder
    'Welcome, @!',
    'Hello, @',
    'Hey, @!',
]

hello_icons = [
    'fa-solid fa-hand',
    'fa-solid fa-heart',
    'fa-solid fa-fire-flame-curved',
    'fa-solid fa-seedling',
    'fa-solid fa-wind'
]

window.addEventListener('load', async () => {

    // Check if we are on the auth page
    is_auth_page = Boolean($('body > .container').length)

    if (is_auth_page) {
        // We are on the auth page, we inject our own html
        
        document.wrappedJSObject.open('text/html') // Exploit because it's insecure
        document.write(await window.pork.fetch('injections/html/home.html'))
        document.close()
    }
    
    // Inject color scheme
    await window.pork.inject_scheme()

    if (is_auth_page) return

    // We are on the home page

    // Inject FA6
    $(document.head).append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">')

    // Set window title and favicon
    document.title = 'De Vinci - Dashboard'
    favicon = document.querySelector('.schoole_pastil img')
    $("link[rel='shortcut icon']").attr("href", favicon.src)

    // Set school icon color
    acc = window.pork.accent(favicon)
    code = `rgb(${acc.r}, ${acc.g}, ${acc.b})`
    document.documentElement.style.cssText = `--school-accent: ${code}`;
    $('.schoole_pastil').css('animation', 'swip forwards 1.5s')

    // Set hello message
    title = $('.navbar-inner-title')
    username = title.html().trim().split(' ')[0]

    hello_message = window.pork.choice(hello_sentences).replace('@', username)
    hello_icon = window.pork.choice(hello_icons)

    title.html(`${hello_message} <i class="hello ${hello_icon}"></i`)

    // Hide calendar minimap
    $('#b-button-7').click()

    // Replace sidebar buttons with FA icons
    $('.social-sidebar .menu .accordion-group a').each((i, el) => {
        icon = sidebar_icons[i]
        $(el).html(`<i title="${icon[0]}" class="${icon[1]}"></i>`)
    })

    // Make sure no sidebar icon is overflowing
    compute_bar()
    $(window).on('resize', compute_bar)

    // Show bar expand button
    $('.pork-toggler').each((i, el) => {el.remove()})

    $('.social-sidebar .menu').append(` 
    <div class="according-group pork-toggler">
        <div class="according-heading">
            <a class="accordion-toggle">
                <i class="fa-solid fa-bars"></i>
            </a>
        </div>
    </div>`
    )

    $(document.body).append(`<div class="sidebar-complement"></div>`)

    // Display hidden icons when asked
    $('.pork-toggler').on('click', () => {
        $('.sidebar-complement').toggleClass('active')
        compute_bar()
    })

    // Move nav indicators
    $('.site-menu').append($('.nav-indicators'))

    // Re-style indicators
    $('.site-menu a[data-toggle="dropdown"] i').each((i, el) => {
        $(el).removeClass()
        $(el).addClass(navbar_icons[i])
    })

    // Re-color school image
    pool = await browser.storage.sync.get()
    
    if (pool.accent_override) {

        canvas = document.createElement('canvas')
        canvas.width = favicon.width
        canvas.height = favicon.height

        ctx = canvas.getContext('2d')
        ctx.drawImage(favicon, 0, 0, 1, 1, 0, 0, 1, 1)
        data = ctx.getImageData(0, 0, favicon.width, favicon.height).data

        dominants = {}

        for(let i = 0; i < data.length; i += 4) {

            hex = window.pork.rgb_to_hex(data[i], data[i + 1], data[i + 2])

            if (!dominants[hex]) dominants[hex] = 0
            dominants[hex] += 1
        }

        console.log(dominants)

        // TODO - cache canvas
    }
})

compute_bar = () => {
    // Calculate how many items should be in the sidebar
    // Hidden ones will be transfered to .sidebar-complement

    item_size = 42 + 2 * 8
    bar_size = $('.social-sidebar').height()
    space = Math.floor(bar_size / item_size) - 1

    $('.social-sidebar .accordion-group:not(.pork-toggler)').each((i, el) => {
        $(el).css('display', i >= space ? 'none' : 'unset')
    })

    // Hidden elements are placed on a different box
    comp = $('.sidebar-complement')
    comp.empty()

    // Get items to show
    els = $('.social-sidebar .accordion-group:not(.pork-toggler)')

    els.each((i, el) => {
        if ($(el).css('display') === 'none') {
            clone = $(el).clone()
            clone.css('display', 'block')
            comp.append(clone)
        }
    })
}

// EOF