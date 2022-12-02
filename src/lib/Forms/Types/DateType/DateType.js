import TextRead from '../TextType/TextRead.svelte';
import DateWrite from './DateWrite.svelte';
import { EpicFormService } from '$lib/SvelteEpicForm/index';
import { dataDefinitionInputs } from '$lib/Forms/DefinitionInputs/dataDefinitionInputs';

export const DateType = {
  type: 'date',
  label: 'Date',
  write: DateWrite,
  read: TextRead,
  definitionInputs: dataDefinitionInputs([
    {
      name: 'data.showDay',
      label: '',
      placeholder: 'Show Day',
      type: 'checkbox'
    }
  ])
};
EpicFormService.registerType(DateType);
