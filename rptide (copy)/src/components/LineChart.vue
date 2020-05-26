<script>
	/*** [IMPORT] ***/
	import { Line } from 'vue-chartjs'

	/*** [EXPORT] ***/
	export default {
		mixins: [Line],

		props: {
			equityData: {
				type: Object,
				required: true,
			},
		},

		data: function() {
			return {
				labels: [],
				closes: [],
				chartData: [],

				chartBackgroundColor: '#28a74533',
				chartBorderColor: '#28a745',
			}
		},

		mounted: function() {
			// CHART //
			this.equityData.chart.forEach(element => {
				const { label, close } = element
				this.chartData.push({ label, close })
			})

			// Map Data //
			this.labels = this.chartData.map(cd => cd.label)
			this.closes = this.chartData.map(cd => cd.close)

			// Set Color //
			if (this.equityData.quote.change >= 0) {
				this.chartBackgroundColor = '#28a74533'
				this.chartBorderColor = '#28a745'
			}
			else {
				this.chartBackgroundColor = '#dc354540'
				this.chartBorderColor = '#dc3545'
			}

			// Render the Chart //
			this.renderChart(
				{
					labels: this.labels,
					datasets: [
						{
							data: this.closes,
							backgroundColor: this.chartBackgroundColor,
							borderColor: this.chartBorderColor,
						}
					]
				},
				{
					elements: { line: { tension: 0 } },
					legend: { display: false, },
					maintainAspectRatio: false,
					responsive: true,
					scales: {
						yAxes: [{
							ticks: {
								fontColor: "white",
								//fontSize: 18,
								//stepSize: 1,
								beginAtZero: false
							}
						}],
						xAxes: [{
							ticks: {
								fontColor: "white",
								//fontSize: 14,
								//stepSize: 1,
								beginAtZero: false
							}
						}]
					}
				},
			)
		},		
	}
</script>