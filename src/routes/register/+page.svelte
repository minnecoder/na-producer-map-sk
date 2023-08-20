<script lang="ts">
	import type { LatLngTuple } from 'leaflet';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import Leaflet from '$lib/components/Map/Leaflet.svelte';
	import { registerDraggableLocation } from '$lib/Stores';
	import RegisterDraggableMarker from './RegisterDraggableMarker.svelte';

	let user = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		linkText: '',
		lat: 0.0,
		long: 0.0,
		peerage: '',
		phone: '',
		facebook: '',
		twitter: '',
		instagram: '',
		linkedin: '',
		youtube: '',
		nasocial: '',
		website: ''
	};

	export let form: ActionData;

	$: user.lat = $registerDraggableLocation[0];
	$: user.long = $registerDraggableLocation[1];

	const initialView: LatLngTuple = [51.514244, 7.468429]; // Dortmund, Germany
	const initialLocation: LatLngTuple = [51.5, 7.8];

	// TODO: Create sanitize data function
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<main>
	<div class="container">
		<div class="left">
			<form class="form" use:enhance action="?/register" method="POST">
				<h1>Register</h1>
				{#if form?.message}
					<div class="errorMessage">
						{form?.message}
					</div>
				{/if}

				<TextInput
					label="Display Name"
					name="name"
					bind:value={user.name}
					placeholder="e.g. Sir Rounded by Liberals or John Doe"
					required
				/>
				<TextInput
					label="Email"
					name="email"
					type="email"
					bind:value={user.email}
					required
				/>
				<TextInput
					label="Password"
					name="password"
					type="password"
					bind:value={user.password}
					required
				/>
				<TextInput
					label="Confirm Password"
					name="confirmPassword"
					type="password"
					bind:value={user.confirmPassword}
					required
				/>

				<h4>The information below is optional</h4>

				<TextInput label="Peerage" name="peerage" bind:value={user.peerage} />
				<TextInput label="Phone" name="phone" bind:value={user.phone} />
				<TextInput
					label="Facebook"
					name="facebook"
					bind:value={user.facebook}
				/>
				<TextInput label="Twitter" name="twitter" bind:value={user.twitter} />
				<TextInput
					label="Instagram"
					name="instagram"
					bind:value={user.instagram}
				/>
				<TextInput
					label="LinkedIn"
					name="linkedin"
					bind:value={user.linkedin}
				/>
				<TextInput label="Youtube" name="youtube" bind:value={user.youtube} />
				<TextInput
					label="NA Social"
					name="nasocial"
					bind:value={user.nasocial}
				/>
				<TextInput label="Website" name="website" bind:value={user.website} />
				<input
					class="hidden"
					type="number"
					step="0.0000000000000001"
					name="lat"
					bind:value={user.lat}
				/>
				<input
					class="hidden"
					type="number"
					step="0.0000000000000001"
					name="long"
					bind:value={user.long}
				/>
				<input type="submit" value="Register" />
				<p>
					Already have an account?{' '}
					<span>
						<a href="/login">Login</a>
					</span>
				</p>
			</form>
		</div>
		<div class="right">
			<p>Please place the marker to mark where you are located</p>
			<div class="map">
				<Leaflet view={initialView} zoom={5}>
					<RegisterDraggableMarker {initialLocation} />
				</Leaflet>
			</div>
		</div>
	</div>
</main>

<style>
	.container {
		display: flex;
	}

	.form {
		display: flex;
		flex-direction: column;
		background: white;
		width: 80%;
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

	.left {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 4rem;
		width: 50%;
		height: 100vh;
	}

	.form h1 {
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.right {
		margin-top: 12rem;
		padding-right: 3rem;
	}

	.right p {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.form p {
		margin-top: 1rem;
	}

	.form a {
		margin-left: 0.25rem;
		color: #007bff;
		text-decoration: none;
	}
	.hidden {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		opacity: 0;
		overflow: hidden;
	}
	.errorMessage {
		color: red;
	}

	.map {
		width: 50vw;
		height: 60vh;
	}
</style>
