<template>
	<div class="card card-body border-secondary bg-dark">
		<table class="table-sm table-bordered table-striped table-dark">
			<tbody>
				<tr><th>Crypto</th><th>Price</th></tr>
				<tr><td>ETH/USDT</td><td>{{ ethPrice }}</td></tr>
				<tr><td>BTC/USDT</td><td>{{ btcPrice }}</td></tr>
				<tr><td>XRP/USDT</td><td>{{ xrpPrice }}</td></tr>
				<tr><td>EOS/USDT</td><td>{{ eosPrice }}</td></tr>
				<tr><td>XLM/USDT</td><td>{{ xlmPrice }}</td></tr>
				<tr><td>LTC/USDT</td><td>{{ ltcPrice }}</td></tr>
				<tr><td>ADA/USDT</td><td>{{ adaPrice }}</td></tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	props: {
		securityData: {
			type: Object,
			required: true
		}
	},

	data: function() {
		return {
			btcPrice: '',
			xrpPrice: '',
			ethPrice: '',
			eosPrice: '',
			xlmPrice: '',
			ltcPrice: '',
			adaPrice: ''
		}
	},

	created: function() {
		this.btcPrice = Number(this.securityData.BTCUSDT.quote.latestPrice).toFixed(3)
		this.xrpPrice = Number(this.securityData.XRPUSDT.quote.latestPrice).toFixed(3)
		this.ethPrice = Number(this.securityData.ETHUSDT.quote.latestPrice).toFixed(3)
		this.eosPrice = Number(this.securityData.EOSUSDT.quote.latestPrice).toFixed(3)
		this.xlmPrice = Number(this.securityData.XLMUSDT.quote.latestPrice).toFixed(3)
		this.ltcPrice = Number(this.securityData.LTCUSDT.quote.latestPrice).toFixed(3)
		this.adaPrice = Number(this.securityData.ADAUSDT.quote.latestPrice).toFixed(3)
	}
}
</script>