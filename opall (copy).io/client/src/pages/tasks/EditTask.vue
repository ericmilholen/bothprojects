<template>
	<div>
		<section class="my-3">
			<h3 class="text-white">Edit this Task</h3>
		</section>

		<ValidationObserver v-slot="{ handleSubmit }">
			<form class="w-100" @submit.prevent="handleSubmit(editTask)">
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
							class="form-control bg-dark border-secondary text-white"
							placeholder="Task title"
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
							class="form-control bg-dark border-secondary text-white"
							placeholder="Task Type"
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
							class="form-control bg-dark border-secondary text-white"
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
							class="form-control bg-dark border-secondary text-white"
							v-model="timeDue"
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
							class="w-100 form-control bg-dark border-secondary text-white"
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
					v-on:click.self="editTask()"
				>
					Edit Task
				</button>
				<hr class="mb-4">

				<!-- Errors -->
				<section>
				</section>
			</form>
		</ValidationObserver>
		{{ task_id }}
	</div>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import router from '../../router'
	import TaskService from '../../services/TaskService'
	import UserService from '../../services/UserService'

	/*** [EXPORT] ***/
	export default {
		data: function() {
			// Get Email // Return Data //
			let email = UserService.getEmail()
			return {
				email,
				authorized: false,
				submitted: true,
				task_id: this.$route.params.id,
				details: [],
				title: '',
				type: '',
				timeDue: '',
				dateDue: '',
				description: '',
			}
		},

		created: async function() {
			// Check if User Owns // Set Authorized Var // Log //
			const authStatus = await TaskService.taskOwnershipValidation(
				this.task_id, this.email
			)
			this.authorized = authStatus.data.owned
			console.log('Authorized:', this.authorized)

			// Display Data if Authorized //
			if (this.authorized) {
				// Enable Submit Button //
				this.submitted = false

				// Get task details
				try {
					this.details = await TaskService.getSingleTaskData(this.task_id)
				}
				catch(err) {
					console.log(err) 
				}

				// Set details on this form
				this.title = this.details[0].title
				this.type = this.details[0].type
				this.timeDue = this.details[0].timeDue
				this.dateDue = this.details[0].dateDue
				this.description = this.details[0].description
			}
			else {
				// Disable Submit Button // Redirect //
				this.submitted = true
				router.push({ path: '/tasks' })			
			}
		},

		methods: {
			async editTask() {
				// Disable Button //
				this.submitted = true

				// Call Function // Update Page //
				await TaskService.updateTask(
					this.task_id,
					this.title,
					this.type,
					this.timeDue,
					this.dateDue,
					this.description
				)

				// [REDIRECT] //
				router.push({ name: 'Tasks' })
			},
		}
	}
</script>