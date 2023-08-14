<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import L from 'leaflet';
	import { registerDraggableLocation } from '$lib/Stores';

	export let initialLocation: L.LatLngTuple;

	let marker: L.Marker | undefined;
	let markerElement: HTMLElement;

	const greenMarker = L.icon({
		iconUrl: 'src/lib/components/Map/marker-icon-green.png'
	});

	const { getMap }: { getMap: () => L.Map | undefined } = getContext('map');
	const map = getMap();

	setContext('layer', {
		getLayer: () => marker
	});

	onMount(() => {
		if (map) {
			marker = L.marker(initialLocation, { draggable: true }).addTo(map);
		}
		marker?.setIcon(greenMarker);
		marker?.on('dragend', function (event) {
			var marker = event.target;
			var position = marker.getLatLng();
			marker.setLatLng(new L.LatLng(position.lat, position.lng), {
				draggable: 'true'
			});

			$registerDraggableLocation = [position.lat, position.lng];
		});
	});

	onDestroy(() => {
		marker?.remove();
		marker = undefined;
	});
</script>

<div bind:this={markerElement}>
	{#if marker}
		<slot />
	{/if}
</div>
