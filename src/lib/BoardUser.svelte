<script>
	import { onMount } from 'svelte';
	import { db } from '../services/Firebase';
	import { SerializedDocument } from '@healthtree/firestore-join';
	import { millisecondsToSeconds } from 'date-fns';

	export let roomUser;
	let user;

	const time = (currentTime) => {
		console.log(currentTime);
		if (currentTime / 60000 >= 1) {
			return `${parseInt((currentTime / 60000).toString())} minutes`;
		}
		return `${millisecondsToSeconds(currentTime)} seconds`;
	};

	onMount(async () => {
		user = await SerializedDocument.fromDocumentReference(
			db.collection('users').doc(roomUser.ref.id)
		);
	});
</script>

{#if user && roomUser}
	<li class="flex py-4">
		<div class="flex w-1/3 ">
			<!--			<img-->
			<!--				class="h-10 w-10 rounded-full"-->
			<!--				src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"-->
			<!--				alt=""-->
			<!--			/>-->
			<div class="ml-3">
				<p class="text-sm font-medium text-gray-900">{user.data.username}</p>
				<p class="text-sm text-gray-500">{user.data.email}</p>
			</div>
		</div>
		<div class="flex w-full justify-between">
			<p class="text-sm font-medium text-gray-900">
				Time: {time(roomUser.data.currentTime)}
			</p>
			<p class="text-sm font-medium {roomUser.data.finished ? 'text-lime-400' : 'text-rose-400'}">
				{roomUser.data.finished ? 'Finished' : 'Not finished'}
			</p>
		</div>
	</li>
{/if}
