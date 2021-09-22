<script lang="ts">
  import { ThemeItem as ThemeIcon } from "rhyme-icons";
  import { themeManager } from "../../store";
  export let theme;
  function onClick() {
    $themeManager["currentTheme"] = theme.id;
  }
</script>

<main on:click={onClick}>
  <div class="icon">
    <ThemeIcon
      width="120px"
      accentColor={theme.accentColor}
      bgColor={theme.backgroundColor}
      panelsColor={theme.panelsColor}
      textColor={theme.textColor}
    />
  </div>
  <div class="titles">
    <h4 class="ellipsis-text">{theme.name}</h4>
    <p class="ellipsis-text">{theme.author}</p>
  </div>
</main>

<style lang="scss">
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
