<template>
	<nav class="col-md-2 d-none d-md-block sidebar border-left border-dark">
		<div class="sidebar-sticky">
			<!-- Spacer Div -->
			<div class="spacer"></div>
			
			<ul class="nav flex-column">
				<!-- Sample Item -->
				<li class="nav-item">
					<router-link to="/events/add-event" class="nav-link active">
						<button class="btn btn-outline-success right-sidebar-button">
							Create Event
						</button>
					</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
</script>

<style scoped>
	/* Nav Container */
	.sidebar {
		z-index: 100;
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		width: 18%;
		max-width: 260px;
		padding: 0;
		box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
	}

	.spacer {
		display: inline-block;
		height: 53px;
	}

	/* Within Nav Container */
	.sidebar-sticky {
		position: -webkit-sticky;
		position: sticky;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.right-sidebar-button { width: 100%; }
</style>