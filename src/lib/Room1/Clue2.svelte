<script>
	import { WriteForm } from '../SvelteEpicForm/index.js';
	import Modal from '../Modals/Modal.svelte';
	import { writable } from 'svelte/store';

	let show = false;

	let values = writable({});
	let key;

	const form = writable({
		inputs: [
			{
				name: 'key',
				type: 'text',
				placeholder: 'Enter guess',
				label: 'The USS ...'
			}
		]
	});
</script>

<button
	on:click={() => (show = true)}
	class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
>
	Check Cadets notes
</button>

<Modal size="2xl" bind:show>
	<div slot="title" class="text-orange-900">CLUE 2</div>
	<div class="p-10">
		{#if key !== 'enterprise'}
			<div class="flex flex-col gap-y-10 w-full">
				<img src="/enterprise.jpeg" class="object-cover" />

				<WriteForm
					on:submit={() => (key = $values.key.toLowerCase())}
					{form}
					bind:values
					showSecondaryButton={false}
					primaryButtonText="Try Answer"
					buttonsContainerClass="mt-4"
				/>
			</div>
		{:else}
			<div class="w-full"><img class="object-cover" src="/clue2.jpeg" /></div>
		{/if}
	</div>
</Modal>
