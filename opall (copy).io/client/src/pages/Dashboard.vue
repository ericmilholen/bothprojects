<template>
	<article :class="{ row: loggedIn }">
		<posts v-if="loggedIn" />
		<welcome-screen v-else />
	</article>
</template>

<script>
	/*** [IMPORT] ***/
	import WelcomeScreen from '../components/WelcomeScreen'
	import { EventBus } from '../main'
	import Posts from '../components/Posts'

	/*** [EXPORT] ***/
	export default {
		components: {
			WelcomeScreen,
			Posts
		},
		
		data: function() {
			return { loggedIn: false }
		},

		created: function() {
			// [CHECK IF LOGGEDIN] //
			if (localStorage.usertoken) { this.loggedIn = true }
			else { this.loggedIn = false }

			// [--> EMIT IN] //
			EventBus.$on('logged-in', () => { this.loggedIn = true })
		},

		methods: {
			logout() {
				localStorage.removeItem('usertoken')
			},
		},
	}
</script>