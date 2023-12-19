const main = document.querySelector('#main')

document.querySelector('#save').addEventListener('click', () => {
    // Save settings

    document.querySelectorAll('#main input').forEach(param => {
        console.log(param.id, param.value)
    })
})

;/*{}*/;(async () => {
    // Fetch saved settings
    pool = await browser.storage.sync.get()

    // Build settings
    settings.forEach(category => {
        
        html = document.createElement('div')
        html.innerHTML += `<h2>${category.category}</h2>`

        category.settings.forEach(param => {

            let input = document.createElement('input')
            input.id = param.id || param.name
            input.type = param.type === 'color' ? 'text' : param.type
            input.value = param.default
            input.dataset.default = param.default

            console.log(input)

            if (param.type === 'color') input.classList.add('coloris')
            if (param.type === 'checkbox') input.checked = param.default

            html.innerHTML += `<div class="setting">
                <p class="help" data-help="${param}">${param.help}</p>
                <div>
                    ${input.outerHTML}
                    <button data-id="${input.id}">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>`
        })

        // Attach button listeners
        document.querySelectorAll('#main button').forEach(btn => {
            btn.addEventListener('click', btn_ => {
                console.log('reseting', btn.dataset.id)
                el = document.getElementById(btn.dataset.id)
                el.value = el.dataset.default
            }, btn)
        })

        main.appendChild(html)
    })

    // Setup coloris
    Coloris({
        el: '.coloris',
        theme: 'large',
        themeMode: 'dark',
        alpha: false,
        format: 'auto',
        selectInput: true,
    })
})()