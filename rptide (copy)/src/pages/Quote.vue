<template>
	<article class="m-3">
		<!-- Loading -->
		<div v-if="!loaded" class="w-100 alert alert-warning text-center">
			loading..
		</div>

		<!-- TITLE HEADER -->
		<Title-header  v-if="loaded" :ticker="ticker" :equityData="equityData"/>
	
		<!-- CHART -->
		<div v-if="loaded" class="w-100 mb-2 card card-body bg-darkesh">
			<Line-chart :equityData="equityData" styles="height: 450px;" />
		</div>

		<!-- EQUITY TABLE -->
		<Equity-table v-if="loaded" :equityData="equityData" />

		<!-- DESCRIPTION -->
		<div v-if="loaded" class="w-100 mb-1 card card-body border-secondary bg-dark">
			<h3 class="text-white">About {{ equityData.company.companyName }}</h3>
			<p class="text-white">{{ equityData.company.description }}</p>
		</div>
	</article>
</template>

<script>
	/*** [IMPORT] ***/
	import axios from 'axios'

	/*** [IMPORT] Personal ***/
	import LineChart from '../components/LineChart'
	import EquityTable from '../components/quote/EquityTable'
	import TitleHeader from '../components/quote/TitleHeader'

	/*** [EXPORT] ***/
	export default {
		components: {
			LineChart,
			EquityTable,
			TitleHeader,
		},

		data: function() {
			return {
				baseURL: process.env.VUE_APP_SB_URL,
				token: process.env.VUE_APP_SB_TOKEN,
				loaded: false,
				ticker: this.$route.params.ticker,
				equityData: {},
				chartData: [],
			} 
		},

		created: async function() {
			// Prevent Render // Set URL //
			this.loaded = false
			let types = 'chart,company,dividends,earnings,news,quote,stats'
			//types = 'chart&range=1m,company,dividends,earnings,news,quote,stats'
			const url = `${this.baseURL}stable/stock/${this.ticker}/batch?types=${types}&token=${this.token}`
			console.log('Quote IEX URL:', url)

			try {
				// Request //
				let { data } = await axios.get(url)

				// TITLE HEADER // EQUITY TABLE //
				this.equityData = data
				
				// CHART //
				data.chart.forEach(element => {
					const { label, close } = element
					this.chartData.push({ label, close })
				})

				// Allow Render //
				this.loaded = true
			}
			catch(err) { console.error(err) }			
		},
	}
</script>


<style >
	.ss { width: 400px; height: 700px; }
</style>