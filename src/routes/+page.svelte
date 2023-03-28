<script>
	import { browser } from '$app/environment';
	// @ts-ignore
	import { LeafletMap, TileLayer, Marker, Popup, Tooltip } from 'svelte-leafletjs?client';
	import 'leaflet/dist/leaflet.css';

	const mapOptions = {
		center: [39.06, -94.57],
		zoom: 5
	};
	const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const tileLayerOptions = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: '© OpenStreetMap contributors'
	};
</script>

<div class="container">
	<div id="map">
		{#if browser}
			<LeafletMap options={mapOptions}>
				<TileLayer url={tileUrl} options={tileLayerOptions} />
				<Marker latLng={[44.986656, -93.258133]}>
					<Popup>Minneapolis</Popup>
					<Tooltip>Minneapolis</Tooltip>
				</Marker>
				<Marker latLng={[39.7392358, -104.990251]}>
					<Popup>Denver</Popup>
					<Tooltip>Denver</Tooltip>
				</Marker>
				<Marker latLng={[41.8781136, -87.6297982]}>
					<Popup>Chicago</Popup>
					<Tooltip>Chicago</Tooltip>
				</Marker>
				<Marker latLng={[40.7127753, -74.0059728]}>
					<Popup>New York</Popup>
					<Tooltip>New York</Tooltip>
				</Marker>
			</LeafletMap>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
	}
	#map {
		height: 100vh;
		width: 100vw;
	}
</style>
