/* Injections for the ADFS page */

// mods = [
//     ['#loginMessage', '<h1>Authentificate</h1>'],
//     ['#introduction', `<a onclick="RedirectToPSChange()">Change password</a><br>
//       <a href="https://www.leonard-de-vinci.net/lost_password.php">Forgot password?</a>`]
// ]

$(window).on('DOMContentLoaded', () => {

    // for (let [key, value] of mods) $(key).html(value)
    
    $('#loginMessage').html('<h1>Authentificate</h1>')

    $('#introduction').html(`
        <a onclick="RedirectToPSChange()">Change password</a>
        <br>
        <a href="https://www.leonard-de-vinci.net/lost_password.php">Forgot password?</a>
    `)
})