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
                "help": "Background color"
            },
            {
                // Background color 2
                "name": "Background color",
                "id": "--bdv-bg-color-2",
                "type": "color",
                "default": "#232327",
                "help": "Widget background color"
            },
            {
                // Use custom accent color instead of harvest one
                "name": "Custom accent color",
                "var": "accent_override",
                "type": "checkbox",
                "default": false,
                "help": "Override school accent"
            },
            {
                // Accent color
                "name": "Accent color",
                "id": "--bdv-accent-color",
                "type": "color",
                "default": "#cf0f51",
                "help": "Custom accent color"
            },
            {
                // Error color
                "name": "Error color",
                "id": "--bdv-error-color",
                "type": "color",
                "default": "#ff5555",
                "help": "Color shown for errors"
            },
            {
                // Radiant
                "name": "Gradiants",
                "id": "--bdv-gradient",
                "type": "text",
                "default": "linear-gradient(90deg, #fd575a, #fc8151, #f9b931, #f9b931)",
                "help": "CSS gradients. Set to <kbd>none</kbd> to disable"
            }
        ]
    },
    {
        "category": "Layout",
        "settings": [
            {
                // Border radius
                "name": "Border radius",
                "id": "--bdv-border-radius",
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
                // Logo animation
                "name": "Static logo",
                "var": "disable_logo",
                "type": "checkbox",
                "default": true,
                "help": "Whether to suppress the logo animation on page opening"
            },
            {
                // Logo gaps
                "name": "Logo border",
                "id": "--bdv-logo-border",
                "type": "number",
                "default": "0",
                "help": "Border around the logo",
                "unit": "px"
            },
            {
                // Logo source
                "name": "Logo image",
                "var": "logo",
                "type": "text",
                "default": "bdv.png",
                "help": "Logo filename (<kbd>$school</kbd>, <kbd>bdv.png</kbd>, <kbd>generic.png</kbd> or custom)"
            }
        ]
    }
]