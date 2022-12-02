import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth, db } from './Firebase.js';
import { goto } from '$app/navigation';

async function forgotPassword(email) {
	await firebase.auth().sendPasswordResetEmail(email);
}

async function createAccount(email, password, username) {
	try {
		const response = await auth.createUserWithEmailAndPassword(email.trim(), password);
		if (response.user) {
			const userRef = db.collection('users').doc(response.user.uid);
			await userRef.set(
				{
					email,
					username,
					createdAt: new Date()
				},
				{ merge: true }
			);
		}
	} catch (error) {
		console.log(error.message);
	}
}
async function loginUserWithPassword(email, password) {
	try {
		await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
	} catch (error) {
		console.log(error.message);
	}
}
async function loginWithGoogle() {
	try {
		const provider = new firebase.auth.GoogleAuthProvider();
		await firebase.auth().signInWithPopup(provider);
	} catch (e) {
		console.error(e);
	}
}

async function logout() {
	try {
		await auth.signOut();
		goto('/');
	} catch (e) {
		console.log(e.message);
	}
}

export { loginWithGoogle, logout, createAccount, loginUserWithPassword, forgotPassword };
