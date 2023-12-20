// Define setting on app install

browser.runtime.onInstalled.addListener(async () => {

    // Save a default scheme
    console.log('Saving default settings to storage')
    await browser.storage.sync.set({
        color_scheme: ':root {--bdv-fg-color: #f8f8f2 !important;--bdv-bg-color: #18181a !important;--bdv-bg-color-2: #232327 !important;--bdv-accent-color: #cf0f51 !important;--bdv-border-radius: 10px !important;--bdv-gap: 10px !important;--bdv-ext-gap: 10px !important;}',
        accent_override: false,
        disable_logo: false
    })

    // Open settings page
    await browser.tabs.create({ url: 'settings/index.html' })
})