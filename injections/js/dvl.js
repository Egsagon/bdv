/* Injections for DVL */

window.bdv.init(false, async () => {
    // Shorten title because hard to see when you have multiple
    // tabs opened with the same name
    if (document.URL.includes('view.php')) {
        document.title = 'DVL - ' + document.title.split(': ')[1].split(' |')[0]
    }
})
