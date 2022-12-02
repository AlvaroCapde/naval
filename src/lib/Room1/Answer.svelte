<script>
	import { writable } from 'svelte/store';
	import WriteForm from '../SvelteEpicForm/built-in-layouts/WriteForm/WriteForm.svelte';
	import completedStore from '../../routes/room/completedStore.js';

	let values = writable({});
	let key;

	$: {
		if (key === '7812') completedStore.set(true);
	}

	const form = writable({
		inputs: [
			{
				name: 'key',
				type: 'text',
				placeholder: 'Enter code to escape the room'
			}
		]
	});
</script>

<div class="p-10 rounded text-white">
	{#if key !== '7812'}
		<WriteForm
			bind:values
			on:submit={() => (key = $values.key.toLowerCase())}
			{form}
			showSecondaryButton={false}
			containerClass="text-black"
			buttonsContainerClass="mt-6"
			primaryButtonClass="bg-orange-900 p-4 rounded"
			primaryButtonText="Enter"
		/>
	{:else}
		<div class="flex justify-center items-center">
			<p>ROOM COMPLETED</p>
		</div>
	{/if}
</div>
