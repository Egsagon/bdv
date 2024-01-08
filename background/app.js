// Define default theme on addon installation

const OPEN_SETTINGS_ON_INSTALL = true

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

browser.runtime.onInstalled.addListener(async () => {

    // Save a default scheme
    console.log('Saving default settings to storage')
    await browser.storage.sync.set(DEFAULT_THEMES.new)

    // Open settings page
    if (OPEN_SETTINGS_ON_INSTALL)
        await browser.tabs.create({ url: 'settings/index.html' })
})