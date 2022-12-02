<script lang="js">
  import Input from '../../Input/Input.svelte';
  import Form from '../../Form/Form.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let form;
  export let values;
  export let errors = undefined;
  export let dirty = undefined;

  export let containerClass = '';
  export let headerClass = '';
  export let listClass = '';
  export let inputContainerClass = undefined;
  export let descriptionClass = '';
  export let numbered = false;
  export let disabled = false;

  //Buttons
  export let showButtons = true;
  export let buttonsContainerClass = '';

  //Primary button
  export let showPrimaryButton = true;
  export let primaryButtonText = 'Submit';
  export let primaryButtonClass = '';

  //Secondary Button
  export let showSecondaryButton = true;
  export let secondaryButtonText = 'Cancel';
  export let secondaryButtonClass = '';

  // used for numbering inputs
  let indexMap = [];

  function onSubmit(hasErrors) {
    if (hasErrors) {
      // Prevent submission and show all errors
      return ($form.showAllErrors = true);
    }

    dispatch('submit', {
      values: $values,
      errors: $errors,
      dirty: $dirty,
      form: $form
    });
  }

  function onCancel() {
    dispatch('cancel', {
      values: $values,
      errors: $errors,
      dirty: $dirty,
      form: $form
    });
  }

  $: {
    if ($form?.inputs?.length) {
      let numHtmlInputs = 0;
      indexMap = $form?.inputs?.map((input) => {
        if (input?.type === 'html') numHtmlInputs++;
        return numHtmlInputs;
      });
      if (disabled) {
        $form.inputs = $form.inputs.map((input) => {
          return { ...input, disabled: true };
        });
      }
    }
  }
</script>

<section class={containerClass}>
  <Form {form} let:hasErrors bind:values bind:errors bind:dirty let:validating>
    {#if $form.header}
      <h1 class={headerClass}>
        {$form.header}
      </h1>
    {/if}
    {#if $form.description}
      <p class={descriptionClass}>
        {$form.description}
      </p>
    {/if}
    <div class={listClass}>
      {#each $form.inputs as input, index (`${input.name}_${JSON.stringify(input.displayCondition) || ''}`)}
        <Input
          {form}
          disabled={input.disabled}
          name={input.name}
          containerClass={inputContainerClass}
          index={index - indexMap[index] < 0 ? 0 : index - indexMap[index]}
          numbered={numbered && input?.type !== 'html'}
        />
      {/each}
    </div>
    {#if showButtons}
      <div class={buttonsContainerClass}>
        <button
          disabled={hasErrors || disabled || validating}
          class={primaryButtonClass}
          type="submit"
          on:click|preventDefault={() => onSubmit(hasErrors || disabled)}
        >
          {primaryButtonText}
        </button>
        {#if showSecondaryButton}
          <button class={secondaryButtonClass} on:click|preventDefault={onCancel}>
            {secondaryButtonText}
          </button>
        {/if}
      </div>
    {/if}
  </Form>
</section>
