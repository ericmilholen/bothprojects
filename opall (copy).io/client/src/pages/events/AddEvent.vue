<template>
   <article>
		<!-- Title -->
		<section class="row w-100">
			<h2 class="col-sm-12 my-3 text-white">Create Event</h2>
		</section>

		<!-- Form -->
		<ValidationObserver v-slot="{ handleSubmit }">
			<form class="w-100" @submit.prevent="handleSubmit(createEvent)">
				<div class="row">
					<!-- Title -->
					<ValidationProvider
						class="col-md-6 mb-3"
						tag="div"
						rules="required"
						v-slot="{ errors }"
					>
						<input
							type="text"
							name="title"
							class="form-control border-secondary bg-dark text-white"
							placeholder="Event title"
							v-model="title"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>

					<!-- Type -->
					<ValidationProvider
						tag="div"
						class="col-md-6 mb-3"
						rules="required"
						v-slot="{ errors }"
					>
						<input
							type="text"
							name="type"
							class="form-control border-secondary bg-dark text-white"
							placeholder="Event Type"
							v-model="type"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>
				</div>

				<div class="row">
					<!-- Due Date -->	
					<ValidationProvider
						tag="div"
						class="col-md-6 mb-3"
						rules="required"
						v-slot="{ errors }"
					>
						<label for="dueDate">Due Date</label>
						<input
							type="date"
							name="dueDate"
							class="form-control border-secondary bg-dark text-white"
							v-model="dateDue"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>

					<!-- Due Time -->	
					<ValidationProvider
						tag="div"
						class="col-md-6 mb-3"
						rules="required"
						v-slot="{ errors }"
					>
						<label for="dueTime">Due Time</label>
						<input
							type="time"
							name="dueTime"
							class="form-control border-secondary bg-dark text-white"
							v-model="timeDue"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>
				</div>
				
				<div class="row">
					<!-- Location -->	
					<ValidationProvider
						tag="div"
						class="col-md-12 mb-3"
						rules="required"
						v-slot="{ errors }"
					>
						<label for="location">Address or Location</label>
						<input
							type="text"
							name="location"
							class="form-control border-secondary bg-dark text-white"
							placeholder="123 Main st. Englewood NY"
							v-model="location"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>
				</div>

				<div class="row">
					<!-- Description -->	
					<ValidationProvider
						tag="div"
						class="col-md-12 mb-3"
						rules="required"
						v-slot="{ errors }"
					>
						<label for="description">Description</label>
						<textarea
							name="description"
							rows="10"
							cols="60"
							class="w-100 form-control border-secondary bg-dark text-white"
							style="resize: none"
							placeholder="Type description here.."
							v-model="description"
						></textarea>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>
				</div>
				<br>

				<!-- Submit -->
				<button
					class="btn btn-outline-primary btn-lg btn-block"
					type="submit"
					:disabled="submitted"
				>Create Event</button>
				<hr class="mb-4">
			</form>
		</ValidationObserver>
   </article>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import router from '../../router'
	import UserService from '../../services/UserService'
	import EventService from '../../services/EventService'

	/*** [EXPORT] ***/
	export default {
		data: function() {
			let email = UserService.getEmail()

			// [RETURN] //
			return {
				email: email,
				submitted: false,
				title: '',
				type: '',
				timeDue: '',
				dateDue: '',
				location: '',
				description: ''
			}
		},

		methods: {
			// [CREATE] Create Event Via EventService Function //
			async createEvent() {
				// Disable Button //
				this.submitted = true

				// Call Function // Update Page //
				await EventService.insertEvent(
					this.email,
					this.title,
					this.type,
					this.timeDue,
					this.dateDue,
					this.location,
					this.description
				)

				// [REDIRECT] //
				router.push({ name: 'Events' })
			},
		}
	}
</script>