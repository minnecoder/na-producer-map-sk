<script lang="ts">
	import DraggableMarker from '$lib/DraggableMarker.svelte';
	import Leaflet from '$lib/components/Map/Leaflet.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import Popup from '$lib/components/Map/Popup.svelte';
	import type { LatLngExpression } from 'leaflet';
	let targetRange = 25;
	const initialView: LatLngExpression = [39.06, -94.57];
	const initialLocation: LatLngExpression = [41.5, -93.45];
	const markerLocations: Array<LatLngExpression> = [
		[44.986656, -93.258133],
		[45.986657, -92.258134],
		[39.7392358, -104.990251]
	];
</script>

<svelte:head>
	<title>Find Producers</title>
</svelte:head>

<div class="container">
	<h1>Find Producers</h1>
	<div class="main">
		<div class="left">
			<h3 class="stepTitle">
				Step 2: Choose the distance to search for producers
			</h3>
			<div>
				<select
					class="selectbox"
					name="meetupDistance"
					id="meetupDistance"
					bind:value={targetRange}
				>
					<option value="25">25 Miles</option>
					<option value="50">50 miles</option>
					<option value="100">100 miles</option>
					<option value="200">200 miles</option>
					<option value="300">300 miles</option>
				</select>

				<button type="button" class="button"> Find Producers </button>
			</div>
			<div class="selectedProducers">
				<h3>Producers within the area</h3>
				<!-- {selectedProducers.map((item) => (
          <div key={item.email} className={styles.selectedList}>
            <h3>{item.name}</h3>
            <p>{item.email}</p>
          </div>
        ))} -->
			</div>
		</div>
		<div class="right">
			<h3 class="stepTitle">
				Step 1: Choose the location of the meetup
				<span>(The green marker is the location of the meetup)</span>
			</h3>
			<div id="map">
				<Leaflet view={initialView} zoom={5}>
					<DraggableMarker {initialLocation} />
					{#each markerLocations as latLng}
						<Marker {latLng}>
							<Popup>Like & Subscribe!</Popup>
						</Marker>
					{/each}
				</Leaflet>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex-column;
		margin-top: 1rem;
	}

	.container h1 {
		text-align: center;
	}

	.main {
		display: flex;
		flex-direction: row-reverse;
		margin-top: 2rem;
	}

	.left {
		width: 50%;
		margin-left: 3rem;
	}
	.stepTitle span {
		padding-left: 0.25rem;
		font-weight: normal;
	}
	.selectbox {
		margin: 1rem 1rem 0 0;
		width: 200px;
		height: 50px;
	}

	.selectedProducers {
		margin-top: 1rem;
	}

	.selectedList {
		border: solid 1px rgb(80, 80, 80);
		border-radius: 5px;
		width: 33%;
		margin: 0.5rem 0;
		padding: 0.5rem 0.5rem;
	}

	.right {
		width: 50%;
		margin-left: 3rem;
	}

	.button {
		padding: 1rem 0.75rem;
		border: none;
		border-radius: 5px;
		background-color: red;
		color: white;
	}
	#map {
		margin-top: 1rem;
		height: 60vh;
		width: 50vw;
	}
</style>