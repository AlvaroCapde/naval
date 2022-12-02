<script lang="js">
  export let value = undefined,
    disabled = undefined,
    placeholder = undefined,
    options,
    showError,
    required = undefined,
    autocomplete = 'off',
    componentClass,
    selectClass = '';
</script>

<div class={componentClass || 'w-full flex items-stretch'}>
  <select
    class="base-input pr-lg {selectClass}"
    on:click
    on:change
    {required}
    {disabled}
    class:base-input-error={showError}
    bind:value
    {placeholder}
    {autocomplete}
  >
    <option value={undefined}>{placeholder || ''}</option>
    {#if options}
      {#each options as { label, value }}
        <option {value}>{label}</option>
      {/each}
    {/if}
  </select>
</div>
