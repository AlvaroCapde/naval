import SelectRead from './SelectRead.svelte';
import SelectWrite from './SelectWrite.svelte';
import { EpicFormService } from '$lib/SvelteEpicForm/index';
import { optionsDefinitionInputs } from '$lib/Forms/DefinitionInputs/optionsDefinitionInputs';

export const SelectType = {
  type: 'select',
  write: SelectWrite,
  read: SelectRead,
  isValid: (value) => {
    return value !== undefined && value !== null;
  },
  definitionInputs: optionsDefinitionInputs,
  label: 'Dropdown'
};
EpicFormService.registerType(SelectType);
