<template>
	<div class="mb-3 flex-container">
		<div class="p-1 card bg-darkesh index-graph-container">
			<h6 class="text-center text-white">SPY - {{ spyLast }}</h6>
			<Line-chart :chartData="this.allData.SPY.chart" class="index-graph" />
		</div>
		<div class="p-1 card bg-darkesh index-graph-container">
			<h6 class="text-center text-white">DIA - {{ diaLast }}</h6>
			<Line-chart :chartData="this.allData.DIA.chart" class="index-graph" />
		</div>
		<div class="p-1 card bg-darkesh index-graph-container">
			<h6 class="text-center text-white">QQQ - {{ qqqLast }}</h6>
			<Line-chart :chartData="this.allData.QQQ.chart" class="index-graph" />
		</div>
	</div>	
</template>

<script>
import LineChart from './frontIndexLineChart'

export default {
	components: {
		LineChart,
	},

	props: {
		allData: {
			type: Object,
			required: true
		}
	},

	allData: function() {
		return {
			spyLast: 0,
			diaLast: 0,
			qqqLast: 0,
		}
	},

	created: function() {
		// INDEX CHART // Set Last // Prepare to Send this.allData to "equityTable" //
		this.spyLast = this.allData.SPY.quote.latestPrice
		this.diaLast = this.allData.DIA.quote.latestPrice
		this.qqqLast = this.allData.QQQ.quote.latestPrice
	}
}
</script>

<style scoped>
	.flex-container {
		display: flex;
		flex-wrap: wrap;
	}

	/** Index Graphs **/
	.index-graph-container {
		float: left;
		width: 32.33% !important;
		margin: 0 .5%
	}

	.index-graph { height: 200px; }
</style>