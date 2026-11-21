const DEFAULT_SETTINGS = {
    'show-clock': true,
    'clock-24h': false,
    'show-greeting': true,
    'show-photo-info': true,
    'dynamic-theme': true,
    'wallpaper-shuffle': false,
    'bing-region': 'us',
    'topsites-enabled': true,
    'widgets-enabled': true,
    'widgets-position': 'below',
    'widget-weather': false,
    'widget-tasks': true,
    'widget-timer': true,
    'widget-date': true,
    'weather-unit': 'celsius',
    'weather-near-clock': false,
}
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const TOPSITES_LIMIT = 7
const MAX_TASKS = 20
const MAX_WALLPAPERS = 12
const WEATHER_CACHE_MS = 30 * 60 * 1000
const BING_FEED_TTL_MS = 6 * 60 * 60 * 1000
const TIMER_DURATIONS = { focus: 25 * 60 * 1000, break: 5 * 60 * 1000 }
const QUOTES = [
    ['Well done is better than well said.', 'Benjamin Franklin'],
    ['Lost time is never found again.', 'Benjamin Franklin'],
    ['The best way out is always through.', 'Robert Frost'],
    ['Knowing is not enough; we must apply.', 'Johann Wolfgang von Goethe'],
    ['The journey of a thousand miles begins with one step.', 'Laozi'],
    ['Be not afraid of going slowly; be afraid only of standing still.', 'Chinese proverb'],
    ['Little by little, one travels far.', 'Spanish proverb'],
    ['Fortune favors the bold.', 'Latin proverb'],
    ['Do what you can, with what you have, where you are.', 'Theodore Roosevelt'],
    ['Rest is not idleness.', 'John Lubbock'],
    ['He who has a why to live can bear almost any how.', 'Friedrich Nietzsche'],
    ['Nothing will come of nothing.', 'William Shakespeare'],
]
// Icon paths (Feather and Lucide, MIT/ISC licensed), drawn in a 24x24 stroke SVG
const ICONS = {
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    cloudSun: '<path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',
    cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
    fog: '<line x1="4" y1="8" x2="20" y2="8"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4" y1="16" x2="20" y2="16"/><line x1="7" y1="20" x2="17" y2="20"/>',
    drizzle: '<line x1="8" y1="19" x2="8" y2="21"/><line x1="8" y1="13" x2="8" y2="15"/><line x1="16" y1="19" x2="16" y2="21"/><line x1="16" y1="13" x2="16" y2="15"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="12" y1="15" x2="12" y2="17"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>',
    rain: '<line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>',
    snow: '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="12" y1="22" x2="12.01" y2="22"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/>',
    storm: '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/>',
    sunrise: '<path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/>',
    sunset: '<path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    moonStar: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
}
// Every color, including each gradient end, gives white text at least 4.5:1 contrast
const COLOR_PRESETS = [
    { name: 'Graphite', type: 'solid', colors: ['#1f2328'] },
    { name: 'Midnight', type: 'solid', colors: ['#0f172a'] },
    { name: 'Slate', type: 'solid', colors: ['#334155'] },
    { name: 'Forest', type: 'solid', colors: ['#14532d'] },
    { name: 'Plum', type: 'solid', colors: ['#4a1d4f'] },
    { name: 'Clay', type: 'solid', colors: ['#7c2d12'] },
    { name: 'Dusk', type: 'gradient', colors: ['#7c3aed', '#db2777'] },
    { name: 'Sunset', type: 'gradient', colors: ['#c2410c', '#9d174d'] },
    { name: 'Ocean', type: 'gradient', colors: ['#0369a1', '#1e3a8a'] },
    { name: 'Aurora', type: 'gradient', colors: ['#047857', '#1d4ed8'] },
    { name: 'Ember', type: 'gradient', colors: ['#dc2626', '#7c2d12'] },
    { name: 'Night', type: 'gradient', colors: ['#1e293b', '#020617'] },
]
const GREETING_ICONS = { EarlyMorning: 'sunrise', Morning: 'sun', Afternoon: 'cloudSun', Evening: 'sunset', Night: 'moon', LateNight: 'moonStar' }
const $ = (id) => document.getElementById(id)

let settings = { ...DEFAULT_SETTINGS }
let bgContent = []
let wallpaperSource = 'bing-wallpaper'
let backgroundReady = false
let backgroundRequest = 0
let backgroundObjectUrl = null
let themePending = false
let clockTimeout
let clockInterval
let toastTimer
let timer = { mode: 'focus', remaining: TIMER_DURATIONS.focus, endsAt: null }
let timerInterval

// Settings

async function loadSettings() {
    settings = { ...DEFAULT_SETTINGS, ...await browser.storage.local.get(Object.keys(DEFAULT_SETTINGS)) }
    document.querySelectorAll('[data-setting]').forEach(input => {
        const value = settings[input.dataset.setting]
        if (input.type === 'checkbox') input.checked = value
        else if (input.type === 'radio') input.checked = input.value === value
        else input.value = value
    })
}

function applySettings() {
    $('time-time').hidden = !settings['show-clock']
    $('time-day').hidden = !settings['show-clock']
    if (!settings['weather-near-clock']) $('clock-weather').hidden = true
    $('greetings').hidden = !settings['show-greeting']
    $('bg-data').hidden = !settings['show-photo-info'] || wallpaperSource !== 'bing-wallpaper' || !bgContent.length
    $('bing-region-row').hidden = wallpaperSource !== 'bing-wallpaper'
    $('shuffle-row').hidden = wallpaperSource === 'color-wallpaper'
    $('topsites-settings').hidden = !settings['topsites-enabled']

    const widgets = $('widgets')
    widgets.hidden = !settings['widgets-enabled']
    if (settings['widgets-position'] === 'above') $('topsites').before(widgets)
    else $('topsites').after(widgets)
    for (const name of ['weather', 'tasks', 'timer', 'date']) $(`widget-${name}`).hidden = !settings[`widget-${name}`]
    $('widgets-settings').hidden = !settings['widgets-enabled']
}

async function onSettingChanged(key) {
    applySettings()
    if (key === 'clock-24h') renderClock()
    if (key === 'dynamic-theme') settings[key] ? updateTheme() : resetBrowserTheme()
    if (key === 'topsites-enabled') await refreshTopsites()
    if (key === 'bing-region') {
        await setBgIndex(0)
        await loadWallpaper()
        renderBingGallery()
    }
    if (key.startsWith('widget') || key.startsWith('weather')) renderWidgets()
}

$('settings-sidebar').addEventListener('change', async (e) => {
    const key = e.target.dataset?.setting
    if (!key) return
    settings[key] = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    await setStorage(key, settings[key])
    await onSettingChanged(key)
})

// Clock & greeting

function setClock() {
    clearTimeout(clockTimeout)
    clearInterval(clockInterval)
    renderClock()
    const d = new Date()
    clockTimeout = setTimeout(() => {
        renderClock()
        clockInterval = setInterval(renderClock, 60000)
    }, (60 - d.getSeconds()) * 1000 - d.getMilliseconds())
}

