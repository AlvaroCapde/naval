<script lang="js">
  import InputControl from '../InputControl.svelte';
  import HtSelect from '../../../HtSelect/HtSelect.svelte';
  export let input;
  export let value = undefined;
  export let showError;

  let modifiedValue;
  let modifiedOptions;
  let valueInit = false;

  function assignValue(modifiedValueArg, inputArg) {
    value = input.data.valueAssignationFunction(modifiedValueArg, modifiedOptions, inputArg);
  }

  $: {
    if (input.data.optionValueModifier) {
      modifiedOptions = input.data.options.map((option) => ({
        label: option.label,
        value: input.data.optionValueModifier(option.value)
      }));
    }
  }

  $: {
    if (input.data.valueAssignationFunction) {
      assignValue(modifiedValue, input);
    }
  }

  $: {
    if (!valueInit && value) {
      if (input.data.optionValueModifier && typeof value === 'object') {
        modifiedValue = input.data.optionValueModifier(value);
      }
      valueInit = true;
    }
  }
</script>

<InputControl {input} {value} {showError}>
  {#if input.data.valueAssignationFunction && input.data.optionValueModifier}
    <HtSelect
      on:click
      options={modifiedOptions}
      placeholder={input.placeholder}
      disabled={input.disabled}
      required={input.required}
      bind:value={modifiedValue}
      {showError}
    />
  {:else}
    <HtSelect
      on:click
      options={input.data.options}
      placeholder={input.placeholder}
      disabled={input.disabled}
      required={input.required}
      bind:value
      {showError}
    />
  {/if}
</InputControl>
