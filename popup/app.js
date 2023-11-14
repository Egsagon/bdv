

const css = browser.extension.getURL('injections/css/base.css')

const edt = document.querySelector('#edit')
const btn = document.querySelector('#button')

btn.addEventListener('click', () => {
    // Toggle button

    btn.classList.toggle('on')

    // Apply to page (TODO)
    // tabs = browser.tabs.query({url: []})
})

edt.addEventListener('click', async () => {
    // Update button style

    await browser.runtime.openOptionsPage()
})

// EOF