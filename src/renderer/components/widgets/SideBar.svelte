<script lang="ts">
  // your script goes here

  import LinkItem from '../controls/LinkItem.svelte';
  import { HomeFilled, HomeOutlined } from 'rhyme-icons';
</script>

<main>
  <LinkItem icons={{ active: HomeFilled, default: HomeOutlined }} text="Home" />
</main>

<style lang="scss">
  main {
    width: 240px;
    height: 100%;
    background-color: var(--panels-color);
    flex-shrink: 0;
    padding: 1em;
  }
</style>
