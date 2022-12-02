export default async function (user, firebaseUser) {
	await user.ref.set({
		email: firebaseUser.email,
		createdAt: new Date()
	});
}
