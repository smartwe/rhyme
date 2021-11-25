<script>
  import Scrollbar from 'smooth-scrollbar';

  import { onMount } from 'svelte';

  onMount(() => {
    Scrollbar.initAll({
      damping: 0.07,
      plugins: {
        overscroll: {
          enable: true,
          effect: 'bounce',
          damping: 0.15,
        },
      },
    });
  });
</script>

<main data-scrollbar>
  <slot>U Need to Add content here</slot>
</main>

<style>
  main {
    width: 100%;
    height: 100%;
  }
</style>
