<script lang="ts">
  import HomeView from './views/HomeView.svelte';
  import Router from 'svelte-spa-router';
  import { currentTheme } from './services/store';
  import SideBar from './components/widgets/SideBar.svelte';

  const routes = {
    '/': HomeView,
  };
</script>

<main
  style="
  --background-color:{$currentTheme.colors.backgroundColor};
  --panels-color:{$currentTheme.colors.panelsColor};
  --title-color:{$currentTheme.colors.titleColor};
  --accent-color:{$currentTheme.colors.accentColor};
  --sidebar-active-color:{$currentTheme.colors.sidebarActiveColor};
  --text-color:{$currentTheme.colors.textColor};"
>
  <SideBar />
  <Router {routes} />
</main>

<style lang="scss">
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
  }
</style>
