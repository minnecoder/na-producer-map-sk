<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	let user = {
		password: '',
		newPassword: '',
		confirmNewPassword: ''
	};
	export let form: ActionData;
</script>

<div class="container">
	<form class="form" use:enhance action="?/updatePassword" method="POST">
		<h1 class="title">Update Password</h1>
		{#if form?.message}
			<div class="errorMessage">
				{form?.message}
			</div>
		{/if}
		<TextInput
			label="Current Password"
			name="password"
			type="password"
			bind:value={user.password}
			required
		/>
		<TextInput
			label="New Password"
			name="newPassword"
			type="password"
			bind:value={user.newPassword}
			required
		/>
		<TextInput
			label="Confirm New Password"
			name="confirmNewPassword"
			type="password"
			bind:value={user.confirmNewPassword}
			required
		/>
		<input type="submit" value="Update" />
	</form>
</div>

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

	.errorMessage {
		padding: 1rem 0;
		color: red;
	}
</style>
