<script lang="ts">
  import { songs } from '@/managers/songs-manager';
  import Scrollable from '../components/controls/Scrollable.svelte';
  import SongItem from '../components/items/SongItem.svelte';
  import RecentlyPlayed from '../components/widgets/RecentlyPlayed.svelte';
  import { currentTheme, settings } from '../services/store';
  import { SongsNotFound } from 'rhyme-icons';

  import { shell } from 'electron';
</script>

{#if $songs.length < 0}
  <Scrollable>
    <main class="page">
      <RecentlyPlayed />
      <div class="songs">
        {#each $songs as song}
          <SongItem {song} />
        {/each}
      </div>
    </main>
  </Scrollable>
{:else}
  <div class="songs-not-sound">
    <SongsNotFound
      width="45%"
      accentColor={$currentTheme.colors.accentColor}
      secondaryColor={$currentTheme.colors.textColor}
    />
    <p>
      We couldn’t find audio files in {$settings.musicFolder} if you have audio files in the path specified Try opening an
      issuse on
      <button
        on:click={() => {
          shell.openExternal('https://github.com/Rhyme-Player/Rhyme/issues');
        }}>Github</button
      > with the audio files extentions for us to support it
    </p>
  </div>
{/if}

<style lang="scss">
  .songs {
    display: grid;
    grid-template-columns: repeat(auto-fill, 140px);
    justify-content: space-between;
    row-gap: 20px;
    column-gap: 10px;
    margin-top: 25px;
  }
  .songs-not-sound {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 3em;
    text-align: center;
    flex-direction: column;
    gap: 50px;
    font-size: 1em;
    p > button {
      background: none;
      border: none;
      color: var(--accent-color);
      cursor: pointer;
      font-size: 1em;
    }
  }
</style>
