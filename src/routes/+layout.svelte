<main>
  <h1>spritesheeter</h1>

  <slot></slot>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0 4rem;
    font-family: ui-monospace, 
      Menlo, Monaco, 
      "Cascadia Mono", "Segoe UI Mono", 
      "Roboto Mono", 
      "Oxygen Mono", 
      "Ubuntu Monospace", 
      "Source Code Pro",
      "Fira Mono", 
      "Droid Sans Mono", 
      "Courier New", monospace;
  }

  main { 
    display: flex;
    flex-direction: column;
    justify-self: center;
    width: 100%;
    max-width: 60rem;
    padding: 2rem;
  }

  h1 {
    margin: 0 0 1rem;
    padding: 0;
    font-size: 2rem;
    font-weight: 400;
  }
</style>