<script lang="ts">
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/components/Map/Leaflet.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import Popup from '$lib/components/Map/Popup.svelte';

	export let producers: any[];
	console.log(producers);

	const initialView: LatLngExpression = [39.06, -94.57];
	const markerLocations: Array<LatLngExpression> = [
		[44.986656, -93.258133],
		[45.986657, -92.258134],
		[39.7392358, -104.990251]
	];
</script>

<div class="container">
	<div id="map">
		<Leaflet view={initialView} zoom={5}>
			{#each markerLocations as latLng}
				<Marker {latLng}>
					<Popup>Like & Subscribe!</Popup>
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
</style>
