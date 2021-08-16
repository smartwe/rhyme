<!-- Link to latest file: https://github.com/Rhyme-Player/RhymeApp/releases/latest/download/file.name -->
<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/Rhyme-Player/RhymeApp">
    <img src="icons/linux/icons/128x128.png" alt="Logo">
  </a>
  <h1 align="center">Rhyme</h1>
  <h4 align="center">
    Support us by sharing the app or up voting us on product hunt
    <br/>
    <br/>
    <a href="https://www.producthunt.com/posts/rhyme?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-rhyme" target="_blank">
      <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?v=1&post_id=307173&theme=dark" style="width: 250px; height: 54px;" width="250" height="54" /></a>
  </h2>
  <h1 align="center">
    <img src ="https://img.shields.io/matrix/rhymes-player:matrix.org">
    <img src ="https://img.shields.io/github/issues-raw/Rhyme-Player/RhymeApp">
    <img src ="https://img.shields.io/github/issues-pr/Rhyme-Player/RhymeApp">
    <img src ="https://img.shields.io/github/downloads/Rhyme-Player/RhymeApp/total">
    <img src ="https://img.shields.io/github/stars/Rhyme-Player/RhymeApp">
  </h1>
  <h3 align="center">
    The Home of your Music
    <br/>
    <br/>
  <img src="https://user-images.githubusercontent.com/77546233/124939252-7c95af00-dff8-11eb-94a6-75abdde49640.png"/>
  </h3>
</p>

<br/>
<br/>
<br/>

## Features
- Supports: mp3, opus, ogg, wav, aac, m4a and webm.
- Install themes made by the community
- Home: Contains your local installed music reads music from default music folder change this in settings
- Albums: Displays all the albums that are included in the id3 of the music files
- Playlists: Create and suffle through playlists (Work in progress)
- Artists: View all the artists that came included with the music files' id3 tag
- Theme manager:
   - Dark and light theme come by default
   - Theme maker to create and use your own theme and you have an option to upload it to the store
- More comming, if you want a feature implemented feel free to open an issue with a feature request

<br/>

> Note: If you have questions or want to talk about the app join our public [Matrix Channel](https://app.element.io/#/room/#rhymes-player:matrix.org)

<br/>

# Download

## From source

- clone repo and `cd` into it
- run `yarn` or `npm i` to install dependencies
- run `yarn build && yarn electron-builder` or `npm run build && npm run electron-builder` to generate executable for your os in the `build_dist` dir

<br/>

## On linux

### Snap

> Note: After you install the snap run `snap connect rhyme:audio-playback rhyme:home` in the terminal to allow rhyme to read files and play sound or from the permessions gui in the store

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/rhyme)

### Flatpak

Coming soon

### Package manager

- `apt` - Not yet supported
- `pacman` - Not yet supported
- `dnf` - Not yet supported

### Github

- Go to [Releases Page](https://github.com/Rhyme-Player/RhymeApp/releases)
- Search for file we currently support `AppImage`, `deb`, `rpm` and `pacman` files

<br/>

## On windows

- Download from [site](https://rhyme.netlify.app/downloads/win/)

Or

- Go to [Releases Page](https://github.com/Rhyme-Player/RhymeApp/releases)
- Search for file we currently support `exe` and `msi` files

<br/>

## On mac os

- Download from [site](https://rhyme.netlify.app/downloads/mac/)

Or

- Go to [Releases Page](https://github.com/Rhyme-Player/RhymeApp/releases)
- Search for file we currently support `dmg` and `pkg` files

# Contributing

When contributing to `Rhyme`, please first discuss the change you wish to make via a discussion or an issue
When creating a pull request please use Emojis for your commits
See also [gitmoji](https://gitmoji.carloscuesta.me/).
to view comments or notes left in the code run `yarn notes-checker`or `npm run notes-checker`

# Pull Requests

Please put in mind that even if you have the write access to merge a PR wait for reviews from me or other contributors
if the feature that the PR implements is still not finished please convert the PR to a draft to let reviewers know that it is incomplete
before you make your PR ready for reviews you must make sure that it passed all the checks
