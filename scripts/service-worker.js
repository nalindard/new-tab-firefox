// @ts-check

const browser = chrome

// Keep in sync with TIMER_DURATIONS in new-tab.js
const TIMER_DURATIONS = { focus: 25 * 60 * 1000, break: 5 * 60 * 1000 }

// Ends a focus timer session, even when no new tab is open
browser.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name !== 'focus-timer') return
    const { 'timer-state': timer } = await browser.storage.local.get('timer-state')
    if (!timer?.endsAt || timer.endsAt - Date.now() > 1000) return

    const next = timer.mode === 'focus' ? 'break' : 'focus'
    await browser.storage.local.set({ 'timer-state': { mode: next, remaining: TIMER_DURATIONS[next], endsAt: null } })
    // After sleep or a restart the alarm can fire long after the session ended; move on without a stale alert
    if (Date.now() - timer.endsAt > 60 * 1000) return
    browser.notifications.create('focus-timer', {
        type: 'basic',
        iconUrl: browser.runtime.getURL('icons/icon-128.png'),
        title: timer.mode === 'focus' ? 'Focus session done' : 'Break is over',
        message: timer.mode === 'focus' ? 'Time for a break!' : 'Back to focus!',
    })
})

// Alarms may not survive a browser restart, so re-arm a session that is still running
browser.runtime.onStartup.addListener(async () => {
    const { 'timer-state': timer } = await browser.storage.local.get('timer-state')
    if (timer?.endsAt) browser.alarms.create('focus-timer', { when: Math.max(timer.endsAt, Date.now() + 1000) })
})

// Rapid page loads and focus changes are coalesced into one theme update per window
const themeTimers = new Map()
function scheduleThemeUpdate(colorScheme, windowId) {
    clearTimeout(themeTimers.get(windowId))
    themeTimers.set(windowId, setTimeout(() => {
        themeTimers.delete(windowId)
        updateTheme(colorScheme, windowId).catch(error => console.error('Theme update failed:', error))
    }, 250))
}

// Messages are answered synchronously; updateTheme runs in the background
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.duty !== 'updateTheme') {
        sendResponse({ reply: '200' })
        return
    }
    // Content scripts only theme the browser for the active tab
    if (message.from === 'content_script' && !sender.tab?.active) return
    if (message.from !== 'content_script' && message.from !== 'home_page') return

    scheduleThemeUpdate(message.color_scheme, sender.tab?.windowId)
    sendResponse({ reply: 'done' })
})

function rgbToHsl(r, g, b) {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
        else if (max === g) h = (b - r) / d + 2
        else h = (r - g) / d + 4
        h /= 6
    }

    return [h * 360, s * 100, l * 100]
}

function getShades(h, s, l, colorScheme) {
    if (colorScheme === 'dark') {
        const lum = Math.trunc(l)
        let sat = Math.trunc(s)
        if (!(lum > 90 || lum < 20)) sat = 75
        return `hsl(${Math.trunc(h)},${sat}%,12%)`
    }
    return `hsl(${Math.trunc(h)},20%,50%)`
}

function averageColor(dataUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            // A small copy is enough for an average and far cheaper than every screenshot pixel
            const canvas = document.createElement('canvas')
            canvas.width = 64
            canvas.height = Math.max(1, Math.round(64 * img.height / img.width))
            const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'))
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
            const pixels = data.length / 4
            let r = 0, g = 0, b = 0
            for (let i = 0; i < data.length; i += 4) {
                r += data[i]
                g += data[i + 1]
                b += data[i + 2]
            }
            resolve([Math.floor(r / pixels), Math.floor(g / pixels), Math.floor(b / pixels)])
        }
        img.onerror = reject
        img.src = dataUrl
    })
}

async function updateTheme(colorScheme = '', windowId) {
    const settings = await browser.storage.local.get(['dynamic-theme', 'last_color_scheme'])
    if (settings['dynamic-theme'] === false) return

    if (colorScheme !== 'dark' && colorScheme !== 'light') colorScheme = settings['last_color_scheme'] || 'dark'

    const screenshot = await browser.tabs.captureVisibleTab(windowId, { format: 'jpeg', quality: 50, scale: 0.1 })
    const [r, g, b] = await averageColor(screenshot)
    const [h, s, l] = rgbToHsl(r, g, b)
    const hslShade = getShades(h, s, l, colorScheme)
    const shade = colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)'
    const textColor = 'white'

    const theme = {
        colors: {
            frame: hslShade,
            icons: textColor,
            icons_attention: shade,
            popup: hslShade,
            popup_text: textColor,
            popup_border: shade,
            popup_highlight_text: textColor,
            bookmark_text: textColor,
            toolbar: shade,
            toolbar_frame: shade,
            toolbar_field: hslShade,
            toolbar_field_border_focus: shade,
            toolbar_field_border: hslShade,
            toolbar_field_text: textColor,
            tab_text: textColor,
            tab_background_text: textColor,
            tab_background_separator: shade,
            tab_line: 'rgba(255,255,255,0.1)',
            tab_loading: shade,
            tab_selected: shade,
            sidebar: hslShade,
            sidebar_highlight: shade,
            sidebar_highlight_text: textColor,
            sidebar_text: textColor,
            button_background_active: shade,
            button_background_hover: shade,
        }
    }
    // @ts-ignore
    await (windowId === undefined ? browser.theme.update(theme) : browser.theme.update(windowId, theme))
    await browser.storage.local.set({ last_color_scheme: colorScheme })
}
