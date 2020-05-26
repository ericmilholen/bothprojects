<template>
	<div
		class="bg-secondary shadow opacity-90 nav-drawer-menu"
		style="z-index: 1040;"
		:class="{ isOpen: sideMenuOpen }"
	>
		<button
			class="w-100 m-0 p-2 btn btn-dark bg-dark text-center text-secondary"
			@click="closeMenu"
		>
			<span aria-hidden="true" style="font-size: 2em;">&times;</span>
		</button>

		<button
			class="w-100 btn btn-secondary"
			v-on:click="homeBtn();"
		>Home</button>
		<button
			class="w-100 btn btn-secondary"
			v-on:click="yourTaskBtn();">
		Your Tasks</button>
		<button
			class="w-100 btn btn-secondary"
			v-on:click="yourProfileBtn();"
		>Your Profile</button>

		<a href="/">
			<button v-on:click="logout" class="w-100 btn btn-secondary">Logout</button>
		</a>
	</div>
</template>
<script>
	/*** [IMPORT] ***/
	import { EventBus } from '../../main'
	import router from '../../router'

	/*** [EXPORT] ***/
	export default {
		data: function() {
			return {
				sideMenuOpen: false
			}
		},

		created: function() {
			EventBus.$on('navBarSideMenuBtnClicked', () => {
				this.sideMenuOpen = !this.sideMenuOpen
			})
		},

		methods: {
			closeMenu() {
				this.sideMenuOpen = !this.sideMenuOpen
			},

			homeBtn() {
				this.sideMenuOpen = !this.sideMenuOpen
				router.push({ name: 'Dashboard' })
			},

			yourTaskBtn() {
				this.sideMenuOpen = !this.sideMenuOpen
				router.push({ name: 'Tasks' })
			},

			yourProfileBtn() {
				this.sideMenuOpen = !this.sideMenuOpen
				router.push({ name: 'Profile' })
			},

			logout() {
				localStorage.removeItem('usertoken')
			},
		}
	}
</script>

<style scoped>
	.nav-drawer-menu {
		position: fixed;
		top: 0;
		right: 0;

		height: 100%;
		width: 0;

		overflow-x: hidden;
		transition: 0.5s;
	}

	.nav-drawer-menu button {
		transition: 0.3s;
		font-size: 2em;
	}
	.nav-drawer-menu button:hover { background: #212529; }
	
	.isOpen { width: 75%; }
</style>