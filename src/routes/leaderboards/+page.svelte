<script>
	import { onMount } from 'svelte';
	import { db } from '../../services/Firebase.js';
	import { SerializedDocumentArray } from '@healthtree/firestore-join';

	let rooms = [];
	onMount(async () => {
		rooms = await SerializedDocumentArray.fromQuery(db.collection('rooms'));
	});
</script>

<div class="">
	<div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
		<a href="/" class="text-white flex space-x-2 pb-10">
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
			<p>Go back home</p>
			<p />
		</a>
		<div class="md:flex md:items-center md:justify-between">
			<h2 class="text-2xl font-bold tracking-tight text-white">ALL ROOMS</h2>
		</div>

		<div
			class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8"
		>
			{#each rooms as room}
				<div class="group relative">
					<div
						class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80"
					>
						<img
							src="/enterprise.jpeg"
							alt="Hand stitched, orange leather long wallet."
							class="h-full w-full object-cover object-center"
						/>
					</div>
					<h3 class="mt-4 text-xl text-gray-200">
						<a href="/leaderboards/{room.ref.id}">
							<span class="absolute inset-0" />
							Room {room.data.name}
						</a>
					</h3>
				</div>
			{/each}
			<!-- More products... -->
		</div>
	</div>
</div>
