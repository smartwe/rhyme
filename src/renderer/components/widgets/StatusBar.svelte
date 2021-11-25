<script>
  import { songs } from '@/managers/songs-manager';
</script>

<main>
  <ul class="left">
    <li class="bold ellipsis-text" style="max-width:250px">
      Next: {$songs[1]?.name ?? ''}
    </li>
    <li>{$songs.length} song/s</li>
    <li>Total time: Unknown</li>
  </ul>
  <ul class="right" />
</main>

<style lang="scss">
  main {
    height: 24px;
    width: 100%;
    flex-shrink: 1;
    background-color: var(--panels-color);
    border-top: 2px solid var(--text-color);
    display: flex;
    align-items: center;
    padding: 0.1em 1em;
    justify-content: space-between;
    font-size: 14px;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 15px;
    li {
      list-style: none;
    }
  }

  .bold {
    color: var(--title-color);
    font-weight: 500;
  }
</style>
