<template>
   <div
		tabindex="0"
		ref="parent"
		class="modal show td-background"
		@keydown.esc="closeClicked"
		v-on:click.self="closeClicked"
	>
		<div class="modal-dialog card bg-dark td-main">
			<div class="modal-content bg-dark">
				<div class="modal-header border-secondary">
					<h5 class="modal-title text-white">
						{{ event.title }}
					</h5>
					<button
						type="button"
						class="close"
						v-on:click="closeClicked"
					>
						<span class="text-white">×</span>
					</button>
				</div>

				<div class="modal-body">
					<h5 class="modal-title text-white">Due at</h5>
					<p class="text-white">
						{{ event.dateDue }} @ {{ event.timeDue }}
					</p>

					<h5 class="modal-title text-white">Type</h5>
					<p class="text-white">
						{{ event.type }}
					</p>

					<h5 class="modal-title text-white">Location</h5>
					<p class="text-white">
						{{ event.location }}
					</p>

					<h5 class="modal-title text-white">Description</h5>
					<p class="text-white">
						{{ event.description }}
					</p>

					<!-- Edit Delete Button -->
					<div class="w-100 mx-auto text-center">
						<button
							class="w-25 btn btn-outline-secondary mx-1"
							@click="redirectToEditEvent(event._id)"
						>
							Edit
						</button>
						<button
							class="w-25 btn btn-outline-danger mx-1"
							:disabled="deleteSubmitted"
							@click="$emit('deleteEvent', event._id)"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import router from '../../router'

	/*** [EXPORT] ***/
	export default {
		props: {
			event: {
				type: Object,
				required: true
			},
			deleteSubmitted: {
				type: Boolean,
				required: true
			}
		},

		mounted: function() {
			this.$refs.parent.focus()
		},
		
		methods: {
			closeClicked() {
				this.$emit('closeClicked')
			},

			redirectToEditEvent(id) {
				// [REDIRECT]
				router.push({ path: `/events/edit-event/${id}` })
			}
		}
	}
</script>

<style scoped>
	/* Back Drop */
	.td-background {
		display: block;
		background-color: rgba(0, 0, 0, 0.5);
	}

	/* Main Card */
	.td-main { max-width: 75%; }

	.fade-enter-active,
	.fade-leave-active { transition: opacity .5s; }

	/* .fade-leave-active below version 2.1.8 */
	.fade-enter,
	.fade-leave-to { opacity: 0; }
</style>