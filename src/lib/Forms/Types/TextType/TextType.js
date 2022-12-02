import TextWrite from './TextWrite.svelte';
import TextRead from './TextRead.svelte';
import { EpicFormService } from '$lib/SvelteEpicForm/index';

export const TextType = {
  type: 'text',
  write: TextWrite,
  read: TextRead,
  isValid: (value) => {
    return !!value && value !== '' && value !== undefined;
  },
  definitionInputs: [],
  label: 'Single Text Box'
};
EpicFormService.registerType(TextType);
