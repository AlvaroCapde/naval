<script>
	import RoomStore from '../../services/RoomStore.js';
	import { onDestroy, onMount } from 'svelte';
	import StopWatchWrapper from '../../lib/StopWatch/StopWatchWrapper.svelte';
	import roomStore from '../../services/RoomStore.js';
	import FirebaseUserStore from '../../services/FirebaseUserStore.js';
	import { SerializedDocument } from '@healthtree/firestore-join';
	import Clue1 from '../../lib/Room1/Clue1.svelte';
	import Clue2 from '../../lib/Room1/Clue2.svelte';
	import Clue3 from '../../lib/Room1/Clue3.svelte';
	import Answer from '../../lib/Room1/Answer.svelte';
	import completedStore from './completedStore.js';
	import { goto } from '$app/navigation';
	let start = false;
	let lapse;
	let previous;
	let finished;
	let player;
	onMount(() => {
		start = true;
	});

	completedStore.subscribe(async (v) => {
		if (v) {
			await player.ref.set(
				{
					currentTime: lapse,
					finished: true
				},
				{ merge: true }
			);
			await goto('/');
			finished = true;
		}
	});

	const unsubscribe = roomStore.subscribe(async (room) => {
		if (!room) return;
		player = await SerializedDocument.fromDocumentReference(
			room.ref.collection('users').doc($FirebaseUserStore.uid)
		);
		if (!player.data) {
			await player.ref.set(
				{
					startedAt: new Date(),
					finished: false,
					currentTime: 0
				},
				{ merge: true }
			);
			previous = 0;
		} else {
			previous = player.data.currentTime;
		}
	});
	onDestroy(async () => {
		await player.ref.set(
			{
				currentTime: lapse
			},
			{ merge: true }
		);
		completedStore.set(false);
		if (unsubscribe) unsubscribe();
	});
</script>

{#if $RoomStore}
	<div class="flex">
		<div>
			<div class="w-full my-10 space-y-10 flex flex-col justify-center ml-10">
				<p class="text-3xl font-extrabold text-white">Welcome to the room {$RoomStore.data.name}</p>
				<div class="w-72 max-h-80 rounded overflow-x-scroll bg-white shadow-2xl p-10">
					<p class="text-xl text-gray-600 font-extrabold">Intro</p>
					{$RoomStore.data.intro}
				</div>
			</div>
			<div class="ml-5">
				{#if previous !== undefined}
					<StopWatchWrapper bind:started={start} bind:finished {previous} bind:lapse />
				{/if}
			</div>
		</div>
		<div class="flex flex-col w-full justify-center items-center mr-10">
			<div class="w-full flex justify-around items-center">
				<Clue1 />
				<Clue2 />
				<Clue3 />
			</div>
			<div class="w-full">
				<Answer />
			</div>
		</div>
	</div>
{/if}
