// More normal js yaaay

const css = document.documentElement.style

var clicks = 0
const reset_button = document.querySelector('#reset')

default_scheme = {
    'fg-color': '#F8F8F2',
    'bg-color': '#18181a',
    'bg-color-2': '#232327',
    'accent-color': '#cf0f51',
    'border-radius': '10',
    'gap': '10'
}

document.querySelectorAll('input').forEach(input => {

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
})

document.querySelector('#save').addEventListener('click', () => {
    // Save scheme

    let scheme = ''

    document.querySelectorAll('input').forEach(input => {

        scheme += `--pork-${input.id}: ${input.value}`
                + (input.id.includes('color') ? '' : 'px')
                + ';'
    })

    browser.storage.sync.set({
        color_scheme: ':root {' + scheme + '}'
    })

    console.log('[PORK] [options] Saved color scheme')
})

document.querySelector('form').addEventListener('submit', ev => {
    // Prevent submitions
    ev.preventDefault()
})


// Try load custom theme on load

; // DO NOT remove this code breaks otherwise

(async () => {

    pool = await browser.storage.sync.get()

    if (pool.color_scheme) {

        // Apply theme
        document.querySelectorAll('input').forEach(input => {

            rule = new RegExp(`--pork-${input.id}: (.*?)(px)?;`)
            input.value = rule.exec(pool.color_scheme)[1]

            // Update setting
            input.updater()
        })
    }
})()


// EOF