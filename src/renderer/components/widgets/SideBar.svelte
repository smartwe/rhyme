<script lang="ts">
  import LinkItem from '../controls/LinkItem.svelte';
  import { HomeFilled, HomeOutlined, SettingsFilled, SettingsOutlined } from 'rhyme-icons';
</script>

<main>
  <div class="links">
    <LinkItem icons={{ active: HomeFilled, default: HomeOutlined }} text="Home" />
  </div>
  <LinkItem icons={{ active: SettingsFilled, default: SettingsOutlined }} text="Settings" link="settings" />
</main>

<style lang="scss">
  main {
    width: 230px;
    height: 100%;
    background-color: var(--panels-color);
    padding: 1em;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
