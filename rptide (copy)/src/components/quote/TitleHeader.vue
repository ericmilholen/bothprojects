<template>
	<div class="w-100 mb-2 bg-dark flex-container">
		<div class="flex-left">
			<h2 class="text-secondary" :class="latestPriceColor">
				<span
					class=" text-dark badge"
					:class="changePercentBadge"
				>{{ ticker2 }}</span>
				{{ latestPrice }}
				<span class="h6">({{ change }})</span>
			</h2>
			<a :href="website">
				<h6 class="text-white">
					{{ exchange }} - {{ companyName }}
				</h6>
			</a>
		</div>
		<div class="flex-right">
			<h3>
				<span class="p-2 text-dark badge" :class="changePercentBadge">
					{{ changePercent }}%
				</span>
			</h3>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		ticker: {
			type: String,
			required: true
		},
		equityData: {
			type: Object,
			required: true
		}
	},

	data: function() {
		return {
			ticker2: 'XXXX',
			change: '0.000',
			changePercent: '0.000',
			changePercentBadge: 'badge-secondary',
			companyName: 'companyName',
			exchange: 'exchange',
			latestPrice: '0.000',
			latestPriceColor: 'text-black',	
			website: '',
		}
	},

	created: function() {
		this.ticker2 = this.ticker.toUpperCase(),
		this.companyName = this.equityData.company.companyName,
		this.exchange = this.equityData.company.exchange
		this.website = this.equityData.company.website,
		this.change = this.equityData.quote.change,
		this.changePercent = (this.equityData.quote.changePercent * 100).toFixed(2)
		this.setLastColor(this.equityData.quote.change)
		this.latestPrice = this.equityData.quote.latestPrice
	},

	methods: {
		setLastColor(change) {
			if (change >= 0) {
				this.latestPriceColor = 'text-success'
				this.changePercentBadge = 'badge-success'
			}
			else {
				this.latestPriceColor = 'text-danger'
				this.changePercentBadge = 'badge-danger'
			}
			
		},
	},
}
</script>

<style scoped>
	.flex-container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: unset;
	}

	.flex-left {
		float: left;
		width: 50%;
	}

	.flex-right {
		float: left;
		width: 50%;
		text-align: right;
	}
</style>