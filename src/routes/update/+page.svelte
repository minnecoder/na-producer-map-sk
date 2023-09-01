<script lang="ts">
	import { enhance } from '$app/forms';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import { page } from '$app/stores';
	import Leaflet from '$lib/components/Map/Leaflet.svelte';
	import type { ActionData } from './$types';
	import type { LatLngTuple } from 'leaflet';
	import UpdateDraggableMarker from './UpdateDraggableMarker.svelte';
	import { updateDraggableLocation } from '$lib/Stores';

	export let form: ActionData;

	const user = $page.data.user;
	const initialLocation: LatLngTuple = [user.lat, user.long];

	$: user.lat = $updateDraggableLocation[0];
	$: user.long = $updateDraggableLocation[1];
</script>

<main>
	<div class="left">
		<form use:enhance action="?/update" method="POST">
			<h1>Update Profile</h1>
			<a class="linkButton" href="/updatepassword">Update Password</a>
			{#if form?.message}
				<div class="errorMessage">
					{form?.message}
				</div>
			{/if}
			<TextInput label="Display Name" name="name" bind:value={user.name} />
			<TextInput label="Peerage" name="peerage" bind:value={user.peerage} />
			<TextInput label="Phone number" name="phone" bind:value={user.phone} />
			<TextInput label="Facebook" name="facebook" bind:value={user.facebook} />
			<TextInput label="Twitter" name="twitter" bind:value={user.twitter} />
			<TextInput
				label="Instagram"
				name="instagram"
				bind:value={user.instagram}
			/>
			<TextInput label="LinkedIn" name="linkedin" bind:value={user.linkedin} />
			<TextInput label="YouTube" name="youtube" bind:value={user.youtube} />
			<TextInput label="NA Social" name="nasocial" bind:value={user.nasocial} />
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
			<input type="submit" value="Update" />
		</form>
	</div>
	<div class="right">
		<p>Please place the marker to mark where you are located</p>
		<div class="map">
			<Leaflet view={initialLocation} zoom={5}>
				<UpdateDraggableMarker {initialLocation} />
			</Leaflet>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
	}
	.linkButton {
		margin-bottom: 0.5rem;
		width: 150px;
		padding: 0.5rem 0.75rem;
		text-decoration: none;
		border-radius: 5px;
		background: rgb(180, 180, 180);
		color: black;
	}
	form {
		display: flex;
		flex-direction: column;
		background: white;
		width: 80%;
		margin-left: 3rem;
		padding: 2rem;
		border-radius: 10px;
	}

	form input[type='submit'] {
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

	form h1 {
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

	@media screen and (max-width: 930px) {
		main {
			display: flex;
			flex-direction: column;
		}
		.left {
			margin-top: 0rem;
			width: 85%;
			height: 100%;
		}
		.right {
			margin: 1rem 0 0 4rem;
			padding-right: 0;
		}

		.map {
			width: 90%;
		}
	}
</style>
