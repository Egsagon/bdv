const edit = document.querySelector('#edit')

edit.addEventListener('click', async () => {
    // Update button style

    await browser.runtime.openOptionsPage()
    window.close()
});

(async () => {
    // Load CSS

    // From injections/js/base.js
    pool = await browser.storage.sync.get()

        if (pool.color_scheme) {
            style = document.createElement('style')
            style.innerHTML = pool.color_scheme

            document.body.append(style)
        }
})()

// EOF