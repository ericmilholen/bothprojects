<template>
	<article class="m-3 flex-container">
		<!-- Loading -->
		<div v-if="!loaded" class="w-100 alert alert-warning text-center">
			loading..
		</div>

		<!-- [1/2] MAIN CONTENT -->
		<section v-if="loaded" class="main-content">
			<!-- Indexes -->
			<Index-charts v-if="loaded" :allData="allData" />
		
			<!-- Articles -->
			<Articles :articles="articles"/>
		</section>

		<!-- [2/2] SIDE CONTENT -->
		<section v-if="loaded" class="side-content">
			<Crypto-table :securityData="allData" />
		</section>
	</article>
</template>

<script>
	/*** [IMPORT] ***/
	import axios from 'axios'

	/*** [IMPORT] Personal ***/
	import Articles from '../components/frontpage/Articles'
	import CryptoTable from '../components/frontpage/CryptoTable'
	import IndexCharts from '../components/frontpage/IndexCharts'

	/*** [EXPORT] ***/
	export default {
		components: {
			Articles,
			CryptoTable,
			IndexCharts
		},

		data() {
			return {
				baseURL: process.env.VUE_APP_SB_URL,
				token: process.env.VUE_APP_SB_TOKEN,
				loaded: false,
				allData: {},
				articles: {},
			}
		},

		created: async function() {
			// Prevent Render // Symbols // Types //
			this.loaded = false
			const symbols = 'spy,dia,qqq,btcusdt,xrpusdt,ethusdt,eosusdt,xlmusdt,ltcusdt,adausdt'
			const types = 'chart,quote,news'

			let url = `${this.baseURL}stable/stock/market/batch?symbols=${symbols}&types=${types}&token=${this.token}`
			console.log('Front Page IEX URL:', url)

			try {
				// Request //
				let { data } = await axios.get(url)

				// INDEX // CRYPTO //
				this.allData = data

				// NEWS //
				this.articles = data.SPY.news

				// Allow Render //
				this.loaded = true
			}
			catch (err) { console.error('Axios Failed', err) }
		}
	}
</script>

<style scoped>
	.flex-container {
		display: flex;
		flex-wrap: wrap;
	}

	.main-content {
		width: 73%;
		min-height: 100px;
		margin: 10px 1%;
	}

	.side-content {
		width: 23%;
		min-height: 100px;
		margin: 10px 1%;
	}

	/* Mobile Menu */
	@media (max-width: 768px) {
		/* Make Sections Wide */
		.flex-container > section { width: 98%; }
	}

</style>	