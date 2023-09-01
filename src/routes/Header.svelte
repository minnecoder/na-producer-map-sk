<script lang="ts">
	import { page } from '$app/stores';
	// TODO: Add link to Profile page for My Profile button
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
					{#if $page.data.user}
						<li>
							<a href="/findproducers">Find Producers</a>
						</li>
					{/if}

					<li>
						<a href="/about">About</a>
					</li>
				</ul>
			</div>

			{#if $page.data.user}
				<div class="right">
					<div class="user" role="button">
						<a href="/update" class="headerLink"> My Profile </a>
						<a
							href="/logout"
							class="headerLink"
							data-sveltekit-preload-data="off"
							data-sveltekit-reload
						>
							Sign Out
						</a>
					</div>
				</div>
			{/if}
			{#if !$page.data.user}
				<div class="noUserRight">
					<a href="/register" class="headerLink"> Register </a>
					<a href="/login" class="headerLink"> Sign In </a>
				</div>
			{/if}
		</div>
	</nav>
</header>

<style>
	.container {
		font-family: 'Poppins';
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

	.headerLink {
		text-decoration: none;
		padding: 0.5rem 1rem;
		color: white;
		margin-right: 1rem;
	}

	.user {
		margin-right: 1rem;
	}
</style>
