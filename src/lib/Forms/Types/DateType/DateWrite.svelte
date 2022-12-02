<script lang="ts">
  import InputControl from '../InputControl.svelte';
  import HtDate from '$lib/HtDate/HtDate.svelte';

  export let input;
  export let value = undefined;
  export let showError;
  export let error;
  export let isDirty;
</script>

<InputControl {input} {value} {showError}>
  <HtDate
    bind:value
    {showError}
    dayText="Day"
    monthText="Month"
    yearText="Year"
    minYear={input.data && input.data.minYear}
    maxYear={input.data && input.data.maxYear}
    showDay={input.data && input.data.showDay}
    required={input.required}
    disabled={input.disabled}
    autocompleteDay={input.data?.autocompleteDay || 'off'}
    autocompleteMonth={input.data?.autocompleteMonth || 'off'}
    autocompleteYear={input.data?.autocompleteYear || 'off'}
  />
</InputControl>
