<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import L from 'leaflet';
	import { indexDraggableLocation } from '$lib/Stores';

	export let initialLocation: L.LatLngExpression;

	let marker: L.Marker | undefined;
	let markerElement: HTMLElement;

	const greenMarker = L.icon({
		iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png`,
		shadowUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png`
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

			$indexDraggableLocation = [position.lat, position.lng];
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
