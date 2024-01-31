// Open settings page

(async () => {
    await browser.tabs.create({ url: '/settings/index.html' })
    window.close()
})()