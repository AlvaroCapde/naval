import { registerType } from '../../EpicFormService.js';
import TextWrite from './TextWrite.svelte';
import TextRead from './TextRead.svelte';

export const TextType = {
  type: 'text2',
  write: TextWrite,
  read: TextRead
};

registerType(TextType);
