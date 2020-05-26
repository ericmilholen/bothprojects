<template>
	<nav class="col-md-2 d-none d-md-block bg-dark sidebar left-navbar">
		<div class="sidebar-sticky">
			<!-- Spacer Div -->
			<div class="spacer"></div>

			<!-- Buttons -->
			<ul class="nav flex-column">
				<li class="nav-item">
					<router-link to="/tasks" class="nav-link active">
						<button class="w-100 btn btn-outline-info">Your Tasks</button>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/events" class="nav-link active">
						<button class="w-100 btn btn-outline-info">Events</button>
					</router-link>
				</li>
			</ul>

			<!-- Friends List (temporarily removed until development) -->
			<friends-list v-if="1==2"/>
		</div>
	</nav>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import FriendsList from './FriendsList'
	import router from '../../router'

	/*** [EXPORT] ***/
	export default {
		components: {
			FriendsList,
		},

		data: function() {
			return {
				test: 312
			}
		},

		methods: {
			goToEditTask() {
				router.push({
					path: `/tasks/edit-task/${this.test}`,
				})

			}
		}
	}
</script>

<style scope>
	.left-navbar { left: 0; }

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
</style>