<script lang="ts">
	const hello = 'hi';
	// import '@fontsource/poppins';

	// TODO: Add link to Profile page for My Profile button
	// TODO: Add functionality to Sign Out button
</script>

<header>
	<nav>
		<div class="container">
			<div class="left">
				<h3>No Agenda Producer Map</h3>
			</div>
			<div class="middle">
				<ul>
					<li>
						<a href="/">Map</a>
					</li>
					<li>
						<a href="/findproducers">Find Producers</a>
					</li>
					<li>
						<a href="/about">About</a>
					</li>
					<li>
						<a href="/register">Register</a>
					</li>
				</ul>
			</div>

			{#if hello}
				<div class="right">
					<div class="user" role="button">
						<button type="button" class="headerButton"> My Profile </button>
						<button type="button" class="headerButton"> Sign Out </button>
					</div>
				</div>
			{:else}
				<div class="noUserRight">
					<button type="button" class="headerButton"> Register </button>
					<button type="button" class="headerButton"> Sign In </button>
				</div>
			{/if}
		</div>
	</nav>
</header>

<style>
	.container {
		font-family: 'Poppins';
		/* position: sticky; */
		height: 70px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2;
		background-color: rgb(36, 36, 36);
	}

	.left {
		margin-left: 1rem;
	}

	.left h3 {
		color: white;
	}

	.middle ul {
		display: flex;
		flex-direction: row;
	}

	.middle li {
		list-style: none;
		margin: 0 10px;
		color: white;
	}

	.middle a {
		color: white;
		text-decoration: none;
	}

	.headerButton {
		border: none;
		border-radius: 5px;
		padding: 0.5rem 1rem;
		color: white;
		background: none;
		margin-right: 1rem;
		font: unset;
		cursor: pointer;
	}

	.user {
		margin-right: 1rem;
	}
</style>
