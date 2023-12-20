// Settings configuration
// User settings are stored in the browser storage

/*
Structure: list[dict[
    category: str,
    settings: list[dict[ name, id, var, type, help, unit ]]
]]
*/

const settings = [

    {
        "category": "Colors",
        "settings": [
            {
                // Foreground color
                "name": "Foreground color",
                "id": "--bdv-fg-color",
                "type": "color",
                "default": "#f8f8f2",
                "help": "Foreground color for text and icons"
            },
            {
                // Background color 1
                "name": "Background color",
                "id": "--bdv-bg-color",
                "type": "color",
                "default": "#18181a",
                "help": "Background colors"
            },
            {
                // Background color 2
                "name": "Background color",
                "id": "--bdv-bg-color-2",
                "type": "color",
                "default": "#232327",
                "help": "Background colors"
            },
            {
                // Use custom accent color instead of harvest one
                "name": "Custom accent color",
                "var": "accent_override",
                "type": "checkbox",
                "default": false,
                "help": "Whether to use a custom accent instead of the school accent"
            },
            {
                // Accent color
                "name": "Accent color",
                "id": "--bdv-accent-color",
                "type": "color",
                "default": "#cf0f51",
                "help": "Dashboard accent. Defaults to the school accent"
            },
            {
                // Error color
                "name": "Error color",
                "id": "--bdv-error-color",
                "type": "color",
                "default": "#ff5555",
                "help": "Color shown in case of error"
            }
        ]
    },
    {
        "category": "Layout",
        "settings": [
            {
                // Border radius
                "name": "Border radius",
                "id": "--bdv--border-radius",
                "type": "number",
                "default": "10",
                "help": "Layout border radius",
                "unit": "px"
            },
            {
                // Inner gaps
                "name": "Inner gaps",
                "id": "--bdv-gap",
                "type": "number",
                "help": "Layout inner gaps",
                "default": "10",
                "unit": "px"
            },
            {
                // Inner gaps
                "name": "Outer gaps",
                "id": "--bdv-ext-gap",
                "type": "number",
                "help": "Layout outer gaps",
                "default": "10",
                "unit": "px"
            }
        ]
    },
    {
        "category": "Logo",
        "settings": [
            {
                // Logo gap
                "name": "Logo border",
                "id": "--bdv-logo-border",
                "type": "number",
                "default": "10",
                "help": "Gaps between the logo and its border",
                "unit": "px"
            },
            {
                // Logo animation
                "name": "Static logo",
                "var": "disable_logo",
                "type": "checkbox",
                "default": true,
                "help": "Whether to suppress a small animation on page opening"
            },
            {
                // Logo source
                "name": "Logo image",
                "var": "logo",
                "type": "text",
                "default": "bdv.png",
                "help": "Filename of a logo in injections/assets/"
            }
        ]
    }
]