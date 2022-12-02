<script lang="js">
	import { ErrorMessage } from '$lib/SvelteEpicForm/index';

	export let showError, input;

	function isRequired(input) {
		return (
			input.required ||
			input?.validations?.find((validation) => /required/i.test(validation.message))
		);
	}
</script>

{#if input.label}
	<div class="base-input-label {input.data?.customLabelClasses}" class:text-warm-100={showError}>
		{input.label}
		{#if isRequired(input)}<span class="text-warm-100">*</span>{/if}
	</div>
{/if}
{#if input.description}
	<div class="base-input-label text-gray-400" class:text-warm-100={showError}>
		{input.description}
	</div>
{/if}
<div class="w-full mt-1 cursor-pointer flex flex-col {input?.layout?.write?.maxHeight || ''}">
	<slot />
</div>
<ErrorMessage messageClass="block p-2 text-white bg-red-400 base-input-error" />
