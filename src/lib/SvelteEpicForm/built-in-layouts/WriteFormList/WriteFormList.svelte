<script lang="js">
  import { WriteForm } from '$lib/SvelteEpicForm';
  import { writable } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let values;
  export let forms;
  export let currentFormIndex = 0;
  export let secondaryButtonText;
  export let headerClass;
  export let showPrevious = true;
  export let inputContainerClass = '';
  export let buttonsContainerClass =
    'grid grid-cols-2 gap-x-md md:mt-md md:relative fixed bottom-0 right-0 w-full md:px-0 px-lg py-md md:shadow-none shadow-lg md:bg-none bg-white';
  export let listClass = 'grid grid-cols-1 md:gap-y-xl gap-y-md';
  $: form = writable(forms[currentFormIndex]);

  function submit(event) {
    const finished = forms.length - 1 === currentFormIndex;
    dispatch('submit', { ...event.detail, finished });
    if (!finished) {
      currentFormIndex = currentFormIndex + 1;
    }
  }

  function cancel(event) {
    dispatch('cancel', event.detail);
  }
</script>

{#if form}
  {#key form}
    <WriteForm
      bind:values
      {form}
      {headerClass}
      {listClass}
      {inputContainerClass}
      primaryButtonClass="button-primary"
      secondaryButtonClass="button-secondary"
      {secondaryButtonText}
      {buttonsContainerClass}
      primaryButtonText={forms.length - 1 === currentFormIndex ? 'FINISH' : 'SAVE & CONTINUE'}
      on:submit={submit}
      on:cancel={cancel}
    />

    {#if currentFormIndex !== 0 && showPrevious}
      <button
        class="text-button-primary w-min pt-lg pl-0"
        on:click={() => (currentFormIndex = currentFormIndex - 1)}
      >
        Previous
      </button>
    {/if}
  {/key}
{/if}
