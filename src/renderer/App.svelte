<script lang="ts">
  import HomeView from './views/HomeView.svelte';
  import Router from 'svelte-spa-router';
  import { currentTheme } from './services/store';
  import SideBar from './components/widgets/SideBar.svelte';
  import StatusBar from './components/widgets/StatusBar.svelte';

  import Scrollbar from 'smooth-scrollbar';
  import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
  import BottomBar from './components/widgets/BottomBar.svelte';
  Scrollbar.use(OverscrollPlugin);

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
  <div class="main-content">
    <SideBar />
    <div class="router">
      <Router {routes} />
      <BottomBar />
    </div>
  </div>
  <StatusBar />
</main>

<style lang="scss">
  main {
    width: 100vw;
    height: 100vh;
  }
  .main-content {
    width: 100%;
    height: calc(100% - 24px);
    display: flex;
  }
  .router {
    width: calc(100% - 230px);
    display: flex;
    flex-direction: column;
  }
</style>
