import TextRead from '../TextType/TextRead.svelte';
import PasswordWrite from './PasswordWrite.svelte';
import { EpicFormService } from '$lib/SvelteEpicForm/index';

export const PasswordType = {
  type: 'password',
  write: PasswordWrite,
  read: TextRead,
  label: 'Password'
};
EpicFormService.registerType(PasswordType);
