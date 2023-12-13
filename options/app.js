// More normal js yaaay

const css = document.documentElement.style

var clicks = 0
const reset_button = document.querySelector('#reset')

const settings = document.querySelectorAll('input:not(.bypass)')

const quotes = [
    // Random quotes to display in the minimap
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'How are you holding up? Because I\'m a potato. - Glados',
    'Space? Space! Spaace! Spaaaaaaaaaaaaaaaaaace!'
    // TODO - better quotes
]

default_scheme = {
    'fg-color': '#F8F8F2',
    'bg-color': '#18181a',
    'bg-color-2': '#232327',
    'accent-color': '#cf0f51',
    'border-radius': '10',
    'gap': '10',
    'ext-gap': '10'
}

log = (...msg) => console.log('%c[ BDV ] ' + msg, 'color: cyan')

settings.forEach(input => {

    let updater = () => {
        let unit = input.id.includes('color') ? '' : 'px'
        css.setProperty(`--${input.id}`, `${input.value}${unit}`)
    }

    input.updater = updater
    input.addEventListener('change', updater)
})
log('Hooked all updaters to settings')

document.querySelector('#reset').addEventListener('mouseup', () => {
    // Reset scheme

    for (let [id, value] of Object.entries(default_scheme)) {
        input = document.getElementById(id)
        input.value = value
        input.updater()
    }

    // Reset auto accent
    document.querySelector('#auto-accent').checked = true
    document.querySelector('#rotate-logo').checked = true
    document.querySelector('#accent-color').disabled = true
    document.querySelector('#logo-type').value= '$school'

    log('Settings reset amorced')
})

document.querySelector('#save').addEventListener('click', () => {
    // Save scheme

    let scheme = ''

    settings.forEach(input => {

        if (input.value) {
            scheme += `--bdv-${input.id}: ${input.value}`
                    + (input.id.includes('color') ? '' : 'px')
                    + ' !important;'
        }
    })

    auto = document.querySelector('#auto-accent')
    if (auto.checked) {
        scheme += '--bdv-accent-color: var(--school-accent);'
    }

    log('Computed CSS scheme: ' + scheme)

    logo_type_in = document.querySelector('#logo-type').value

    logo_type = undefined
    if (logo_type_in?.startsWith('$')) logo_type = logo_type_in
    else logo_type = 'injections/assets/' + logo_type_in

    browser.storage.sync.set({
        color_scheme: ':root {' + scheme + '}',
        accent_override: auto.checked,
        disable_logo: !document.getElementById('rotate-logo').checked,
        logo: logo_type
    }).then(async () => {
        
        log('Successfully saved scheme to storage')

        // Reload all opened target sites
        tabs = await browser.tabs.query({url: [
            '*://www.leonard-de-vinci.net/*',
            '*://adfs.devinci.fr/adfs/ls/*'
        ]})

        tabs.forEach(async tab => {
            log('Reloading target site: ' + tab.url)
            await browser.tabs.reload(tab.id)
        })

        alert('Scheme saved.')

    }, error => {
        alert('Operation failed:\n' + error)
        console.error('[bdv]', error)
    })
})

document.querySelector('form').addEventListener('submit', ev => {
    // Prevent submitions
    ev.preventDefault()
})

document.querySelector('#auto-accent').addEventListener('click', ev => {
    // Enable or disable accent setting

    document.querySelector('#accent-color').disabled = !ev.target.checked
})

// Try load custom theme on load

;/*~*/;(async () => {

    // Choose quote
    quote = quotes[Math.floor(Math.random() * quotes.length)]
    document.querySelector('#demo .main p').innerHTML = quote

    pool = await browser.storage.sync.get()

    if (pool.color_scheme) {

        log('Recovering stored color scheme')

        // Apply theme
        settings.forEach(input => {

            rule = new RegExp(`--bdv-${input.id}: (.*?)(px)? (!important)?;`)
            input.value = rule.exec(pool.color_scheme)[1]

            // Update setting
            input.updater()
        })

        // Apply boolean buttons
        document.querySelector('#rotate-logo').checked = !pool.disable_logo
        document.querySelector('#auto-accent').checked = pool.accent_override
        document.querySelector('#accent-color').disabled = !pool.accent_override
    }

    if (pool.logo) {
        if (pool.logo.startsWith('$')) {
            document.querySelector('#logo-type').value = pool.logo
        }
        else {
            fname = pool.logo.split('/').slice(-1)
            document.querySelector('#logo-type').value = fname
        }
    }
})()


// EOF