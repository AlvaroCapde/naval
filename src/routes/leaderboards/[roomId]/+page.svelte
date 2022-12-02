<script>
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import { db } from '../../../services/Firebase';
	import { SerializedDocument } from '@healthtree/firestore-join';
	import BoardUser from '../../../lib/BoardUser.svelte';
	let room;

	onMount(async () => {
		const roomRef = db.collection('rooms').doc($page.params.roomId);
		room = await SerializedDocument.fromDocumentReference(roomRef, {
			users: (doc) => doc.ref.collection('users').orderBy('currentTime')
		}).ready();
	});
</script>

{#if room}
	<div class="px-40 pt-10 ">
		<a href="/leaderboards" class="text-white flex space-x-2 pb-10">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
				/>
			</svg>
			<p />
		</a>
		<p class="text-white text-3xl mb-5 font-extrabold">Room {room.data.name} players</p>
		<ul role="list" class="divide-y bg-white p-10 rounded divide-gray-200">
			{#each room.included.users as user}
				<BoardUser roomUser={user} />
			{/each}
		</ul>
	</div>
{/if}