function renderClock() {
    const d = new Date()
    const minutes = String(d.getMinutes()).padStart(2, '0')
    $('time-time').textContent = settings['clock-24h']
        ? `${String(d.getHours()).padStart(2, '0')}:${minutes}`
        : `${String(d.getHours() % 12 || 12).padStart(2, '0')}:${minutes}${d.getHours() >= 12 ? 'PM' : 'AM'}`
    $('time-day').textContent = `${DAYS[d.getDay()]} ${d.getDate()}, ${MONTHS[d.getMonth()]}`
}

function setGreet() {
    const greets = {
        EarlyMorning: ["Rise and shine",
            "New day, new opportunities",
            "Early bird gets the worm",
            "Good morning sunshine",
            "Start your day with a smile",
            "Embrace the morning calm",
            "Early riser vibes",
            "Morning glory",
            "Hello, world!",
            "Sunrise serenity",
        ],
        Morning: ["Lovely day ahead",
            "Morning magic",
            "Rise and grind",
            "Hello, beautiful world",
            "Morning bliss",
            "Coffee and sunshine",
            "Good vibes only",
            "Make today amazing",
            "Blessed morning",
            "Sunshine on my mind",
        ],
        Afternoon: ["Enjoy your lunch break",
            "Afternoon delight",
            "Halfway there!",
            "Sunny afternoon vibes",
            "Stay positive and productive",
            "Fuel up for the rest of the day",
            "Keep shining bright",
            "Productivity mode on",
            "Afternoon energy boost",
            "Make the most of this afternoon",
        ],
        Evening: ["Chill time begins",
            "Evening tranquility",
            "Relax and unwind",
            "Sunset serenade",
            "Evening breeze",
            "Time to wind down",
            "Evening glow",
            "Peaceful evening vibes",
            "Cozy evening ahead",
            "Evening bliss",
        ],
        Night: ["Nighttime tranquility",
            "Stars shining bright",
            "Good night, sleep tight",
            "Dreamland awaits",
            "Nighttime serenity",
            "Rest and recharge",
            "Twinkling stars above",
            "Peaceful night vibes",
            "Sweet dreams ahead",
            "Nighttime magic",
        ],
        LateNight: ["Late night musings",
            "Still up?",
            "Night owl mode",
            "Quiet night thoughts",
            "Late night ponderings",
            "Embracing the silence",
            "Nighttime reflections",
            "Late night tranquility",
            "Stars whispering secrets",
            "Peaceful late night",
        ],
    }
    const now = new Date()
    const time = now.getHours() * 60 + now.getMinutes()
    let period
    if (time < 240) period = 'LateNight'
    else if (time < 420) period = 'EarlyMorning'
    else if (time < 720) period = 'Morning'
    else if (time < 1020) period = 'Afternoon'
    else if (time < 1140) period = 'Evening'
    else period = 'Night'

    const list = greets[period]
    setIcon($('greetings-icon'), GREETING_ICONS[period])
    $('greetings-msg').textContent = list[Math.floor(Math.random() * list.length)]
}

// Pause the clock only while the tab is hidden; a visible tab in an unfocused window keeps ticking
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return setClock()
    clearTimeout(clockTimeout)
    clearInterval(clockInterval)
})

window.addEventListener('focus', () => {
    setClock()
    setGreet()
    updateTheme()
    if (settings['widget-date']) renderDateWidget()
})

// Search & keyboard shortcuts

function runSearch() {
    const text = $('search').value.trim()
    if (text) browser.search.query({ text })
}

$('search').onkeydown = (e) => {
    if (e.key === 'Enter' && !e.isComposing) runSearch()
}

document.querySelector('#search-bar .sub').onclick = runSearch

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if ($('welcome-modal').style.display === 'flex') closeWelcomeModal()
        else closeAllSidebars()
    }
    if (e.key === '/' && !e.target.closest?.('input, textarea, select') && $('welcome-modal').style.display !== 'flex') {
        e.preventDefault()
        $('search').focus()
    }
})

// Theme

// Themes are set per window, so each window is reset along with the global theme
async function resetBrowserTheme() {
    browser.theme.reset()
    for (const win of await browser.windows.getAll()) browser.theme.reset(win.id)
}

function detectColorScheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Waits for the wallpaper, otherwise the toolbar briefly takes the color of the empty page
function updateTheme() {
    if (!settings['dynamic-theme'] || !backgroundReady) return
    // The browser color comes from a screenshot, so wait until an open sidebar is out of the way
    if (document.querySelector('.sidebar.show-sidebar')) {
        themePending = true
        return
    }
    browser.runtime.sendMessage({ from: 'home_page', duty: 'updateTheme', color_scheme: detectColorScheme() })
}

// Wallpaper

// The feed changes daily: reuse the stored copy for a few hours, and fall back to it when offline
async function fetchBingImages() {
    const region = settings['bing-region']
    const cached = await getStorage('bing-feed')
    const usable = cached?.region === region && Array.isArray(cached.data)
    if (usable && Date.now() - cached.time < BING_FEED_TTL_MS) return cached.data
    try {
        const res = await fetch(`https://peapix.com/bing/feed?country=${region}`)
        const data = await res.json()
        if (Array.isArray(data) && data.length) {
            await setStorage('bing-feed', { region, time: Date.now(), data })
            return data
        }
    } catch {
        // Network problem: use whatever copy we have
    }
    return usable ? cached.data : []
}

async function getBgIndex() {
    const index = await getStorage('bg_index')
    return typeof index === 'number' ? index : 0
}

async function setBgIndex(index) {
    await setStorage('bg_index', index)
}

async function getPreferenceWallpaper() {
    return await getStorage('wallpaper-src') || 'bing-wallpaper'
}

// Every loader bails if another wallpaper was applied while it was waiting
async function loadWallpaper(shuffle = false) {
    const request = backgroundRequest
    const source = await getPreferenceWallpaper()
    if (request !== backgroundRequest) return
    updateElementContext(source)
    if (source === 'color-wallpaper') return showColorWallpaper()
    if (source === 'user-wallpaper' && await showUserWallpaper(shuffle)) return
    await showBingWallpaper(shuffle)
}

async function showBingWallpaper(shuffle = false) {
    const request = backgroundRequest
    bgContent = await fetchBingImages()
    applySettings()
    // Offline or feed unavailable: keep the plain background
    if (!bgContent.length || request !== backgroundRequest) return
    let index = await getBgIndex()
    if (shuffle) {
        index = Math.floor(Math.random() * bgContent.length)
        await setBgIndex(index)
    }
    updateBackground(bgContent[index] || bgContent[0], 'bing-wallpaper')
}

async function selectBingWallpaper(index) {
    await setBgIndex(index)
    updateBackground(bgContent[index], 'bing-wallpaper')
    await renderBingGallery()
}

// Thumbnails are only loaded while the settings sidebar is open
async function renderBingGallery() {
    if (!$('settings-sidebar').classList.contains('show-sidebar')) return
    const activeIndex = await getBgIndex()
    $('bing-gallery').replaceChildren(...bgContent.map((item, i) => {
        const wrapper = document.createElement('div')
        wrapper.className = 'gallery-item'
        wrapper.classList.toggle('active', i === activeIndex)

        const select = document.createElement('button')
        select.type = 'button'
        select.className = 'gallery-select'
        select.title = item.title || ''
        select.setAttribute('aria-label', item.title || `Bing photo ${i + 1}`)
        select.setAttribute('aria-pressed', String(i === activeIndex))
        select.onclick = () => selectBingWallpaper(i)

        const img = document.createElement('img')
        img.alt = ''
        img.loading = 'lazy'
        const thumb = safeImageUrl(item.thumbUrl || item.fullUrl)
        if (thumb) img.src = thumb

        select.append(img)
        wrapper.append(select)
        return wrapper
    }))
}

