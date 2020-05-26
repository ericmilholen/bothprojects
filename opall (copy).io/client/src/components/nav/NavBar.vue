<template>
	<nav class="flex-md-nowrap sticky-top p-0 navbar navbar-dark bg-dark">
		<!-- Logo -->
		<router-link to="/" class="btn btn-outline-warning title-logo">
		opall.io
		</router-link>	

		<!-- Dashboard Buttons -->
		<div class="middle-buttons">
			<!-- Home Button -->
			<router-link to="/">
				<button class="btn btn-outline-primary nav-buttons">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24" height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						class="feather-2 feather-home"
					>
						<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
						<polyline points="9 22 9 12 15 12 15 22"></polyline>
					</svg>
				</button>
			</router-link>
		
			<!-- Profile & Log Out -->
			<router-link to="/profile">
				<button class="btn btn-outline-warning nav-buttons">Profile</button>
			</router-link>
			<a href="/" v-on:click="logout">
				<button class="btn btn-outline-danger nav-buttons">Log Out</button>
			</a>
		</div>

		<!-- Side Menu Button -->
		<button
			@click="sideMenuBtnClicked"
			class="btn btn-outline-secondary toggle-button"
		>☰</button>
	</nav>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import { EventBus } from '../../main'

	/*** [EXPORT] ***/
	export default {
		methods: {
			logout() {
				localStorage.removeItem('usertoken')
			},
			sideMenuBtnClicked() {
				console.log('clicked')
				EventBus.$emit('navBarSideMenuBtnClicked')
			}	
		},
	}
</script>

<style scoped>
	.custom { background: black; }

	.title-logo {
		margin: 0;
		padding: 5px;

		width: 18%;
		max-width: 260px;

		text-align: center;
		font-size: 1rem;
		font-weight: bold;
	}

	.nav-buttons { margin: 0 5px; }

	.toggle-button {
		width: 18%;
		max-width: 260px;
		height: 48px;

		border-width: 0 1px;
		border-radius: 0%;
		font-size: 1.7em;
	}

	@media only screen and (max-width: 500px) {
		.middle-buttons { display: none; }
	}
</style>