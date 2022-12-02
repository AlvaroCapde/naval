<script>
	import Modal from '../Modals/Modal.svelte';
	import { writable } from 'svelte/store';
	import WriteForm from '../SvelteEpicForm/built-in-layouts/WriteForm/WriteForm.svelte';
	let show = false;

	let values = writable({});
	let key;

	const form = writable({
		inputs: [
			{
				name: 'key',
				type: 'text',
				placeholder: 'Cadet password'
			}
		]
	});
</script>

<button
	on:click={() => (show = true)}
	class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
>
	Open cadets phone
</button>
<Modal size="2xl" bind:show>
	<div slot="title" class="text-orange-900">CLUE 1</div>
	<div class="p-10">
		{#if key !== '1237'}
			<WriteForm
				on:submit={() => (key = $values.key)}
				{form}
				bind:values
				showSecondaryButton={false}
				primaryButtonText="Try Digits"
				buttonsContainerClass="mt-4"
			/>
		{:else}
			<div class="w-full"><img alt="clue1" class="object-cover" src="/clue1.png" /></div>
		{/if}
	</div>
</Modal>