async function renderWallpaperGalleries() {
    await Promise.all([renderGallery(), renderBingGallery(), getWallpaperColor().then(renderColorSettings)])
}

// Color wallpapers: { type: 'solid' | 'gradient', colors: ['#rrggbb', ...] }

function colorCss({ type, colors }) {
    return type === 'gradient' ? `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` : colors[0]
}

function isColorWallpaper(value) {
    const count = value?.type === 'gradient' ? 2 : value?.type === 'solid' ? 1 : 0
    return count > 0 && Array.isArray(value.colors) && value.colors.length === count && value.colors.every(c => /^#[0-9a-f]{6}$/i.test(c))
}

function sameColor(a, b) {
    return a.type === b.type && a.colors.join().toLowerCase() === b.colors.join().toLowerCase()
}

async function getWallpaperColor() {
    const value = await getStorage('wallpaper-color')
    return isColorWallpaper(value) ? value : { type: COLOR_PRESETS[6].type, colors: COLOR_PRESETS[6].colors }
}

function applyColorWallpaper(value, matchBrowserTheme = true) {
    ++backgroundRequest
    document.body.style.background = colorCss(value)
    replaceObjectUrl(null)
    backgroundReady = true
    if (matchBrowserTheme) updateTheme()
}

async function showColorWallpaper() {
    applyColorWallpaper(await getWallpaperColor())
}

async function selectColorWallpaper(value) {
    await browser.storage.local.set({ 'wallpaper-color': value, 'wallpaper-src': 'color-wallpaper' })
    applyColorWallpaper(value)
    renderColorSettings(value)
}

function renderColorSettings(value) {
    $('color-presets').replaceChildren(...COLOR_PRESETS.map(preset => {
        const swatch = document.createElement('button')
        swatch.type = 'button'
        swatch.className = 'swatch'
        swatch.title = preset.name
        swatch.setAttribute('aria-label', preset.name)
        swatch.style.background = colorCss(preset)
        swatch.classList.toggle('active', sameColor(preset, value))
        swatch.setAttribute('aria-pressed', String(sameColor(preset, value)))
        swatch.onclick = () => selectColorWallpaper({ type: preset.type, colors: preset.colors })
        return swatch
    }))
    $('custom-color-1').value = value.colors[0]
    $('custom-color-2').value = value.colors[1] || value.colors[0]
    $('custom-gradient').checked = value.type === 'gradient'
    $('custom-color-2').hidden = value.type !== 'gradient'
}

function customColorValue() {
    return $('custom-gradient').checked
        ? { type: 'gradient', colors: [$('custom-color-1').value, $('custom-color-2').value] }
        : { type: 'solid', colors: [$('custom-color-1').value] }
}

// Previews while the picker is dragged, saves when it closes
for (const id of ['custom-color-1', 'custom-color-2']) {
    $(id).oninput = () => applyColorWallpaper(customColorValue(), false)
    $(id).onchange = () => selectColorWallpaper(customColorValue())
}
$('custom-gradient').onchange = () => selectColorWallpaper(customColorValue())

// Feed URLs must be https; user wallpapers are blob URLs created by this page
function safeImageUrl(value) {
    try {
        const url = new URL(value)
        return url.protocol === 'https:' || url.protocol === 'blob:' ? url.href : null
    } catch {
        return null
    }
}

function setDownloadLink(selector, value, filename) {
    const link = document.querySelector(selector)
    const href = safeImageUrl(value)
    if (href) link.setAttribute('href', href)
    else link.removeAttribute('href')
    link.setAttribute('download', filename)
}

// Frees a blob URL that never made it onto the page
function releaseObjectUrl(url) {
    if (url?.startsWith('blob:') && url !== backgroundObjectUrl) URL.revokeObjectURL(url)
}

// Swaps the blob URL the background is using, freeing the old image
function replaceObjectUrl(url) {
    const previous = backgroundObjectUrl
    backgroundObjectUrl = url
    if (previous && previous !== url) URL.revokeObjectURL(previous)
}

function updateBackground(data, source) {
    if (source === 'bing-wallpaper') {
        let title = data?.title
        if (typeof title === 'string' && title.length > 25) title = title.slice(0, 25) + '...'

        document.querySelector('#bg-data .title').textContent = title
        document.querySelector('#bg-data .copyright').textContent = data?.copyright
        document.querySelector('#bg-data .date').textContent = data?.date
        const filename = data?.title || 'bing-wallpaper'
        setDownloadLink('#bg-data .download', data?.fullUrl, `${filename}.jpg`)
        setDownloadLink('#bg-data .download-4k', data?.imageUrl, `${filename}-4K.jpg`)
    }

    // Only the latest request may set the background, in case an earlier image loads last
    const request = ++backgroundRequest
    const src = safeImageUrl(data?.fullUrl)
    const img = new Image()
    img.onload = () => {
        if (request !== backgroundRequest) return releaseObjectUrl(src)
        document.body.style.background = `url("${src}") center/cover no-repeat fixed`
        replaceObjectUrl(src?.startsWith('blob:') ? src : null)
        backgroundReady = true
        updateTheme()
    }
    img.onerror = () => {
        releaseObjectUrl(src)
        if (request === backgroundRequest && source === 'user-wallpaper') showBingWallpaper()
    }
    if (src) img.src = src
    else img.onerror()
}

function updateElementContext(source) {
    wallpaperSource = source
    $('userImage-container').hidden = source !== 'user-wallpaper'
    $('bing-container').hidden = source !== 'bing-wallpaper'
    $('color-container').hidden = source !== 'color-wallpaper'
    $(source).checked = true
    applySettings()
}

$('wallpaper-options').onchange = async (e) => {
    await setStorage('wallpaper-src', e.target.value)
    await loadWallpaper()
    await renderWallpaperGalleries()
}

// Wallpaper gallery: full images and thumbnails live under separate keys so a new tab reads only one image

async function getWallpapers() {
    return await getStorage('user-wallpapers') || []
}

async function showUserWallpaper(shuffle = false) {
    const request = backgroundRequest
    let id = await getStorage('wallpaper-active')
    if (shuffle) {
        const wallpapers = await getWallpapers()
        if (wallpapers.length) {
            id = wallpapers[Math.floor(Math.random() * wallpapers.length)].id
            await setStorage('wallpaper-active', id)
        }
    }
    const data = id && await getStorage(`wallpaper-${id}`)
    if (request !== backgroundRequest) return true
    if (!data) return false
    updateBackground({ fullUrl: URL.createObjectURL(new Blob([data])) }, 'user-wallpaper')
    return true
}

// Scales the image down (never up) until it just covers width x height, then encodes as WebP
async function resizeImage(blob, width, height, quality) {
    const bitmap = await createImageBitmap(blob)
    const scale = Math.min(1, Math.max(width / bitmap.width, height / bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()

    let out = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', quality))
    if (out?.type !== 'image/webp') out = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', quality))
    return new Uint8Array(await out.arrayBuffer())
}

async function processImage(blob) {
    const ratio = window.devicePixelRatio || 1
    return Promise.all([
        resizeImage(blob, screen.width * ratio, screen.height * ratio, 0.85),
        resizeImage(blob, 240, 160, 0.7),
    ])
}

async function addWallpapers(files) {
    const wallpapers = await getWallpapers()
    const room = MAX_WALLPAPERS - wallpapers.length
    if (files.length > room) showToast(`You can keep up to ${MAX_WALLPAPERS} images`)

    let addedId
    for (const file of [...files].slice(0, Math.max(room, 0))) {
        let images
        try {
            images = await processImage(file)
        } catch {
            showToast(`Couldn't open ${file.name}`)
            continue
        }
        try {
            const id = crypto.randomUUID()
            await browser.storage.local.set({ [`wallpaper-${id}`]: images[0], [`wallpaper-thumb-${id}`]: images[1] })
            wallpapers.push({ id })
            addedId = id
        } catch {
            showToast(`Couldn't save ${file.name}`)
        }
    }
    if (!addedId) return

    await browser.storage.local.set({ 'user-wallpapers': wallpapers, 'wallpaper-active': addedId, 'wallpaper-src': 'user-wallpaper' })
    await refreshWallpaper()
}

async function selectWallpaper(id) {
    await browser.storage.local.set({ 'wallpaper-active': id, 'wallpaper-src': 'user-wallpaper' })
    await refreshWallpaper()
}

async function removeWallpaper(id) {
    const images = await browser.storage.local.get([`wallpaper-${id}`, `wallpaper-thumb-${id}`])
    const index = (await getWallpapers()).findIndex(w => w.id === id)
    const wasActive = await getStorage('wallpaper-active') === id
    const source = await getStorage('wallpaper-src')
    let emptied = false

    await withUndo('Wallpaper removed', async () => {
        const wallpapers = (await getWallpapers()).filter(w => w.id !== id)
        await browser.storage.local.remove([`wallpaper-${id}`, `wallpaper-thumb-${id}`])
        await setStorage('user-wallpapers', wallpapers)
        if (wasActive) {
            if (wallpapers.length) await setStorage('wallpaper-active', wallpapers[0].id)
            else await browser.storage.local.remove('wallpaper-active')
        }
        emptied = !wallpapers.length
        if (emptied) await setStorage('wallpaper-src', 'bing-wallpaper')
    }, async () => {
        const wallpapers = await getWallpapers()
        if (!wallpapers.some(w => w.id === id)) wallpapers.splice(Math.min(index, wallpapers.length), 0, { id })
        const restore = { ...images, 'user-wallpapers': wallpapers }
        if (wasActive) restore['wallpaper-active'] = id
        if (emptied && source) restore['wallpaper-src'] = source
        await browser.storage.local.set(restore)
    }, refreshWallpaper)
}

async function refreshWallpaper() {
    await loadWallpaper()
    await renderWallpaperGalleries()
}

async function renderGallery() {
    const gallery = $('wallpaper-gallery')
    const addTile = gallery.querySelector('.gallery-add')
    const wallpapers = await getWallpapers()
    const activeId = await getStorage('wallpaper-active')
    const thumbs = wallpapers.length ? await browser.storage.local.get(wallpapers.map(w => `wallpaper-thumb-${w.id}`)) : {}

    gallery.querySelectorAll('img').forEach(img => URL.revokeObjectURL(img.src))
    const items = wallpapers.map(({ id }) => {
        const item = document.createElement('div')
        item.className = 'gallery-item'
        item.classList.toggle('active', id === activeId && wallpaperSource === 'user-wallpaper')

        const select = document.createElement('button')
        select.type = 'button'
        select.className = 'gallery-select'
        select.setAttribute('aria-label', 'Use this wallpaper')
        select.setAttribute('aria-pressed', String(id === activeId && wallpaperSource === 'user-wallpaper'))
        select.onclick = () => selectWallpaper(id)

        const img = document.createElement('img')
        img.alt = ''
        const thumb = thumbs[`wallpaper-thumb-${id}`]
        if (thumb) img.src = URL.createObjectURL(new Blob([thumb]))

        const remove = document.createElement('button')
        remove.type = 'button'
        remove.className = 'gallery-remove'
        remove.setAttribute('aria-label', 'Remove wallpaper')
        remove.textContent = '×'
        remove.onclick = () => removeWallpaper(id)

        select.append(img)
        item.append(select, remove)
        return item
    })
    gallery.replaceChildren(...items, addTile)
    addTile.hidden = wallpapers.length >= MAX_WALLPAPERS
}

$('userImage').onchange = async (e) => {
    await addWallpapers(e.target.files)
    e.target.value = ''
}

// Moves the single full-size image saved by v1.2 and earlier into the gallery
async function migrateLegacyWallpaper() {
    const legacy = await getStorage('userImage')
    if (!legacy) return
    // The original stays as the full image, so it isn't downscaled to whatever screen opens the first new tab
    const full = new Uint8Array(legacy)
    let thumb = full
    try {
        thumb = await resizeImage(new Blob([full]), 240, 160, 0.7)
    } catch {
        // Keep the original bytes as the thumbnail if the image can't be decoded here
    }
    // A fixed id means new tabs migrating at the same time write the same entry instead of duplicates
    const id = 'legacy'
    const wallpapers = await getWallpapers()
    await browser.storage.local.set({
        [`wallpaper-${id}`]: full,
        [`wallpaper-thumb-${id}`]: thumb,
        'user-wallpapers': wallpapers.some(w => w.id === id) ? wallpapers : [...wallpapers, { id }],
        'wallpaper-active': id,
    })
    await browser.storage.local.remove('userImage')
}

// Background effects

function applyBackgroundEffects(blur, darkness) {
    const overlay = $('bg-overlay')
    overlay.style.backdropFilter = blur ? `blur(${blur}px)` : 'none'
    overlay.style.background = `rgba(0, 0, 0, ${darkness / 100})`
    $('bg-blur-value').textContent = `${blur}px`
    $('bg-darkness-value').textContent = `${darkness}%`
}

async function initBackgroundEffects() {
    const blur = await getStorage('bg-blur') || 0
    const darkness = await getStorage('bg-darkness') || 0
    $('bg-blur-slider').value = blur
    $('bg-darkness-slider').value = darkness
    applyBackgroundEffects(blur, darkness)
}

for (const [id, key] of [['bg-blur-slider', 'bg-blur'], ['bg-darkness-slider', 'bg-darkness']]) {
    $(id).oninput = () => applyBackgroundEffects(parseInt($('bg-blur-slider').value), parseInt($('bg-darkness-slider').value))
    $(id).onchange = (e) => setStorage(key, parseInt(e.target.value))
}

// Top sites

async function getTopsitesSrc() {
    return await getStorage('topsites-src') || 'most-visited'
}

// The site's own name: mail.google.com -> google, bbc.co.uk -> bbc; IPs and single labels stay as they are
function siteTitle(host) {
    const hostname = host.replace(/:\d+$/, '')
    if (!hostname.includes('.') || /^[\d.]+$/.test(hostname)) return host
    const labels = hostname.replace(/^www\./, '').split('.')
    let i = labels.length - 2
    if (i > 0 && labels[labels.length - 1].length === 2 && /^(co|com|org|net|gov|ac|edu)$/.test(labels[i])) i--
    return labels[Math.max(i, 0)]
}

// Local and private addresses are never sent to the icon service; they get the generic icon
function isPrivateHost(hostname) {
    return !hostname.includes('.')
        || hostname.includes(':')
        || /\.(local|internal|lan|home\.arpa|localhost)$/i.test(hostname)
        || /^(10|127)\.|^192\.168\.|^172\.(1[6-9]|2\d|3[01])\.|^169\.254\./.test(hostname)
}

function faviconUrl(url) {
    return isPrivateHost(url.hostname) ? FALLBACK_FAVICON : `https://favicone.com/${url.host}?s=100`
}

// Tiles are swapped in one go at the end so overlapping calls can't duplicate them
async function updateTopsite() {
    const listEl = $('topsites-list')
    $('topsites').hidden = !settings['topsites-enabled']
    if (!settings['topsites-enabled']) {
        listEl.replaceChildren()
        return
    }

    if (await getTopsitesSrc() === 'custom') {
        const customSites = await getStorage('custom-sites') || []
        listEl.replaceChildren(...customSites.map(site => {
            const url = new URL(site.url)
            const tile = { url: url.href, title: site.title, favicon: faviconUrl(url) }
            return createTile(tile, 'Remove site', () => removeCustomSite(site.url))
        }))
        return
    }

    const sites = await browser.topSites.get({ limit: 30 })
    const hiddenSites = await getStorage('topsites-hidden') || []
    const tiles = sites
        .map(site => {
            const url = new URL(site.url)
            return { url: url.href, title: siteTitle(url.host), favicon: faviconUrl(url) }
        })
        .filter(tile => !['localhost', '127.0.0.1'].includes(new URL(tile.url).hostname))
        .filter(tile => !hiddenSites.some(hidden => sameOrigin(hidden, tile.url)))
        .slice(0, TOPSITES_LIMIT)

    listEl.replaceChildren(...tiles.map(tile => createTile(tile, 'Hide site', () => hideTopsite(tile.url))))
}

// Built with DOM APIs (not innerHTML) since custom sites are user input
function createTile(tile, removeLabel, onRemove) {
    const wrapper = document.createElement('div')
    wrapper.className = 'tile-wrapper'

    const link = document.createElement('a')
    link.href = tile.url
    link.rel = 'noopener noreferrer'

    const tileEl = document.createElement('span')
    tileEl.className = 'tile'

    const imageContainer = document.createElement('span')
    imageContainer.className = 'tile-image-container'

    const img = document.createElement('img')
    img.width = 48
    img.height = 48
    img.alt = ''
    img.className = 'tile-favicon-img'
    img.onerror = () => { img.src = FALLBACK_FAVICON }
    img.src = tile.favicon

    const title = document.createElement('p')
    title.className = 'tile-title'
    title.textContent = tile.title

    const removeBtn = document.createElement('button')
    removeBtn.type = 'button'
    removeBtn.className = 'tile-remove'
    removeBtn.title = removeLabel
    removeBtn.setAttribute('aria-label', `${removeLabel}: ${tile.title}`)
    removeBtn.textContent = '×'
    removeBtn.onclick = (e) => {
        e.preventDefault()
        onRemove()
    }

    imageContainer.append(img)
    tileEl.append(imageContainer, title)
    link.append(tileEl)
    wrapper.append(link, removeBtn)
    return wrapper
}

async function refreshTopsites() {
    await renderTopsitesSettings()
    await updateTopsite()
}

async function renderTopsitesSettings() {
    const src = await getTopsitesSrc()
    const hiddenSites = await getStorage('topsites-hidden') || []
    const customSites = await getStorage('custom-sites') || []

    $(src === 'custom' ? 'topsites-custom' : 'topsites-most-visited').checked = true
    $('topsites-hidden-container').hidden = src !== 'most-visited'
    $('restore-hidden-btn').hidden = !hiddenSites.length
    $('restore-hidden-btn').textContent = `Restore hidden sites (${hiddenSites.length})`
    $('custom-sites-container').hidden = src !== 'custom'

    $('custom-sites-list').replaceChildren(...customSites.map(site => {
        const item = document.createElement('div')
        item.className = 'list-item'

        const text = document.createElement('span')
        text.className = 'list-item-text'
        text.textContent = site.title

        const host = document.createElement('small')
        host.textContent = new URL(site.url).host
        text.append(host)

        const remove = document.createElement('button')
        remove.type = 'button'
        remove.className = 'item-delete'
        remove.setAttribute('aria-label', `Remove ${site.title}`)
        remove.textContent = '×'
        remove.onclick = () => removeCustomSite(site.url)

        item.append(text, remove)
        return item
    }))
}

// Accepts "example.com" or a full http(s) URL, returns a URL object or null
function parseSiteUrl(value) {
    if (!value) return null
    if (!/^[a-z][a-z\d+.-]*:\/\//i.test(value)) value = `https://${value}`
    try {
        const url = new URL(value)
        return url.protocol === 'http:' || url.protocol === 'https:' ? url : null
    } catch {
        return null
    }
}

async function addCustomSite() {
    const urlInput = $('custom-site-url')
    const nameInput = $('custom-site-name')
    const url = parseSiteUrl(urlInput.value.trim())

    if (!url) {
        urlInput.classList.add('invalid')
        urlInput.focus()
        return
    }

    const title = nameInput.value.trim() || siteTitle(url.hostname)
    const customSites = await getStorage('custom-sites') || []
    if (!customSites.some(site => site.url === url.href)) {
        await setStorage('custom-sites', [...customSites, { url: url.href, title }])
    }

    urlInput.value = ''
    nameInput.value = ''
    nameInput.focus()
    await refreshTopsites()
}

// Removed by url, not index, so a list changed in another tab can't remove the wrong site
async function removeCustomSite(url) {
    let removed
    let index
    await withUndo('Site removed', async () => {
        const customSites = await getStorage('custom-sites') || []
        index = customSites.findIndex(site => site.url === url)
        removed = customSites[index]
        await setStorage('custom-sites', customSites.filter(site => site.url !== url))
    }, async () => {
        const customSites = await getStorage('custom-sites') || []
        if (removed && !customSites.some(site => site.url === url)) customSites.splice(Math.min(index, customSites.length), 0, removed)
        await setStorage('custom-sites', customSites)
    }, refreshTopsites)
}

// Hidden by site (origin), so the tile stays hidden when Firefox picks a different page from it
function sameOrigin(a, b) {
    try {
        return new URL(a).origin === new URL(b).origin
    } catch {
        return false
    }
}

async function hideTopsite(url) {
    const origin = new URL(url).origin
    await withUndo('Site hidden', async () => {
        const hiddenSites = await getStorage('topsites-hidden') || []
        if (!hiddenSites.some(hidden => sameOrigin(hidden, origin))) await setStorage('topsites-hidden', [...hiddenSites, origin])
    }, async () => {
        const hiddenSites = await getStorage('topsites-hidden') || []
        await setStorage('topsites-hidden', hiddenSites.filter(hidden => !sameOrigin(hidden, origin)))
    }, refreshTopsites)
}

$('topsites-options').onchange = async (e) => {
    await setStorage('topsites-src', e.target.value)
    await refreshTopsites()
}

$('restore-hidden-btn').onclick = async () => {
    await setStorage('topsites-hidden', [])
    await refreshTopsites()
}

$('custom-site-form').onsubmit = (e) => {
    e.preventDefault()
    addCustomSite()
}

$('custom-site-url').oninput = (e) => e.target.classList.remove('invalid')

// Tasks

async function getTasks() {
    const tasks = (await getStorage('task-list') || []).filter(task => task?.id !== null && task?.id !== undefined)
    // Older versions could create duplicate ids, which made one delete remove several tasks
    if (new Set(tasks.map(task => task.id)).size !== tasks.length) {
        const base = Date.now()
        tasks.forEach((task, i) => { task.id = base + i })
        await setStorage('task-list', tasks)
    }
    return tasks
}

async function addTask(text) {
    const tasks = await getTasks()
    if (tasks.length >= MAX_TASKS) {
        showToast('Too many tasks. Clear some first.')
        return false
    }
    await setStorage('task-list', [{ id: Date.now(), task: text }, ...tasks])
    await renderTask()
    return true
}

async function toggleTask(id) {
    const tasks = await getTasks()
    await setStorage('task-list', tasks.map(task => task.id === id ? { ...task, done: !task.done } : task))
    await renderTask()
}

// Puts removed tasks back at their old positions, skipping any that already exist again
async function restoreTasks(entries) {
    const tasks = await getTasks()
    for (const [index, task] of entries) {
        if (!tasks.some(t => t.id === task.id)) tasks.splice(Math.min(index, tasks.length), 0, task)
    }
    await setStorage('task-list', tasks)
}

async function deleteTask(id) {
    let removed = []
    await withUndo('Task deleted', async () => {
        const tasks = await getTasks()
        removed = tasks.map((task, i) => [i, task]).filter(([, task]) => task.id === id)
        await setStorage('task-list', tasks.filter(task => task.id !== id))
    }, () => restoreTasks(removed), renderTask)
}

async function clearCompletedTasks() {
    let removed = []
    await withUndo('Completed tasks cleared', async () => {
        const tasks = await getTasks()
        removed = tasks.map((task, i) => [i, task]).filter(([, task]) => task.done)
        await setStorage('task-list', tasks.filter(task => !task.done))
    }, () => restoreTasks(removed), renderTask)
}

async function renderTask() {
    const tasks = await getTasks()
    const left = tasks.filter(task => !task.done).length

    $('task-list').replaceChildren(...tasks.map(task => {
        const item = document.createElement('div')
        item.className = 'list-item task-item'
        item.classList.toggle('done', !!task.done)
        item.dataset.id = task.id

        const check = document.createElement('button')
        check.type = 'button'
        check.className = 'task-check'
        check.setAttribute('aria-label', task.done ? 'Mark as not done' : 'Mark as done')
        check.setAttribute('aria-pressed', String(!!task.done))

        const text = document.createElement('span')
        text.className = 'list-item-text'
        text.textContent = task.task

        const remove = document.createElement('button')
        remove.type = 'button'
        remove.className = 'item-delete'
        remove.setAttribute('aria-label', 'Delete task')
        remove.textContent = '×'

        item.append(check, text, remove)
        return item
    }))

    $('tasks-empty').classList.toggle('show', !tasks.length)
    $('tasks-footer').hidden = !tasks.length
    $('tasks-left').textContent = left ? `${left} left` : 'All done'
    $('tasks-count').textContent = tasks.length ? left : ''
    $('clear-done-btn').hidden = left === tasks.length
}

$('task-form').onsubmit = async (e) => {
    e.preventDefault()
    const input = $('task-text')
    const text = input.value.trim()
    if (text && await addTask(text)) input.value = ''
}

$('task-list').onclick = (e) => {
    const item = e.target.closest('.task-item')
    if (!item) return
    const id = Number(item.dataset.id)
    if (e.target.closest('.item-delete')) deleteTask(id)
    else toggleTask(id)
}

$('clear-done-btn').onclick = clearCompletedTasks

// Widgets

async function renderWidgets() {
    const jobs = []
    if (settings['widget-weather'] || settings['weather-near-clock']) jobs.push(renderWeather())
    if (settings['widgets-enabled']) {
        if (settings['widget-tasks']) jobs.push(renderTasksWidget())
        if (settings['widget-timer']) renderTimer()
        if (settings['widget-date']) renderDateWidget()
    }
    await Promise.all(jobs)
}

function describeWeather(code) {
    if (code <= 1) return ['sun', code === 0 ? 'Clear' : 'Mostly clear']
    if (code === 2) return ['cloudSun', 'Partly cloudy']
    if (code === 3) return ['cloud', 'Overcast']
    if (code <= 48) return ['fog', 'Fog']
    if (code <= 57) return ['drizzle', 'Drizzle']
    if (code <= 67) return ['rain', 'Rain']
    if (code <= 77) return ['snow', 'Snow']
    if (code <= 82) return ['rain', 'Showers']
    if (code <= 86) return ['snow', 'Snow showers']
    return ['storm', 'Thunderstorm']
}

function setIcon(el, name) {
    if (!name) return el.replaceChildren()
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`
    el.replaceChildren(new DOMParser().parseFromString(svg, 'image/svg+xml').documentElement)
}

async function renderWeather() {
    const city = await getStorage('weather-city')
    if (document.activeElement !== $('weather-city')) $('weather-city').value = city?.name || ''
    if (!city) {
        setIcon($('weather-icon'), null)
        $('weather-temp').textContent = '--'
        $('weather-desc').textContent = 'Set a city in settings'
        $('clock-weather').hidden = true
        return
    }

    // The clock line keeps its space while the first forecast loads, so the page doesn't shift
    $('clock-weather').hidden = !settings['weather-near-clock']

    // Cached weather shows right away; a stale cache is refreshed in the background
    const unit = settings['weather-unit']
    const key = `${city.latitude},${city.longitude},${unit}`
    const cache = await getStorage('weather-cache')
    if (cache?.key === key) showWeather(city, cache)
    if (cache?.key !== key || Date.now() - cache.time > WEATHER_CACHE_MS) refreshWeather(city, key, cache?.key === key)
}

async function refreshWeather(city, key, hasCache) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,weather_code&temperature_unit=${settings['weather-unit']}`)
        const { current } = await res.json()
        const fresh = { key, time: Date.now(), temp: current.temperature_2m, code: current.weather_code }
        await setStorage('weather-cache', fresh)
        showWeather(city, fresh)
    } catch {
        if (hasCache) return
        setIcon($('weather-icon'), null)
        $('weather-temp').textContent = '--'
        $('weather-desc').textContent = 'Weather unavailable'
        $('clock-weather-text').textContent = ''
    }
}

function showWeather(city, cache) {
    const [icon, label] = describeWeather(cache.code)
    const temp = `${Math.round(cache.temp)}°`
    setIcon($('weather-icon'), icon)
    $('weather-temp').textContent = temp
    $('weather-desc').textContent = `${label} · ${city.name}`

    setIcon($('clock-weather-icon'), icon)
    $('clock-weather-text').textContent = `${temp} ${label} · ${city.name}`
    $('clock-weather').hidden = !settings['weather-near-clock']
}

$('weather-city-form').onsubmit = async (e) => {
    e.preventDefault()
    const name = $('weather-city').value.trim()
    if (!name) return
    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`)
        const place = (await res.json()).results?.[0]
        if (!place) {
            showToast('City not found')
            return
        }
        await setStorage('weather-city', { name: place.name, country: place.country_code, latitude: place.latitude, longitude: place.longitude })
        await renderWeather()
    } catch {
        showToast('Weather service unavailable')
    }
}

$('widget-weather-body').onclick = () => openSidebar('settings', 'panel-general')

async function renderTasksBadge() {
    const open = (await getTasks()).filter(task => !task.done).length
    $('tasks-badge').textContent = open || ''
}

async function renderTasksWidget() {
    const open = (await getTasks()).filter(task => !task.done)
    $('widget-tasks-count').textContent = open.length ? `${open.length} open` : 'All done'
    $('widget-tasks-list').replaceChildren(...open.slice(0, 3).map(task => {
        const line = document.createElement('span')
        line.textContent = task.task
        return line
    }))
}

$('widget-tasks-body').onclick = () => openSidebar('tasks')

async function hideWidget(name) {
    const key = `widget-${name}`
    await withUndo('Widget hidden', () => setStorage(key, false), () => setStorage(key, true), async () => {
        await loadSettings()
        applySettings()
        renderWidgets()
    })
}

$('widgets').addEventListener('click', (e) => {
    const close = e.target.closest('.widget-close')
    if (close) hideWidget(close.dataset.widget)
})

// Focus timer: state is kept in storage so every open tab shows the same countdown

function timeLeft() {
    return timer.endsAt ? Math.max(0, timer.endsAt - Date.now()) : timer.remaining
}

function renderTimer() {
    const seconds = Math.ceil(timeLeft() / 1000)
    const display = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
    $('timer-display').textContent = display
    $('timer-toggle').textContent = timer.endsAt ? 'Pause' : timer.remaining < TIMER_DURATIONS[timer.mode] ? 'Resume' : 'Start'
    $('widget-timer').classList.toggle('running', !!timer.endsAt)
    document.querySelectorAll('.timer-mode').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === timer.mode)
        btn.setAttribute('aria-pressed', String(btn.dataset.mode === timer.mode))
    })
    document.title = timer.endsAt ? `${display} · ${timer.mode === 'focus' ? 'Focus' : 'Break'}` : 'New Tab'
}

function syncTimerTick() {
    clearInterval(timerInterval)
    if (timer.endsAt) timerInterval = setInterval(tickTimer, 1000)
}

// The background script owns the end of a session: an alarm fires at endsAt even if no new tab is open
async function saveTimer(state) {
    timer = state
    renderTimer()
    syncTimerTick()
    await setStorage('timer-state', state)
    if (state.endsAt) browser.alarms.create('focus-timer', { when: state.endsAt })
    else browser.alarms.clear('focus-timer')
}

async function tickTimer() {
    renderTimer()
    // Normally the background alarm ends the session; this only covers an alarm that didn't run
    if (timer.endsAt && Date.now() - timer.endsAt > 3000) {
        const next = timer.mode === 'focus' ? 'break' : 'focus'
        await saveTimer({ mode: next, remaining: TIMER_DURATIONS[next], endsAt: null })
    }
}

// A running session that reached its end time and moved to the other mode has finished.
// Switching modes by hand also clears endsAt, but before the end time, so it doesn't count.
function timerFinished(before, after) {
    return before?.endsAt && before.endsAt <= Date.now() + 2000 && after && !after.endsAt && before.mode !== after.mode
}

function playChime() {
    try {
        const ctx = new AudioContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.frequency.value = 880
        gain.gain.setValueAtTime(0.2, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1)
        osc.connect(gain).connect(ctx.destination)
        osc.onended = () => ctx.close()
        osc.start()
        osc.stop(ctx.currentTime + 1)
    } catch {
        // Audio can be blocked; the toast is enough
    }
}

$('timer-toggle').onclick = () => {
    if (timer.endsAt) saveTimer({ ...timer, remaining: timeLeft(), endsAt: null })
    else saveTimer({ ...timer, endsAt: Date.now() + timer.remaining })
}

$('timer-reset').onclick = () => saveTimer({ mode: timer.mode, remaining: TIMER_DURATIONS[timer.mode], endsAt: null })

document.querySelectorAll('.timer-mode').forEach(btn => {
    btn.onclick = () => saveTimer({ mode: btn.dataset.mode, remaining: TIMER_DURATIONS[btn.dataset.mode], endsAt: null })
})

async function loadTimer() {
    timer = await getStorage('timer-state') || timer
    // A session that ended while no new tab was open moves on quietly instead of chiming late
    if (timer.endsAt && Date.now() - timer.endsAt > 60 * 1000) {
        const next = timer.mode === 'focus' ? 'break' : 'focus'
        await saveTimer({ mode: next, remaining: TIMER_DURATIONS[next], endsAt: null })
        return
    }
    renderTimer()
    syncTimerTick()
}

function renderDateWidget() {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const end = new Date(now.getFullYear() + 1, 0, 1)
    // Calendar-day math in UTC so a daylight saving shift can't make the day number off by one
    const year = now.getFullYear()
    const day = Math.round((Date.UTC(year, now.getMonth(), now.getDate()) - Date.UTC(year, 0, 1)) / 86400000) + 1
    const daysInYear = Math.round((Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / 86400000)
    const percent = Math.floor((now - start) / (end - start) * 100)
    const [quote, author] = QUOTES[(day + year) % QUOTES.length]

    $('date-progress-label').textContent = `Day ${day} of ${daysInYear} · ${percent}%`
    $('date-progress-bar').style.width = `${percent}%`
    $('date-quote').textContent = `“${quote}” — ${author}`
}

// Keep widgets in sync with changes from the popup or other tabs
browser.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return
    if (changes['task-list']) {
        renderTasksBadge()
        if (settings['widget-tasks']) renderTasksWidget()
    }
    if (changes['timer-state']) {
        const { oldValue, newValue } = changes['timer-state']
        timer = newValue || { mode: 'focus', remaining: TIMER_DURATIONS.focus, endsAt: null }
        renderTimer()
        syncTimerTick()
        // The system notification covers other tabs; the tab you're looking at also chimes and shows a toast
        if (timerFinished(oldValue, newValue) && document.hasFocus()) {
            playChime()
            showToast(oldValue.mode === 'focus' ? 'Focus session done. Time for a break!' : 'Break is over. Back to focus!')
        }
    }
})

// Undo toast

function showToast(message, onUndo) {
    $('toast-msg').textContent = message
    $('toast-undo').hidden = !onUndo
    $('toast-undo').onclick = async () => {
        hideToast()
        await onUndo()
    }
    $('toast').classList.add('show')
    startToastTimer()
}

function startToastTimer() {
    clearTimeout(toastTimer)
    toastTimer = setTimeout(hideToast, 8000)
}

// The toast waits while the pointer or keyboard focus is on it
$('toast').addEventListener('mouseenter', () => clearTimeout(toastTimer))
$('toast').addEventListener('focusin', () => clearTimeout(toastTimer))
$('toast').addEventListener('mouseleave', () => { if (!$('toast').contains(document.activeElement)) startToastTimer() })
$('toast').addEventListener('focusout', () => { if (!$('toast').matches(':hover')) startToastTimer() })

function hideToast() {
    $('toast').classList.remove('show')
}

// Applies a change, then offers an undo that reverts only that change, so later edits survive
async function withUndo(message, change, undo, refresh) {
    await change()
    await refresh()
    showToast(message, async () => {
        await undo()
        await refresh()
    })
}

// Sidebars

function closeAllSidebars() {
    const focusedSidebar = document.activeElement?.closest?.('.sidebar')
    for (const name of ['settings', 'tasks']) {
        $(`${name}-sidebar`).classList.replace('show-sidebar', 'hide-sidebar')
        $(`${name}-toggle-btn`).classList.remove('active')
        $(`${name}-toggle-btn`).setAttribute('aria-expanded', 'false')
    }
    if (themePending) {
        themePending = false
        setTimeout(updateTheme, 400)
    }
    // Hand focus back to the button that opened it, instead of losing it with the hidden sidebar
    if (focusedSidebar) $(focusedSidebar.id.replace('-sidebar', '-toggle-btn')).focus({ preventScroll: true })
}

function showSettingsPanel(panelId) {
    document.querySelectorAll('.sidebar-tab').forEach(tab => {
        const active = tab.dataset.panel === panelId
        tab.setAttribute('aria-selected', String(active))
        $(tab.dataset.panel).hidden = !active
    })
    document.querySelector('#settings-sidebar .sidebar-content').scrollTop = 0
}

document.querySelectorAll('.sidebar-tab').forEach(tab => {
    tab.onclick = () => showSettingsPanel(tab.dataset.panel)
})

function openSidebar(name, panelId) {
    const sidebar = $(`${name}-sidebar`)
    const wasOpen = sidebar.classList.contains('show-sidebar')
    closeAllSidebars()
    if (wasOpen) return
    sidebar.classList.replace('hide-sidebar', 'show-sidebar')
    $(`${name}-toggle-btn`).classList.add('active')
    $(`${name}-toggle-btn`).setAttribute('aria-expanded', 'true')
    if (name === 'tasks') {
        renderTask()
        // preventScroll: the sidebar is still sliding in, focusing would scroll the page sideways
        $('task-text').focus({ preventScroll: true })
    } else {
        if (panelId) showSettingsPanel(panelId)
        document.querySelector('.sidebar-tab[aria-selected="true"]').focus({ preventScroll: true })
        renderWallpaperGalleries()
        renderTopsitesSettings()
    }
}

$('settings-toggle-btn').onclick = () => openSidebar('settings')
$('tasks-toggle-btn').onclick = () => openSidebar('tasks')
$('settings-close-btn').onclick = closeAllSidebars
$('tasks-close-btn').onclick = closeAllSidebars

// composedPath() still works when the clicked element was re-rendered away
document.addEventListener('click', (e) => {
    const keepOpen = e.composedPath().some(el => el.matches?.('.sidebar, .control-btn, .toast, .widget'))
    if (!keepOpen) closeAllSidebars()
})

// Welcome modal, shown once per version

async function showWelcomeModal() {
    if (await getStorage('welcome_modal_version') !== browser.runtime.getManifest().version) {
        $('welcome-modal').style.display = 'flex'
        $('welcome-close-btn').focus({ preventScroll: true })
    }
}

async function closeWelcomeModal() {
    $('welcome-modal').style.display = 'none'
    await setStorage('welcome_modal_version', browser.runtime.getManifest().version)
}

$('welcome-close-btn').onclick = closeWelcomeModal

// Storage helpers

async function getStorage(key) {
    return (await browser.storage.local.get(key))[key]
}

async function setStorage(key, value) {
    await browser.storage.local.set({ [key]: value })
}

const FALLBACK_FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cpath fill='%23f0f0f0' class='favicon-fallback' d='M13.384 3.408c.535.276 1.22 1.152 1.556 1.963a8 8 0 0 1 .503 3.897l-.009.077l-.026.224A7.758 7.758 0 0 1 .006 8.257v-.04q.025-.545.114-1.082c.01-.074.075-.42.09-.489l.01-.051a6.6 6.6 0 0 1 1.041-2.35q.327-.465.725-.87q.35-.358.758-.65a1.5 1.5 0 0 1 .26-.137c-.018.268-.04 1.553.268 1.943h.003a5.7 5.7 0 0 1 1.868-1.443a3.6 3.6 0 0 0 .021 1.896q.105.07.2.152c.107.09.226.207.454.433l.068.066l.009.009a2 2 0 0 0 .213.18c.383.287.943.563 1.306.741c.201.1.342.168.359.193l.004.008c-.012.193-.695.858-.933.858c-2.206 0-2.564 1.335-2.564 1.335c.087.997.714 1.839 1.517 2.357a4 4 0 0 0 .439.241q.114.05.228.094c.325.115.665.18 1.01.194c3.043.143 4.155-2.804 3.129-4.745v-.001a3 3 0 0 0-.731-.9a3 3 0 0 0-.571-.37l-.003-.002a2.68 2.68 0 0 1 1.87.454a3.92 3.92 0 0 0-3.396-1.983q-.116.001-.23.01l-.042.003V4.31h-.002a4 4 0 0 0-.8.14a7 7 0 0 0-.333-.314a2 2 0 0 0-.2-.152a4 4 0 0 1-.088-.383a5 5 0 0 1 1.352-.289l.05-.003c.052-.004.125-.01.205-.012C7.996 2.212 8.733.843 10.17.002l-.003.005l.003-.001l.002-.002h.002l.002-.002h.015a.02.02 0 0 1 .012.007a2.4 2.4 0 0 0 .206.48q.09.153.183.297c.49.774 1.023 1.379 1.543 1.968c.771.874 1.512 1.715 2.036 3.02l-.001-.013a8 8 0 0 0-.786-2.353'/%3E%3C/svg%3E"

// Entry point

// The page stays invisible (body.loading) until the first render is done, so nothing jumps on open
function revealPage() {
    document.body.classList.remove('loading')
}

; (async function main() {
    setTimeout(revealPage, 500)
    await loadSettings()
    applySettings()
    const wallpaperReady = migrateLegacyWallpaper()
        .catch(error => console.error('Wallpaper migration failed:', error))
        .then(() => loadWallpaper(settings['wallpaper-shuffle']))
    setClock()
    setGreet()
    initBackgroundEffects()
    await Promise.allSettled([updateTopsite(), renderTopsitesSettings(), loadTimer().then(renderWidgets), renderTasksBadge()])
    revealPage()
    showWelcomeModal()
    await wallpaperReady
})()
