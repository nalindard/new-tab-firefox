// Asks the background script to tint the browser to match this page
(function () {
    const browser = chrome

    // Skips the message entirely when dynamic theming is switched off
    async function updateTheme() {
        const { 'dynamic-theme': enabled } = await browser.storage.local.get('dynamic-theme')
        if (enabled === false) return
        const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        browser.runtime.sendMessage({ from: 'content_script', duty: 'updateTheme', color_scheme: colorScheme })
    }

    updateTheme()
    window.addEventListener('focus', updateTheme)
})()
