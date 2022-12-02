<script lang="js">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { getNumberOfErrors, getFormValidationErrors } from '../EpicFormService.js';
  import { debounce } from 'lodash-es';
  const debouncedGetFormValidationErrors = asyncDebounce(getFormValidationErrors, 250);
  export let form, forms, currentFormIndex, validating;
  setContext('form', form);

  export let values;
  if (values && !values?.update) throw 'values needs to be a writable store';
  if (!values) console.warn('values needs to be a writable store');
  setContext('values', values);

  export let errors = writable({});
  setContext('errors', errors);

  export let dirty = writable({});
  setContext('dirty', dirty);

  let hasErrors;

  function asyncDebounce(func, wait) {
    const debounced = debounce((resolve, reject, args) => {
      func(...args)
        .then(resolve)
        .catch(reject);
    }, wait);
    return (...args) =>
      new Promise((resolve, reject) => {
        debounced(resolve, reject, args);
      });
  }

  async function setErrors(form, values) {
    if (form && values) {
      validating = true;
      try {
        $errors = await debouncedGetFormValidationErrors(form, values);
        hasErrors = getNumberOfErrors($errors) > 0;
      } catch (e) {
        console.error(e);
      }
      validating = false;
    }
  }

  $: {
    setErrors($form, $values);
  }
  $: {
    setContext('form', form);
  }
</script>

<style>
</style>

<form>
  <slot {values} {errors} {dirty} {hasErrors} {validating} />
</form>
