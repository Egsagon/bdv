# BetterDeVinci

A style and script rethemer for leonard-de-vinci.net.

### Websites injected

- [leonard-de-vinci.net](https://www.leonard-de-vinci.net)
- [learning.devinci.fr](https://learning.devinci.fr)
- [adfs.devinci.fr (auther)](https://adfs.devinci.fr)

### Project structure

```
|- manifest.json    Extension manifest
|
|- injections       All injection ressources
|  |- css/*.css     CSS stylesheets to inject
|  |- js/*.js       JS scripts to inject
|  |- html/*.html   HTML pages to inject
|
|- options/*        Firefox settings page
|
|- popup/*          Firefox popup page
```

### Currently rethemed pages:

> Out of static glob only

| Done | Page            | Glob                                                                                                                   |
|------|-----------------|------------------------------------------------------------------------------------------------------------------------|
| [x]  | Home            | [`/`](https://www.leonard-de-vinci.net)                                                                                | 
| [x]  | Portal          | [`/`](https://www.leonard-de-vinci.net)                                                                                |
| [x]  | AFDS            | [`adfs.devinci.fr/adfs`](https://adfs.devinci.fr/adfs)                                                                 |
| [x]  | Finances        | [`/student/finances`](https://www.leonard-de-vinci.net/student/finances)                                               |
| [x]  | Presences       | [`/student/presences`](https://www.leonard-de-vinci.net/student/presences)                                             |
| [x]  | Presence        | [`/student/presences/<token>`](https://www.leonard-de-vinci.net/student/presences/<token>)                             |
| [x]  | Cours           | [`/student/cours`](https://www.leonard-de-vinci.net/student/cours)                                                     |
| [ ]  | Offres de stage | [`/student/stages_offres`](https://www.leonard-de-vinci.net/student/stages_offres)                                     |
| [ ]  | att. présences  | [`/student/attestations_presences`](https://www.leonard-de-vinci.net/student/attestations_presences)                   |
| [ ]  | Gestion stages  | [`/student/stages`](https://www.leonard-de-vinci.net/student/stages)                                                   |
| [ ]  | International   | [`/student/international`](https://www.leonard-de-vinci.net/student/international)                                     |
| [ ]  | Mes séjours     | [`/student/international/#block_mon_sejour`](https://www.leonard-de-vinci.net/student/international/#block_mon_sejour) |
| [ ]  | Salles          | [`/student/salles`](https://www.leonard-de-vinci.net/student/salles)                                                   |
| [ ]  | Plans arche     | [`/maps/arche/`](https://www.leonard-de-vinci.net/maps/arche/)                                                          |
| [x]  | Promotion       | [`/promotion`](https://www.leonard-de-vinci.net/promotion)                                                             |