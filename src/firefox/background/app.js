// Define default theme on addon installation

const DEFAULT_THEMES = {
    alv: {
        color_scheme: `:root {
            --bdv-bg-color: #18181a !important;
            --bdv-bg-color-2: #232327 !important;
            --bdv-fg-color: #F8F8F2 !important;
            --bdv-error-color: #FF5555 !important;
            --bdv-border-radius: 10px !important;
            --bdv-accent-color: var(--school-accent) !important;
            --bdv-gap: 10px !important;
            --bdv-ext-gap: 10px !important;
            --bdv-logo-border: 10px !important;
        }`,
        accent_override: false,
        disable_logo: true,
        logo: '$school'
    },

    bdv: {
        color_scheme: `:root {
            --bdv-bg-color: #18181a !important;
            --bdv-bg-color-2: #232327 !important;
            --bdv-fg-color: #F8F8F2 !important;
            --bdv-error-color: #FF5555 !important;
            --bdv-accent-color: var(--school-accent) !important;
            --bdv-border-radius: 10px !important;
            --bdv-gap: 10px !important;
            --bdv-ext-gap: 10px !important;
            --bdv-logo-border: 10px !important;
        }`,
        accent_override: false,
        disable_logo: true,
        logo: 'generic.png'
    },

    new: {
        color_scheme: `:root {
            --bdv-bg-color: #18181a !important;
            --bdv-bg-color-2: #232327 !important;
            --bdv-fg-color: #F8F8F2 !important;
            --bdv-accent-color: #ee5256 !important;
            --bdv-error-color: #FF5555 !important;
            --bdv-border-radius: 10px !important;
            --bdv-gap: 10px !important;
            --bdv-ext-gap: 10px !important;
            --bdv-logo-border: 0px !important;
        }`,
        accent_override: true,
        disable_logo: true,
        logo: 'bdv.png'
    }
}

// Default configuration
const REFRESH_ON_INSTALL = true
const OPEN_SETTINGS_ON_INSTALL = false
const DEFAULT_THEME = DEFAULT_THEME.new

browser.runtime.onInstalled.addListener(async () => {

    // Save a default scheme
    console.log('Saving default settings to storage')
    await browser.storage.sync.set(DEFAULT_THEME)

    // Open settings page
    if (OPEN_SETTINGS_ON_INSTALL)
        await browser.tabs.create({ url: 'settings/index.html' })

    // Refresh opened tabs
    if (REFRESH_ON_INSTALL) {
        let tabs = await browser.tabs.query({ url: [
            '*://www.leonard-de-vinci.net/*',
            '*://adfs.devinci.fr/adfs/ls/*',
            '*://learning.devinci.fr/*'
        ]})
        
        tabs.forEach(async tab => await browser.tabs.reload(tab.id))
    }
})