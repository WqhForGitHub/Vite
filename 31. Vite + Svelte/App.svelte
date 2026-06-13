<script>
  let count = 0
  let name = 'Svelte'

  function handleClick() {
    count += 1
  }

  $: doubled = count * 2
</script>

<main>
  <h1>Hello {name} + Vite!</h1>
  <button on:click={handleClick}>
    点击次数：{count}
  </button>
  <p>双倍：{doubled}</p>
  <input bind:value={name} />
</main>

<style>
  main {
    font-family: sans-serif;
    max-width: 720px;
    margin: 0 auto;
    padding: 2rem;
  }
  h1 { color: #ff3e00; }
  button { padding: 0.5rem 1rem; cursor: pointer; }
  input { padding: 0.4rem; }
</style>
