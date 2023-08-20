<script lang="ts">
	import {
		onMount,
		onDestroy,
		setContext,
		createEventDispatcher
	} from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	export let bounds: L.LatLngBoundsExpression | undefined = undefined;
	export let view: L.LatLngExpression | undefined = undefined;
	export let zoom: number | undefined = undefined;

	const dispatch = createEventDispatcher();

	// TODO: Make map not have "infinite" scroll or make markers appear on every "copy" of the continents
	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	onMount(() => {
		if (!bounds && (!view || !zoom)) {
			throw new Error('Must set either bounds, or view and zoom.');
		}

		map = L.map(mapElement)
			// example to expose map events to parent components:
			.on('zoom', (e) => dispatch('zoom', e));
		L.tileLayer(
			'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
			{
				attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`
			}
		).addTo(map);
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	setContext('map', {
		getMap: () => map
	});

	$: if (map) {
		if (bounds) {
			map.fitBounds(bounds);
		} else if (view && zoom) {
			map.setView(view, zoom);
		}
	}
</script>

<div class="main" bind:this={mapElement}>
	{#if map}
		<slot />
	{/if}
</div>

<style>
	.main {
		width: 100%;
		height: 100%;
	}
</style>
