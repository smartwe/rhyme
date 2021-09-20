<script lang="ts">
  import {
    HomeFilled,
    HomeOutlined,
    AddPlaylist,
    SettingsFilled,
    SettingsOutlined,
    AlbumFilled,
    AlbumOutlined,
  } from "rhyme-icons";
  import { location as spaLocation } from "svelte-spa-router";
  import SidebarLink from "../components/controls/SidebarLink.svelte";
  import { currentTheme } from "../store";
  function navigateLink(event) {
    event.preventDefault();
    location.href = event.target.href;
  }
</script>

<main>
  <div class="main-links">
    <SidebarLink
      text="Home"
      icons={{ activeIcon: HomeFilled, inactiveIcon: HomeOutlined }}
    />
    <SidebarLink
      text="Albums"
      link="albums"
      icons={{ activeIcon: AlbumFilled, inactiveIcon: AlbumOutlined }}
    />
    <SidebarLink
      text="Playlists"
      link="playlists"
      icons={{ activeIcon: AddPlaylist, inactiveIcon: AddPlaylist }}
    />
  </div>
  <SidebarLink
    text="Settings"
    link="settings"
    icons={{ activeIcon: SettingsFilled, inactiveIcon: SettingsOutlined }}
  />
</main>

<style lang="scss">
  main {
    overflow-x: visible;
    background-color: var(--panels-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em 1.5em;
    flex-shrink: 0;
    min-width: 250px;
    transition: 0.3s;
    .main-links {
      display: flex;
      flex-direction: column;
      overflow-x: visible;
    }
  }
</style>
