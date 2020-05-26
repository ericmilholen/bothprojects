<template>
	<div>
		<div class="front-page-container">
			<div class="centered">
				<div class="mb-1 title-container border-warning">
					<h1 class="title-text text-warning">opall.io</h1>
				</div>
				<p class="mb-4">Wait for the cool background!</p>

				<section class="button-holder">
					<router-link to="/login" class="btn btn-primary terminal-link">
						Log In
					</router-link>
					<router-link to="/register" class="btn btn-light terminal-link">
						Register
					</router-link>
					
				</section>
			</div>
		</div>

		<!-- Footer -->
		<footer class="page-footer font-small grey pt-4" style="background-color: #dee2e6;">
			<!-- Footer Links -->
			<div class="container-fluid text-center text-md-left">

				<!-- Grid row + column -->
				<div class="row">
					<div class="col-md-6 mt-md-0 mt-3">
						<h5>Looking for something else?</h5>
						<p>Other resources.</p>
					</div>

					<hr class="clearfix w-100 d-md-none pb-3">

					<!-- Grid column + Links -->
					<div class="col-md-3 mb-md-0 mb-3">
						<h5>Links</h5>
						<ul class="list-unstyled">
							<li><a href="#!">Link 1</a></li>
							<li><a href="#!">Link 2</a></li>
						</ul>
					</div>

					<!-- Grid column + Links -->
					<div class="col-md-3 mb-md-0 mb-3">
						<h5>Links</h5>
						<ul class="list-unstyled">
							<li><a href="#!">Link 1</a></li>
							<li><a href="#!">Link 2</a></li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Copyright -->
			<div class="footer-copyright text-center py-3">© 2020 Copyright:
				<a href="https://www.opall.io"> opall.io</a>
			</div>
		</footer>
	</div>
</template>

<style scoped>
	/* Container holding the image and the text */
	.front-page-container {
		height: 100vh;
		position: relative;
		text-align: center;
		background-image: url('https://source.unsplash.com/3840x2160/?city');
		background-size: cover;
		color: white;
	}

	/* Centered text */
	.centered {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.title-container {
		margin: 20px auto;
		padding: 10px;
		background: #ffffffa1;

		border: solid 4px;
		border-radius: 5px;
	}

	.title-text {
		margin: 0;
		text-align: center;
		font-weight: 500;
	}

	.sub-heading {
		width: 100%;
		text-align: center;
	}

	.button-holder {
		width: 100%;
		text-align: center;
	}

	.terminal-link {
		font-size: 1.5em;
		margin: 0 5px;
	}
</style>