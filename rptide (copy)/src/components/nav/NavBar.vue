<template>
<div>
	<nav
		class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-success"
		style="border-width: 40px;"
	>
		<!-- Title -->
		<router-link
			to="/"
			class="my-0 navbar-brand text-dark badge badge-success"
			style="font-size: 1.5em;"
		>RpTide</router-link>

		<!-- Hidden Menu Button -->
		<button
			class="navbar-toggler"
			@click="sideMenuBtnClicked"
		><span class="navbar-toggler-icon"></span></button>

		<!-- Form and Buttons -->
		<div class="collapse navbar-collapse">
			<form class="form-inline mr-auto">
				<input
					placeholder="Ticker"
					class="form-control mr-sm-2 border-secondary bg-dark text-white"
					v-model="query"
				>
				<button
					type="submit"
					class="btn btn-outline-success my-2 my-sm-0"
					v-on:click="redirectToQuote(query)"
				>Search</button>
			</form>

			<router-link to="/" class="nav-link text-white">
				Home
			</router-link>
		
			<router-link to="/stocks" class="nav-link text-white">
				Stocks
			</router-link>
		</div>
	</nav>
	
	<!-- Green Bar -->
	<div class="bg-success" style="height: 10px;"></div>
</div>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import { EventBus } from '../../main'
	import router from '../../router'

	/*** [EXPORT] ***/
	export default {
		data: function() {
			return {
				query: ''
			}
		},

		methods: {
			redirectToQuote(query) {
				// [REDIRECT] // [EMIT OUT] --> // Clear Field //
				router.push({ path: `/quote/${query}` })
				this.$emit('query')
				this.query = ''
			},

			sideMenuBtnClicked() {
				console.log('clicked')
				EventBus.$emit('navBarSideMenuBtnClicked')
			}
		},
	}
</script>