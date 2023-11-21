// Injection for the dashboard and auth page

const image_precision = 90

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

window.bdv.init(async (pool) => {

    if ($('body > .container').length) {
        // We are on the auth page, we inject our own html

        html = await window.bdv.fetch('injections/html/home.html')
        
        if (pool.id) {
            window.bdv.log('Autofilling id')
            html = html.replace('// {{ id }}', `$("#log")[0].value="${pool.id}"`)
        }

        window.bdv.log('Replacing auth page html')
        document.wrappedJSObject.open('text/html') // Exploit because it's insecure
        document.write(html)
        document.close()

        window.addEventListener('bdv-id-ok', async data => {
            // Save id
            window.bdv.log('Saving id')
            await browser.storage.sync.set({'id': data.detail})
        })

        return
    }

    // Inject FA6
    $(document.head).append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">')

    // Set window title and favicon
    document.title = 'De Vinci - Dashboard'
    favicon = document.querySelector('.schoole_pastil img')
    $("link[rel='shortcut icon']").attr("href", favicon.src)

    // Set school icon color
    acc = window.bdv.accent(favicon)
    code = `rgb(${acc.r}, ${acc.g}, ${acc.b})`
    document.documentElement.style.cssText = `--school-accent: ${code}`;
    window.bdv.log('Evaluated school accent color to ' + code)

    // Set hello message
    title = $('.navbar-inner-title')
    
    // Get an appropriate page title from the page URL
    page = /.*\/\?my=(.*?)(?:$|&)|.*\/([a-zA-Z-_]+?)(?:$|\/)/g
           .exec(location.href)?.slice(-1)[0]

    if (!page) {
        username = title.html().trim().split(' ')[0]

        header = `${window.bdv.choice(hello_sentences).replace('@', username)
                    } <i class="hello ${window.bdv.choice(hello_icons)}"></i`
    }

    else {
        header = `<i class="hello fa-solid fa-circle-chevron-right"></i> ${
                page.charAt(0).toUpperCase() + page.slice(1)}`
    }

    title.html(header)

    // Hide calendar minimap
    $('#b-button-7').click()

    // Replace sidebar buttons with FA icons
    $('.social-sidebar .menu .accordion-group a').each((i, el) => {
        icon = sidebar_icons[i]
        $(el).html(`<i title="${icon[0]}" class="${icon[1]}"></i>`)
    })

    // Add sidebar titles
    $('.social-sidebar .accordion-group').each((i, el) => {
        // Note - $().data does not work
        el.dataset.title = $(el).find('i').attr('title')
    })

    // Make sure no sidebar icon is overflowing
    compute_bar()
    $(window).on('resize', compute_bar)

    // Show bar expand button
    $('.bdv-toggler').each((i, el) => {el.remove()})

    $('.social-sidebar .menu').append(`
    <div class="according-group bdv-toggler">
        <div class="according-heading">
            <a class="accordion-toggle">
                <i class="fa-solid fa-bars"></i>
            </a>
        </div>
    </div>`
    )

    $(document.body).append(`<div class="sidebar-complement-wrapper">
                                <div class="sidebar-complement"></div>
                             </div>`)

    // Display hidden icons when asked
    $('.bdv-toggler').on('click', () => {
        $('.sidebar-complement-wrapper').toggleClass('active')
        compute_bar()
    })

    $('.sidebar-complement-wrapper').on('click', () => {
        $('.sidebar-complement-wrapper').removeClass('active')
    })

    // Move nav indicators
    $('.site-menu').append($('.nav-indicators'))

    // Re-style indicators
    $('.site-menu a[data-toggle="dropdown"] i').each((i, el) => {
        $(el).removeClass()
        $(el).addClass(navbar_icons[i])
    })

    // Re-color school image

    hex = '#000000'
    if (pool.color_scheme?.includes('accent-color: #')) {
        hex =  /accent-color: #(.*?) /g.exec(pool.color_scheme)[1]
    }

    rgb = window.bdv.hex_to_rgb(hex)

    if (pool.accent_override && rgb !== null) {
        window.bdv.log('Modifying school logo with color ' + hex)

        /* Note - The source image is 28x28px so there will be a 1px border around the
           canvas, which we need to fill. Our output is 30x30px originally because of the
           10px border (30px+2*10px = 50px = sidebar width = navbar height) */

        canvas = document.createElement('canvas')
        canvas.width = 30
        canvas.height = 30

        ctx = canvas.getContext('2d')
        ctx.fillStyle = 'green'
        ctx.fillRect(0, 0, 30, 30)

        ctx.drawImage(favicon, -1, -1, favicon.width, favicon.height,
                               0, 0, canvas.width, canvas.height)
        
        image = ctx.getImageData(0, 0, favicon.width, favicon.height)

        for (var i = 0; i < image.data.length; i += 4) {

            if (
                image.data[i    ] < image_precision ||
                image.data[i + 1] < image_precision ||
                image.data[i + 2] < image_precision
            ) {
                image.data[i    ] = rgb.r
                image.data[i + 1] = rgb.g
                image.data[i + 2] = rgb.b
            }
        }

        ctx.putImageData(image, 0, 0)

        $('.schoole_pastil img').replaceWith(canvas)
    }

    // Startpage mode
    if (location.href.includes('startpage=1')) {
        // TODO - change css bdv ext gaps
        // TODO - put that in options ui

        gap = pool.ext_gap || 80
        $('html')[0].style.setProperty('--bdv-ext-gap', gap + 'px')
        
        spbg = document.createElement('div')
        spbg.id = 'spbg'
        document.body.appendChild(spbg)
        // $('html').css('background-color', '--bdv-sp-color')
    }

    /*
        Further injection
        ...
    */

    if (!pool.disable_logo) {setTimeout(() => {
        $('.schoole_pastil').css('animation', 'swip forwards 1.5s')
    }, 500)}
})

compute_bar = () => {
    // Calculate how many items should be in the sidebar
    // Hidden ones will be transfered to .sidebar-complement

    item_size = 42 + 2 * 8
    bar_size = $('.social-sidebar').height()
    space = Math.floor(bar_size / item_size) - 1

    $('.social-sidebar .accordion-group:not(.bdv-toggler)').each((i, el) => {
        $(el).css('display', i >= space ? 'none' : 'unset')
    })

    // Hidden elements are placed on a different box
    comp = $('.sidebar-complement')
    comp.empty()

    // Get items to show
    els = $('.social-sidebar .accordion-group:not(.bdv-toggler)')

    els.each((i, el) => {
        if ($(el).css('display') === 'none') {
            clone = $(el).clone()
            clone.css('display', 'block')
            comp.append(clone)
        }
    })
}

// EOF