<template>
	<div class="w-100">
		<!-- [FORM] create Post -->
		<form class="mt-4 form-inline">
			<input
				id="create-post"
				type="text"
				class="w-75 form-control text-light bg-dark border-secondary"
				placeholder="Create a post.."
				aria-label="Recipient's username"
				v-model="text"
			>
			<div class="w-25 input-group-append">
				<button
					type="submit"
					class="w-100 ml-3 btn btn-outline-success"
					v-on:click="createPost"
				>+ Create</button>
			</div>
		</form>
		<hr>

		<!-- [ERROR] -->
		<div class="alert alert-danger" role="alert" v-if="error">
			{{ error }}
		</div>
		
		<!-- Post Flex Container -->
		<transition-group name="fade" tag="div" class="flex-container">
			<!-- Post Flex Card -->
			<div
				class="card mb-3 bg-dark flex-card"
				v-for="(post, index) in posts"
				:items="post"
				:index="index"
				:key="post._id"
			>
				<div class="card-body">
					<p class="card-text text-secondary">
						{{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
					</p>

					<h5 class="card-title text-white">{{ post.text }}</h5>

					<button
						v-on:click="deletePost(post._id)"
						class="w-100 btn btn-outline-danger"
					>Delete</button>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import PostService from '../services/PostService'
	import UserService from '../services/UserService'

	/*** [EXPORT] ***/
	export default {
		data: function() {
			// Get Email
			let email = UserService.getEmail()

			// [RETURN] //
			return {
				email: email,
				posts: [],
				error: '',
				text: ''
			}
		},

		created: async function() {
			try {
				// Call Function in Post Service Script //
				this.posts = await PostService.getPosts(this.email)
			}
			catch(err) { this.error = err.message }
		},

		methods: {
			// [CREATE] Create Post Via PostService Function //
			async createPost() {
				await PostService.insertPost(
					this.text,
					this.email,
				)
				this.posts = await PostService.getPosts(this.email)
			},

			// [DELETE] Delete Post Via PostService Function //
			async deletePost(id) {
				await PostService.deletePost(id)
				this.posts = await PostService.getPosts(this.email)
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
		width: 230px;
		margin: 10px;
	}

	/* Vue Premade Fade Effect  */
	.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
	.fade-enter, .fade-leave-to { opacity: 0; }
</style>
