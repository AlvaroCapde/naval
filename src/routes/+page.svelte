<script>
	import { formatDistance } from 'date-fns';
	import RoomStore from '../services/RoomStore.js';
	import userStore from '../services/UserStore.js';
	import Modal from '../lib/Modals/Modal.svelte';
	let date = '';
	let show = false;
	$: {
		if ($RoomStore?.data?.start) {
			date = formatDistance($RoomStore?.data?.start, new Date(), { addSuffix: true });
		}
	}
</script>

<div class="text-white text-center w-full text-4xl px-6 pt-10 font-extrabold">
	Hi {$userStore?.data?.username}!
</div>
<div class="flex justify-center items-center pt-52">
	<div class="text-3xl font-extrabold text-white">
		<p class="flex w-full justify-center text-6xl pb-10">
			Welcome to <span class="text-amber-900 ml-2 drop-shadow-lg shadow-white"> Naval Flee</span>
		</p>
		<div class="flex items-center mb-10">
			<a href="/room" class="flex ml-10 bg-gray-50 rounded text-black p-8"> Start Room </a>
			<a href="/leaderboards" class="rounded p-8 border border-gray-50 text-white ml-10"
				>Leaderboards</a
			>
			<button
				on:click={() => (show = true)}
				class="rounded p-8 border border-amber-600 text-amber-600 ml-10">How to play</button
			>
		</div>
		{#if $RoomStore}
			<p>Room {$RoomStore.data.name} : {date}</p>
		{/if}
	</div>
</div>

<Modal size="2xl" bind:show>
	<span slot="title">How To Play Naval Flee</span>
	<div class="p-10 text-justify">
		Welcome to <span class="text-amber-600">Naval Flee</span>! To play you only need one thing: your
		mind. You must read and be aware of everything displayed in the game constantly looking for
		clues or something that might help you solve the puzzles you encounter. Don't forget! Sometimes
		you might need to
		<span class="text-amber-600">investigate or research </span>
		some historical facts in order to advance in the game. Minigames might show up, just be ready to
		do whatever it takes to get out. And remember to have fun, good luck!
	</div>
</Modal>
