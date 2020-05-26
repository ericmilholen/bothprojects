<template>
	<article class="row">
		<!-- Title -->
		<section class="col-sm-12 my-4">
			<h2 class="d-inline-block text-white">Your Tasks</h2>
			<router-link to="/tasks/add-task" class="w-100">
				<button
					class="btn btn-outline-success float-right"
				>
					Create Task
				</button>
			</router-link>
		</section>

		<transition-group name="fade" tag="div" class="flex-container">
			<div
				class="card mb-3 bg-dark flex-card"
				v-for="(task, index) in tasks"
				:items="task"
				:index="index"
				:key="task._id"
			>
				<div
					class="card-body"
					v-on:click.self="
						viewTaskToggle();
						loadViewTask(task);
					"
				>
					<!-- Date Due & Time -->
					<h6
						class="card-text text-secondary"
						v-on:click.self="
							viewTaskToggle();
							loadViewTask(task);
						"
					>
						{{ task.dateDue }} @ {{ task.timeDue }}
					</h6>

					<!-- Type & Title -->
					<h6
						class="card-title text-secondary"
						v-on:click.self="
							viewTaskToggle();
							loadViewTask(task);
						"
					>
						{{ task.type }}
					</h6>
					<h5
						class="card-title text-white"
						v-on:click.self="
							viewTaskToggle();
							loadViewTask(task);
						"
					>
						{{ task.title }}
					</h5>
				</div>
			</div>
		</transition-group>

		<!-- Pop Up Task Details -->
		<view-task
			v-if="viewTaskClicked"
			:task="task"
			:deleteSubmitted="deleteSubmitted"
			@deleteTask="deleteTask"
			@closeClicked="viewTaskToggle"
		/>

		<div class="w-100 alert alert-danger" v-if="error != ''">
			{{ error }}
		</div>
	</article>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import ViewTask from '../../components/tasks/ViewTask'
	import TaskService from '../../services/TaskService'
	import UserService from '../../services/UserService'

	/*** [EXPORT] ***/
	export default {
		components: {
			ViewTask,
		},

		data: function() {
			let email = UserService.getEmail()

			return {
				email: email,
				tasks: [],
				task: [],
				error: '',
				viewTaskClicked: false,
				deleteSubmitted: false,
			}
		},

		created: async function() {
			try {
				// Get Tasks to be Displayed
				this.tasks = await TaskService.getTasks(this.email)
			}
			catch(err) { this.error = err.message }
		},

		methods: {
			viewTaskToggle() {
				this.viewTaskClicked = !this.viewTaskClicked	
			},

			loadViewTask(task) {
				this.task = task
			},

			async deleteTask(id) {
				this.viewTaskClicked = !this.viewTaskClicked

				await TaskService.deleteTask(id)
				this.tasks = await TaskService.getTasks(this.email)

				// When Details is closed then enable delete button again
				if (this.viewTaskClicked == false) {
					this.deleteSubmitted = false
				}
			}
		}
	}
</script>

<style scoped>
	.flex-container {
		display: flex;
		flex-wrap: wrap;
	}

	.flex-card {
		width: 250px;
		margin: 10px;
	}
</style>