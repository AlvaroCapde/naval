<script lang="js">
  import TextRead from '../TextType/TextRead.svelte';

  export let input;
  export let value = undefined;
  let label;

  function setLabel(valueArg, inputArg) {
    const option = inputArg.data.options.find((option) => option.value === valueArg);
    if (option) {
      label = option.label;
    }
  }
  function setModifiedOptionLabel(valueArg, inputArg) {
    const option = inputArg.data.options.find(
      (option) =>
        inputArg.data.optionValueModifier(valueArg) ===
        inputArg.data.optionValueModifier(option.value)
    );
    if (option) {
      label = option.label;
    }
  }
  $: {
    if (value) {
      if (input.data.valueAssignationFunction && input.data.optionValueModifier) {
        setModifiedOptionLabel(value, input);
      } else {
        setLabel(value, input);
      }
    }
  }
</script>

<TextRead {input} value={label} />
