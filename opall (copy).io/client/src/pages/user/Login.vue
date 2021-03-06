<template>
	<div class="login-terminal">
		<h3 class="mb-3 text-center">Welcome Back</h3>
		<div class="p-4 card bg-dark border-secondary">
			<!-- lOG IN FORM -->
			<ValidationObserver v-slot="{ handleSubmit }">
				<form @submit.prevent="handleSubmit(login)">
					<!-- Email -->
					<ValidationProvider
						tag="div"
						class="form-group"
						rules="required|email"
						v-slot="{ errors }"
					>
						<label for="email">Email</label>
						<input
							v-model="email"
							name="email"
							type="email"
							class="form-control bg-dark text-white border-secondary"
							:class="{ 'is-invalid': errors!='' }"
							placeholder="Example@example.com"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>

					<!-- Password -->
					<ValidationProvider
						tag="div"
						class="form-group"
						rules="required"
						v-slot="{ errors }"
					>
						<label for="password">Password</label>
						<input
							v-model="password"
							name="password"
							type="password"
							class="form-control bg-dark text-white border-secondary"
							:class="{ 'is-invalid': errors!='' }"
							placeholder="******"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>
					<br>

					<!-- FORM SUBMIT -->
					<button
						class="btn btn-lg btn-outline-success btn-block"
						type="submit"
						:disabled="submitted"
					>Login</button>
				</form>
			</ValidationObserver>
		</div>
		<br>

		<!-- Errors -->
		<div
			class="alert alert-danger" role="alert"
			v-if="
				logStatus === 'incorrect_email' ||
				logStatus === 'incorrect_password'
			"
		>Incorrect password or email.</div>
	</div>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import { EventBus } from '../../main'
	import router from '../../router'
	import UserService from '../../services/UserService'

	/*** [EXPORT] ***/
	export default {
		data: function() {
			return {
				submitted: false,
				email: '',
				password: '',
				logStatus: ''
			}
		},

		created: function() {
			// [REDIRECT] User Logged In Already //
			if (localStorage.usertoken) { router.push({ name: 'Profile' }) }
		},

		methods: {
			async login() {
				// Get Status from Login Function //
				let status = await UserService.login(this.email, this.password)

				// Check if Email or Username taken //
            if (status.data.status != 'incorrect_email') {
               if (status.data.status != 'incorrect_password') {
                  // [SET TOKEN] //
                  localStorage.setItem('usertoken', status.data.token)
                  this.email = ''
                  this.password = ''
                  router.push({ name: 'Dashboard' })

                  // [CALL] //
                  this.emitMethod()
               }
               // [INCORRECT PASSWORD] //
               else { this.logStatus = status.data.status }
            }
            // [INCORRECT EMAIL]
            else { this.logStatus = status.data.status }
			},

			// [FUNCTION] Emit //
			emitMethod() { EventBus.$emit('logged-in') }
		}
	}
</script>

<style scoped>
	.login-terminal {
		max-width: 350px;
		margin: 50px auto;
	}

	.login-terminal label,
	.login-terminal h3 {
		color: white;
	}
</style>
