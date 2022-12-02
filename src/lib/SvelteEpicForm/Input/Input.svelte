<script lang="js">
  import { createEventDispatcher, getContext, onMount, setContext } from 'svelte';
  import { shouldDisplayInput, typesMap } from '../EpicFormService.js';
  import { get, set, cloneDeep, isEqual } from 'lodash-es';

  export let name;
  export let mode = 'write';
  export let containerClass = undefined;
  export let hideBorders;
  export let slimInputs;
  export let index,
    numbered,
    editable = false,
    draggable = false,
    duplicatable = false;
  export let validate = true;
  setContext('name', name);

  export let form = getContext('form');
  export let values = getContext('values');
  export let showAllInputs = false;
  export let disabled = false;
  const dispatch = createEventDispatcher();
  let errors = getContext('errors');
  let dirty = getContext('dirty');
  let input;
  let inputClass;
  let initialValue,
    initialized = false;
  let value;
  let shouldDisplay;
  let showError;
  let previousValue;
  onMount(() => {
    initialValue = cloneDeep(value);
    initialized = true;
  });

  function updateValues(_value) {
    values?.update((old) => set(old, name, _value));
  }

  function areValuesEqual(value1, value2) {
    if (!typesMap[input.type])
      throw new Error(
        `Input type of ${input?.type} is not found in the types map. Make sure you imported the type and the type property on your input is defined.`
      );
    if (typesMap[input.type].isEqual) {
      return typesMap[input.type].isEqual(value1, value2, input);
    } else {
      return isEqual(value1, value2);
    }
  }

  function checkExternalValueChanges(values) {
    const currentVal = get(values, name);
    if (!areValuesEqual(currentVal, value)) {
      value = currentVal;
    }
  }

  $: {
    if (typesMap && input && validate) {
      checkExternalValueChanges($values);
    }
  }
  $: {
    updateValues(value);
  }
  $: {
    input = $form.inputs.find((input) => input.name === name);
    inputClass = input?.layout?.[mode]?.containerClass || input?.layout?.containerClass || '';
  }
  $: shouldDisplay = showAllInputs || shouldDisplayInput($form.inputs, input, $values, mode);
  $: {
    if (initialized && $dirty[name] !== true && validate) {
      const currentVal = get($values, name);
      if (!areValuesEqual(initialValue, currentVal)) {
        $dirty[name] = true;
      }
    }
  }

  $: {
    const currentValue = get($values, name);
    if ($dirty[name] && !areValuesEqual(previousValue, currentValue)) {
      input?.onChange?.(previousValue, currentValue, input);
      previousValue = currentValue;
    }
  }

  $: showError = ($dirty[name] || $form.showAllErrors) && $errors[name];
</script>

{#if shouldDisplay && input}
  <section class="e-input-container e-input-type-{input.type} {inputClass || containerClass}">
    {#if numbered}
      <div class="flex flex-col w-full">
        {#if draggable && !disabled}
          <span class="material-icons">drag_indicator</span>
        {/if}
        <div class="e-input-container e-input-type-{input.type} flex">
          <div class="mr-sm">
            {index + 1}.
          </div>
          <div class="w-full flex flex-col">
            <svelte:component
              this={get(typesMap, [input.type, mode])}
              class="ml-md"
              {input}
              error={$errors[name]}
              isDirty={$dirty[name]}
              {showError}
              bind:value
              {disabled}
            />
          </div>
        </div>
      </div>
    {:else}
      <div class="flex flex-nowrap w-full">
        {#if draggable && !disabled}
          <span class="material-icons">drag_indicator</span>
        {/if}
        <div class="flex flex-col flex-shrink w-full">
          <svelte:component
            this={typesMap[input.type][mode]}
            {hideBorders}
            {slimInputs}
            {input}
            error={$errors[name]}
            isDirty={$dirty[name]}
            {showError}
            bind:value
            {disabled}
          />
        </div>

        {#if editable || duplicatable}
          <div class="flex flex-col rounded-md space-y-md justify-center">
            {#if editable}
              <div
                class="material-icons flex md:px-sm items-center cursor-pointer"
                on:click|preventDefault={() => dispatch('edit')}
              >
                edit
              </div>
            {/if}
            {#if duplicatable}
              <div
                class="material-icons flex md:px-sm items-center cursor-pointer"
                on:click|preventDefault={() => dispatch('duplicate')}
              >
                difference
              </div>
            {/if}
          </div>
        {/if}
      </div>
      {#if input?.imported && (editable || duplicatable)}
        <div class="flex items-center text-gray-400 ml-md">
          *Imported from: {input.imported}
        </div>
      {/if}
    {/if}
  </section>
{/if}
