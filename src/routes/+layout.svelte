<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import { SerializedDocument } from '@healthtree/firestore-join';
	import RoomStore from '../services/RoomStore.js';
	import { auth, db } from '../services/Firebase.js';
	import SignIn from '../lib/Auth/SignIn.svelte';
	import CreateAccount from '../lib/Auth/CreateAccount.svelte';
	import FirebaseUserStore from '../services/FirebaseUserStore.js';
	import UserStore from '../services/UserStore.js';
	import { logout } from '../services/Auth.js';
	let room;
	let unsubscribe;
	let signIn = true;
	onMount(async () => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				$FirebaseUserStore = authUser;
				const userRef = db.collection('users').doc(authUser.uid);
				unsubscribe = userRef.onSnapshot(async (snapshot) => {
					const user = new SerializedDocument(snapshot);
					if (user.data) {
						UserStore.set(user);
					}
				});
			} else {
				FirebaseUserStore.set(null);
				UserStore.set(null);
			}
		});
		room = await new SerializedDocument.fromDocumentReference(
			db.collection('rooms').doc('X6p1ilZs2V3Kb3UhEez3')
		);
		RoomStore.set(room);
	});
</script>

{#if !$FirebaseUserStore}
	<div class="w-full flex justify-center pt-10 text-4xl font-extrabold text-white">
		NAVAL <span class="ml-1 text-amber-600">FLEE</span>
	</div>
	{#if signIn}
		<SignIn on:toggleAuth={() => (signIn = !signIn)} />
	{:else}
		<CreateAccount on:toggleAuth={() => (signIn = !signIn)} />
	{/if}
{:else}
	<div class="w-full flex justify-center bg-amber-900 ">
		<a href="/" class="block flex justify-center items-center px-4 text-white">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-10 h-10"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
				/>
			</svg>
		</a>
		<a
			href="/"
			class="h-20 block w-full font-extrabold shadow-2xl rounded text-5xl text-white flex justify-center items-center"
		>
			Naval Flee
		</a>
		<div
			class="p-5 text-white font-bold hover:cursor-pointer flex justify-center items-center"
			on:click={() => logout()}
		>
			Logout
		</div>
	</div>
	<slot />
{/if}
