<script>
	import Modal from '../Modals/Modal.svelte';
	import { writable } from 'svelte/store';
	import WriteForm from '../SvelteEpicForm/built-in-layouts/WriteForm/WriteForm.svelte';

	let show = false;

	let box;
	let reaction = '';

	function getRandomColor() {
		let letters = '0123456789ABCDEF'.split('');
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.round(Math.random() * 15)];
		} //ends for loop
		return color;
	} // ends getRandomColor Function

	let clickedTime;
	let createdTime;
	let reactionTime;

	function makeBox() {
		let time = Math.random();
		time = time * 3000;

		setTimeout(function () {
			if (box) {
				if (Math.random() > 0.5) {
					box.style.borderRadius = '100px';
				} else {
					box.style.borderRadius = '0';
				}

				let top = Math.random();
				top = top * 300;
				let left = Math.random();
				left = left * 500;

				box.style.top = top + 'px';
				box.style.left = left + 'px';

				box.style.backgroundColor = getRandomColor();

				box.style.display = 'block';

				createdTime = Date.now();
			}
		}, time);
	}

	const boxClick = function () {
		clickedTime = Date.now();

		reactionTime = (clickedTime - createdTime) / 1000;

		reaction = 'Your Reaction Time is: ' + reactionTime + 'seconds';

		this.style.display = 'none';

		makeBox();
	};
	$: {
		if (show) {
			makeBox();
		}
	}

	let values = writable({});
	let key;

	const form = writable({
		inputs: [
			{
				name: 'key',
				type: 'text',
				placeholder: 'Secret passcode'
			}
		]
	});
</script>

<button
	on:click={() => (show = true)}
	class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
>
	Try to open closet
</button>
<Modal size="7xl" bind:show>
	{#if !reactionTime || reactionTime >= 0.6}
		<div class="game w-full h-screen p-10">
			<h1>There is a fire in the closet!</h1>
			<p>
				Click on the boxes and circles as quickly as you can. Get a reaction time less than .5
				seconds to save yourself!
			</p>

			<p>{reaction}</p>

			<div on:click={boxClick} bind:this={box} id="box" />
		</div>
	{:else}
		<div class="p-10">
			{#if key !== 'admiral'}
				<WriteForm
					on:submit={() => (key = $values.key.toLowerCase())}
					{form}
					bind:values
					buttonsContainerClass="mt-5"
					showSecondaryButton={false}
				/>
			{:else}
				<p>7812</p>
			{/if}
		</div>
	{/if}
</Modal>

<style>
	.game {
		font-family: Verdana, Geneva, sans-serif;
	}

	#box {
		width: 100px;
		height: 100px;
		background-color: blue;
		display: none;
		position: relative;
	}
</style>
