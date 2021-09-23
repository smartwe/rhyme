<script lang="ts">
  import { ThemeItem as ThemeIcon, CheckCircle } from "rhyme-icons";
  import { currentTheme, themeManager } from "../../store";
  export let theme;
  function onClick() {
    if (usedTheme) return;
    $themeManager["currentTheme"] = theme.id;
  }
  $: usedTheme = $themeManager["currentTheme"] === theme.id;
</script>

<main on:click={onClick}>
  {#if usedTheme}
    <div class="usedTheme">
      <CheckCircle fill={$currentTheme["accentColor"]} />
    </div>
  {/if}
  <div class="icon">
    <ThemeIcon width="120px" accentColor={theme.accentColor} bgColor={theme.backgroundColor} panelsColor={theme.panelsColor} textColor={theme.textColor} />
  </div>
  <div class="titles">
    <h4 class="ellipsis-text">{theme.name}</h4>
    <p class="ellipsis-text">{theme.author}</p>
  </div>
</main>

<style lang="scss">
  .usedTheme {
    position: absolute;
    top: 14px;
    background-color: #7f7f7fa5;
    width: 120px;
    height: 64px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  main {
    display: flex;
    background-color: var(--panels-color);
    flex-direction: column;
    flex-shrink: 0;
    border-radius: 8px;
    width: 140px;
    height: 140px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 10px;
    position: relative;
  }
  h4,
  p {
    max-width: 100px;
    text-align: center;
    color: var(--text-color);
  }
  p {
    font-size: 0.7em;
  }
  h4 {
    font-weight: normal;
    color: var(--titles-color);
    font-size: 1em;
  }
</style>
