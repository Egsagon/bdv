# BetterDeVinci

A style and script rethemer for leonard-de-vinci.net.

```json
"exclude_globs": [ "*my=*" ]
```

### Websites injected

- [leonard-de-vinci.net](https://www.leonard-de-vinci.net)
- [learning.devinci.fr](https://learning.devinci.fr)
- [adfs.devinci.fr (auther)](https://adfs.devinci.fr)

### Project structure

```shell
|- manifest.json    # Extension manifest
|
|- injections       # All injection ressources
|  |- css/*.css     # CSS stylesheets to inject
|  |- js/*.js       # JS scripts to inject
|  |- html/*.html   # HTML pages to inject
|
|- options/*        # Firefox settings page
|
|- popup/*          # Firefox popup page
```

### TODO:

- [ ] Santé
- [ ] Cours page
- [ ] Offres de stage
- [ ] Logout page
- [ ] Messages
- [ ] Gestion de stages

### Screenshot (WIP)

#### Extension popup
![](https://github.com/Egsagon/pork/blob/98a2f7babd33d4a5573b2a9c726cf80d03a7cb48/assets/popup.png)

#### Extension settings
![](https://github.com/Egsagon/pork/blob/98a2f7babd33d4a5573b2a9c726cf80d03a7cb48/assets/options_ui.png)

#### Main page (default scheme with square borders)
![](https://github.com/Egsagon/pork/blob/98a2f7babd33d4a5573b2a9c726cf80d03a7cb48/assets/squared.png)

#### Main page (custom accent color, overrides school accent, rounded)
![](https://github.com/Egsagon/pork/blob/98a2f7babd33d4a5573b2a9c726cf80d03a7cb48/assets/green.png)

#### Main page (custom colors)
![](https://github.com/Egsagon/pork/blob/98a2f7babd33d4a5573b2a9c726cf80d03a7cb48/assets/custom.png)
