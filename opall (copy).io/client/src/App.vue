<template>
	<div id="app">
		<!-- Top Navbar -->
		<nav-bar v-if="loggedIn" />

		<!-- Hidden Side Menu -->
		<side-menu />

		<!-- Left & Right Sidebars -->
		<left-side-bar  v-if="loggedIn" />
		<right-side-bar v-if="loggedIn" />

		<!-- Router for Pages -->
		<div
			class="main-content"
			:class="{
				container: loggedIn,
				loggedOut: !loggedIn,
			}"
		>
			<router-view />
		</div>
	</div>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import LeftSideBar from './components/nav/LeftSideBar'
	import NavBar from './components/nav/NavBar'
	import RightSideBar from './components/nav/RightSideBar'
	import SideMenu from './components/nav/SideMenu'
	import { EventBus } from './main'

	/*** [EXPORT] ***/
	export default {
		name: 'App',
		components: {
			LeftSideBar,
			SideMenu,
			NavBar,
			RightSideBar
		},

		data: function() {
			return { loggedIn: false }
		},

		created: function() {
			// [CHECK IF LOGGEDIN] //
			if (localStorage.usertoken) { this.loggedIn = true }

			// [--> EMIT IN] //
			EventBus.$on('logged-in', () => { this.loggedIn = true })
		}
	}
</script>

<style scoped>
	/* 
	* Center Content that has 
	* spacing for the sidebars
	*/
	.main-content { width: 60%; }
	@media only screen and (max-width: 768px) {
		.main-content {
			width: 100%;
			padding: 0 10px;
		}
	}

	/** Make Main Content full width of loggedout */
	.loggedOut { width: 100%; }
</style>