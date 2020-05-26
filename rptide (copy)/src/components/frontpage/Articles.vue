<template>
	<div class="w-100">
		<a
			class="mb-3 card border-secondary bg-dark article-link"
			v-for="article in articles"
			:href="article.url"
			:key="article.url"
		>
			<div class="w-100 bg-success rounded-top" style="height: 3px;"></div>
			<div class="w-100">	
				<!-- Source, Headling, & Summary -->
				<div class="w-75 p-3 float-left s-h-smy">
					<p class="d-inline pb-1 text-secondary">{{ article.source }}</p>
					<h4 class="text-success">{{ article.headline }}</h4>
					<p class="text-white smy">
						{{
							article.summary = article.summary.length > 400 ?
							article.summary.substring(0, 400 - 3) +
							"..." : article.summary
						}}
					</p>
				</div>

				<!-- Image [use this when deploying ':src="article.image"'] -->
				<div class="w-25 p-1 float-right i">
					<img
						src='../../assets/images/placeholder-image.png'
						alt="Article Image Here"
						class="w-100 rounded"
					>
				</div>					
			</div>
		</a> 
	</div>
</template>

<script>
	/*** [EXPORT] ***/
	export default {
		props: {
			articles: {
				type: Array,
				requried: true
			}
		},
	}
</script>

<style scoped>
	.article-link:hover { background: #3e444a !important; }

	/* Mobile Menu */
	@media (max-width: 450px) {
		/* Make summary dissapear */
		.s-h-smy { width: 100% !important; }
		
		.i {
			width: 100% !important;
		}

		.smy { display: none; }
	}
</style>