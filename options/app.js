// More normal js yaaay

const css = document.documentElement.style

var clicks = 0
const reset_button = document.querySelector('#reset')

const settings = document.querySelectorAll('input:not(#auto-accent)')

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
    'gap': '10'
}

settings.forEach(input => {

    let updater = () => {
        let unit = input.id.includes('color') ? '' : 'px'
        css.setProperty(`--${input.id}`, `${input.value}${unit}`)
    }

    input.updater = updater
    input.addEventListener('change', updater)
})

document.querySelector('#reset').addEventListener('mouseup', () => {
    // Reset scheme

    for (let [id, value] of Object.entries(default_scheme)) {
        input = document.getElementById(id)
        input.value = value
        input.updater()
    }

    // Reset auto accent
    document.querySelector('#auto-accent').checked = true
    document.querySelector('#accent-color').disabled = true
})

document.querySelector('#save').addEventListener('click', () => {
    // Save scheme

    let scheme = ''

    settings.forEach(input => {

        if (input.value) {
            scheme += `--pork-${input.id}: ${input.value}`
                    + (input.id.includes('color') ? '' : 'px')
                    + ' !important;'
        }
    })

    auto = document.querySelector('#auto-accent')
    if (auto.checked) {
        scheme += '--pork-accent-color: var(--school-accent);'
    }

    browser.storage.sync.set({
        color_scheme: ':root {' + scheme + '}'
    }).then(async () => {
        
        console.log('[PORK] [options] Saved color scheme')
        console.log(scheme)

        // Reload all opened target sites
        tabs = await browser.tabs.query({url: [
            '*://www.leonard-de-vinci.net/*',
            '*://adfs.devinci.fr/adfs/ls/*'
        ]})

        tabs.forEach(async tab => {
            console.log('Reloading', tab.url)
            await browser.tabs.reload(tab.id)
        })

        alert('Scheme saved.')

    }, error => {
        alert('Saving failed:\n' + error)
        console.error('[PORK] [options]', error)
    })

})

document.querySelector('form').addEventListener('submit', ev => {
    // Prevent submitions
    ev.preventDefault()
})

document.querySelector('#auto-accent').addEventListener('click', ev => {
    // Enable or disable accent setting

    document.querySelector('#accent-color').disabled = ev.target.checked
})

// Try load custom theme on load

; // DO NOT remove this code breaks otherwise

(async () => {

    // Choose quote
    quote = quotes[Math.floor(Math.random() * quotes.length)]
    document.querySelector('#demo .main p').innerHTML = quote

    pool = await browser.storage.sync.get()

    if (pool.color_scheme) {

        // Apply theme
        settings.forEach(input => {

            rule = new RegExp(`--pork-${input.id}: (.*?)(px)? (!important)?;`)
            input.value = rule.exec(pool.color_scheme)[1]

            // Update setting
            input.updater()
        })
    }
})()


// EOF