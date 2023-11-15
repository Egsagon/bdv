// Utilities

window.pork = {

    version: 0.1,

    fetch: async path => {
        // Fetch a local ressource

        var url = browser.runtime.getURL(path)

        var file = await fetch(url, {mode: 'same-origin'})
        var blob = await file.blob()
        var read = new FileReader()

        return new Promise((resolve, reject) => {
            
            read.onload = () => {resolve(read.result)}
            read.onerror = reject

            read.readAsText(blob)
        })
    },

    choice: array => {
        // Random choice

        index = Math.floor(Math.random() * array.length)
        return array[index]
    },

    accent: img => {
        // Get school accent color

        x = 3
        y = 3

        // Mostly from so:questions/37503875
        canvas = document.createElement('canvas')
        canvas.width = 1
        canvas.height = 1

        ctx = canvas.getContext('2d')
        ctx.drawImage(img, x, y, 1, 1, 0, 0, 1, 1)
        pixel = ctx.getImageData(0, 0, 1, 1).data
        return {r: pixel[0], g: pixel[1], b: pixel[2]}
    },

    inject_scheme: async () => {
        // Ask for the custom CSS settings

        pool = await browser.storage.sync.get()

        if (pool.color_scheme) {
            style = document.createElement('style')
            style.innerHTML = pool.color_scheme
            
            document.body.append(style)
            console.log('[PORK] [CSRIPT] Injected custom color scheme')
        }
    }
}

// EOF