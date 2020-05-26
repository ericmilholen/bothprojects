<template>
	<article class="row">
		<hr class="m-3">

		<!-- Card Holder -->
		<transition-group name="fade" tag="div" class="w-100 m-auto">
			<!-- Card -->
			<div
				class="w-100 my-3 card bg-dark"
				v-for="(event, index) in events"
				:items="event"
				:index="index"
				:key="event._id"
			>
				<div
					class="w-100 card-body"
					v-on:click.self="
						viewEventToggle();
						loadViewEvent(event)
					"
				>
					<!-- Date Due & Time -->
					<h6
						class="card-text text-secondary"
						v-on:click.self="
							viewEventToggle();
							loadViewEvent(event)
						"
					>
						{{ event.dateDue }} @ {{ event.timeDue }}
					</h6>

					<!-- Location -->
					<h6
						class="card-text text-secondary"
						v-on:click.self="
							viewEventToggle();
							loadViewEvent(event)
						"
					>
						{{ event.location }}
					</h6>

					<!-- Title -->
					<h5
						class="card-text text-white"
						v-on:click.self="
							viewEventToggle();
							loadViewEvent(event)
						"
					>
						{{ event.title }}
					</h5>
				</div>
			</div>
		</transition-group>

		<!-- Pop Up Event Details -->
		<view-event
			v-if="viewEventClicked"
			:event="event"
			:deleteSubmitted="deleteSubmitted"
			@deleteEvent="deleteEvent"
			@closeClicked="viewEventToggle"
		/>

		<div class="alert alert-danger" v-if="error != ''">
			{{ error }}
		</div>
	</article>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import ViewEvent from '../../components/events/ViewEvent'
	import EventService from '../../services/EventService'
	import UserService from '../../services/UserService'

	/*** [EXPORT] ***/
	export default {
		components: {
			ViewEvent
		},

		data: function() {
			let email = UserService.getEmail()

			return {
				email: email,
				events: [],
				event: [],
				error: '',
				viewEventClicked: false,
				deleteSubmitted: false,
			}
		},

		created: async function() {
			try {
				// Get Events to be Displayed
				this.events = await EventService.getEvents(this.email)
			}
			catch(err) { this.error = err.message }
		},

		methods: {
			viewEventToggle() {
				this.viewEventClicked = !this.viewEventClicked	
			},

			loadViewEvent(event) {
				this.event = event
			},

			async deleteEvent(id) {
				this.viewEventClicked = !this.viewEventClicked

				await EventService.deleteEvent(id)
				this.events = await EventService.getEvents(this.email)

				// When Details is closed then enable delete button again
				if (this.viewEventClicked == false) {
					this.deleteSubmitted = false
				}
			}
		}
	}
</script>