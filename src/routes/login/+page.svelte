<script lang="ts">
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	let user = {
		email: '',
		password: ''
	};
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>
<main>
	<div class="container">
		<form class="form" use:enhance action="?/login" method="POST">
			<h1>Login</h1>
			{#if form?.message}
				<div class="errorMessage">
					{form?.message}
				</div>
			{/if}
			<TextInput label="Email" name="email" bind:value={user.email} required />
			<TextInput
				label="Password"
				name="password"
				type="password"
				bind:value={user.password}
				required
			/>

			<input type="submit" value="Login" />
			<p>
				Dont have an account?{' '}
				<span>
					<a href="/register">Register</a>
				</span>
			</p>
		</form>
	</div>
</main>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.form {
		display: flex;
		flex-direction: column;
		background: white;
		width: 40%;
		margin-left: 3rem;
		padding: 2rem;
		border-radius: 10px;
	}

	.form input[type='submit'] {
		margin-top: 1rem;
		padding: 0.5rem;
		height: 3rem;
		border-radius: 5px;
		border: none;
		font: unset;
		font-size: 0.9rem;
		cursor: pointer;
	}

	.form p {
		margin-top: 1rem;
	}

	.form a {
		margin-left: 0.25rem;
		color: #007bff;
		text-decoration: none;
	}

	.errorMessage {
		padding: 1rem 0;
		color: red;
	}
</style>
