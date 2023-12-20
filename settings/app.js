/*
 * Config page script
 */

document.querySelector('#save').addEventListener('click', async () => {
    // Save settings

    let scheme = {color_scheme: ':root{'}

    document.querySelectorAll('#main input').forEach(param => {

        let var_ = param.dataset.var
        if (var_) {

            let res = param.dataset.value

            if (param.type === 'checkbox') {
                res = param.checked
                if (var_.startsWith('!')) res = !res
            }
            scheme[var_.replace('!', '')] = res

        } else {
            scheme.color_scheme += `${param.id}:${param.value}${param.dataset.unit ?? ''} !important;`
        }

    })

    scheme.color_scheme += '}'

    // Write to storage
    console.log('Saving', scheme)
    await browser.storage.sync.set(scheme)

    // Reload tabs
    tabs = await browser.tabs.query({ url: ['*://www.leonard-de-vinci.net/*'] })

    tabs.forEach(async tab => {
        await browser.tabs.reload(tab.id)
    })

    alert('Scheme saved.')
})

document.querySelector('#reset').addEventListener('click', () => {
    // Reset settings

    document.querySelectorAll('#main input').forEach(param => {

        if (param.type === 'checkbox')
            param.checked = param.dataset.default === 'true'
        else
            param.value = param.dataset.default

        param.dispatchEvent(new Event('input', { bubbles: true }))
    })
})

;/*{}*/;(async () => {
    // Fetch saved settings
    const pool = await browser.storage.sync.get()

    console.log('Using pool', pool)

    // Build settings
    settings.forEach(category => {
        
        html = document.createElement('div')
        html.innerHTML += `<h2>${category.category}</h2>`

        category.settings.forEach(param => {

            let setting = document.createElement('div')
            setting.classList.add('setting')
            setting.innerHTML = `<p class="help"><span>${param.name}</span> ${param.help}</p>`

            let wrapper = document.createElement('div')
            
            let input = document.createElement('input')
            input.id = param.id || param.name
            input.type = param.type === 'color' ? 'text' : param.type
            input.value = param.default
            input.dataset.default = param.default
            
            if (param.var) input.dataset.var = param.var
            if (param.unit) input.dataset.unit = param.unit
            if (param.type === 'color') input.classList.add('coloris')

            // Find in pool
            let value;
            if (param.var)
                value = pool[param.var]

            else {
                rule = new RegExp(`${input.id}: (.*?)(px)? (!important)?;`)
                match = rule.exec(pool.color_scheme)

                if (match?.length > 1) value = match[1]
            }

            // Use default is not found
            if (value === undefined || value === null)
                value = param.default

            // Apply value
            if (param.type === 'checkbox' && value)
                input.setAttribute('checked', 'checked')
            else
                input.setAttribute('value', value)

            wrapper.appendChild(input)

            wrapper.innerHTML += `<button data-id="${input.id}" class="reseter">
                                      <i class="fa-solid fa-xmark"></i>
                                  </button>`;
            setting.appendChild(wrapper)
            html.appendChild(setting)
        })

        document.querySelector('#main').appendChild(html)
    })

    // Attach reset buttons listeners
    document.querySelectorAll('.reseter').forEach(btn => {
        btn.addEventListener('click', btn_ => {
            el = document.getElementById(btn.dataset.id)

            console.log('reseting', btn.dataset.id, el.dataset.default)

            el.value = el.checked = el.dataset.default
            
            // Update change
            el.dispatchEvent(new Event('input', { bubbles: true }))
        }, btn)
    })

    // Setup coloris
    Coloris({
        el: '.coloris',
        theme: 'large',
        themeMode: 'dark',
        alpha: false,
        format: 'auto',
        selectInput: true
    })

})()