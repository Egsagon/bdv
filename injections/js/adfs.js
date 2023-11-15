/* Injections for the ADFS page */

window.bdv.init(false)

$(window).on('DOMContentLoaded', () => {

    // window.bdv.log('Starting injection')

    $('#loginMessage').html('<h1>Authentificate</h1>')

    $('#introduction').html(`
        <a onclick="RedirectToPSChange()" href="#">Change password?</a>
        <br>
        <a href="https://www.leonard-de-vinci.net/lost_password.php">Forgot password?</a>
    `)
})