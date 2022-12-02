<script lang="js">
  import InputControl from '../InputControl.svelte';

  export let input;
  export let value = undefined;
  export let showError;
  export let error;
  export let isDirty;
</script>

<InputControl {input} {value} {showError}>
  <input
    class="base-input"
    class:base-input-error={showError}
    type="text"
    name={input.name}
    disabled={input.disabled}
    required={input.required}
    placeholder={input.placeholder}
    bind:value
  />
</InputControl>
