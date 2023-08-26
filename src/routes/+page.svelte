<script lang="ts">
	import type { LatLngTuple } from 'leaflet';
	import Leaflet from '$lib/components/Map/Leaflet.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import Popup from '$lib/components/Map/Popup.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const producers = JSON.parse(data.data);

	const initialView: LatLngTuple = [39.06, -94.57];
</script>

<div class="container">
	<div id="map">
		<Leaflet view={initialView} zoom={5}>
			{#each producers as producer}
				<Marker lat={producer.lat} long={producer.long}>
					<Popup>
						<div class="popup">
							<h3>{producer.name}</h3>
							<h4>{producer.email}</h4>
							<p>{producer.linkText}</p>
							<a href="/user/{producer.linkText}" data-sveltekit-preload-data>
								View Profile
							</a>
						</div>
					</Popup>
				</Marker>
			{/each}
		</Leaflet>
	</div>
</div>

<style>
	#map {
		height: calc(100vh - 70px);
		width: 100vw;
	}

	.popup a {
		padding: 0.5rem;
		background: rgb(219, 219, 219);
		text-decoration: none;
		color: #000;
		border-radius: 5px;
	}
</style>
