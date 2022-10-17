// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/storage';
import Env from '$services/Env';
import { browser } from '$app/environment';

export let app;
export let analytics;

if (!firebase.apps.length) {
    app = firebase.initializeApp(Env.VITE_FIREBASE_CONFIG);

    if (browser) {
        // Expose firebase for debugging locally
        if (window.location.hostname === 'localhost') {
            window.firebase = firebase;
            import('@healthtree/firestore-join').then((module) => (window.FirestoreJoin = module));
        }
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        if (!analytics && !window.location.href.includes('userId')) {
            analytics = firebase.analytics();
        }
    }
} else {
    app = firebase.app;
}

export { firebase as default };
export const db = firebase.firestore();
if (browser) db.settings({ ignoreUndefinedProperties: true, merge: true });
export const auth = firebase.auth();
export const functions = firebase.functions();
// Remove comment to use functions emulator
// functions.useEmulator('localhost', 5001);
export const storage = firebase.storage();
