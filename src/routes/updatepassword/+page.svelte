<script lang="ts">
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	let user = {
		password: '',
		newPassword: '',
		confirmNewPassword: ''
	};

	let errorMessage = '';

	// TODO: Create handlesubmit function
</script>

<div class="container">
	<form class="form">
		<h1 class="title">Update Password</h1>
		<p class="errorMessage">{errorMessage}</p>
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

	.form p {
		margin-top: 1rem;
	}

	.errorMessage {
		color: red;
	}
</style>
