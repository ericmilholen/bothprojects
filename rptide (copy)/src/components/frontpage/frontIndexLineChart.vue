<script>
	/*** [IMPORT] ***/
	import { Line } from 'vue-chartjs'

	/*** [EXPORT] ***/
	export default {
		mixins: [Line],

		props: {
			chartData: {
				type: Array
			},
		},

		data: function() {
			return {
				labels: [],
				closes: [],
				options: {
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
			}
		},

		mounted: function() {
			// Map Data
			this.labels = this.chartData.map(cd => cd.label)
			this.closes = this.chartData.map(cd => cd.close)

			// Render the Chart
			this.renderChart(
				{
					labels: this.labels,
					datasets: [
						{
							data: this.closes,
							borderColor: '#28a745',
						}
					]
				},
				this.options
			)
		},		
	}
</script>