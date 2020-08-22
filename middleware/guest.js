export default function({ store, redirect }) {
	// if (store.getters["auth/authenticated"]) {
	// 	return redirect("/profile");
	// }
	if (store.state.auth.loggedIn) {
		return redirect('/profile')
	}
}
