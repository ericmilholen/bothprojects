<template>
	<div id="app">
		<!-- NavBar -->
		<nav-bar @query="forceRerender" />

		<!-- Hidden Side Menu -->
		<side-menu @query="forceRerender" />

		<!-- Display the router Stuff -->
		<router-view :key="componentKey" />
		
		<!-- Footer -->
		<Footer />
	</div>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import Footer from './components/nav/Footer'
	import NavBar from './components/nav/NavBar'
	import SideMenu from './components/nav/SideMenu'

	/*** [EXPORT] ***/
	export default {
		name: 'App',
		components: {
			Footer,
			NavBar,
			SideMenu,
		},

		data() {
			return {
				componentKey: 0
			}
		},

		created: function() {
			console.log('VUE_APP_SB_URL', process.env.VUE_APP_SB_URL)
			console.log('VUE_APP_SB_TOKEN', process.env.VUE_APP_SB_TOKEN)
			console.log('VUE_APP_LIVE_URL', process.env.VUE_APP_LIVE_URL)
			console.log('VUE_APP_LIVE_TOKEN', process.env.VUE_APP_LIVE_TOKEN)
		},

		methods: {
			forceRerender() {
				this.componentKey += 1;  
			}
		}
	}
</script>

<style>
	#app {
		font-family:
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue', 
			sans-serif
		;
	}
</style>
