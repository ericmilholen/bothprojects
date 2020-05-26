<template>
   <article>
		<!-- Title -->
		<section class="row w-100">
			<h2 class="col-sm-12 my-3 text-white">Creat Task</h2>
		</section>

		<!-- Form -->
		<ValidationObserver v-slot="{ handleSubmit }">
			<form class="w-100" @submit.prevent="handleSubmit(createTask)">
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
							class="form-control border-secondary bg-dark text-white"
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
				>Create Task</button>
				<hr class="mb-4">

				<!-- Errors -->
				<section>
				</section>
			</form>
		</ValidationObserver>
   </article>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import router from '../../router'
	import UserService from '../../services/UserService'
	import TaskService from '../../services/TaskService'

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
				description: ''
			}
		},

		methods: {
			// [CREATE] Create Task Via TaskService Function //
			async createTask() {
				// Disable Button //
				this.submitted = true

				// Call Function // Update Page //
				await TaskService.insertTask(
					this.email,
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