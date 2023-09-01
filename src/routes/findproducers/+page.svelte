<script lang="ts">
	import FindProducersDraggableMarker from './FindProducersDraggableMarker.svelte';
	import Leaflet from '$lib/components/Map/Leaflet.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import Popup from '$lib/components/Map/Popup.svelte';
	import type { User } from '../../types/custom';
	import type { LatLngTuple } from 'leaflet';
	import type { PageData } from './$types';
	import { findProducersDraggableLocation } from '$lib/Stores';

	export let data: PageData;
	const { producers, user } = data.data;

	const allProducers = JSON.parse(producers);
	let targetRange = 25;
	const initialView: LatLngTuple = [39.06, -94.57];
	const initialLocation: LatLngTuple = [41.5, -93.45];

	let selectedProducers: User[] = [];
	let meetupLocation: LatLngTuple = [user.lat, user.long];
	$: meetupLocation = $findProducersDraggableLocation;

	function findProducers(
		targetRange: number,
		allProducers: User[],
		meetupLocation: LatLngTuple
	) {
		const earthRadiusInMiles = 3958.8; // Earth radius in miles

		function degreesToRadians(degrees: number): number {
			return (degrees * Math.PI) / 180;
		}

		const filteredItems = allProducers.filter((item: User) => {
			const dLat = degreesToRadians(Number(item.lat) - meetupLocation[0]);
			const dLon = degreesToRadians(item.long - meetupLocation[1]);

			const a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(degreesToRadians(meetupLocation[0])) *
					Math.cos(degreesToRadians(Number(item.lat))) *
					Math.sin(dLon / 2) *
					Math.sin(dLon / 2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			const distance = earthRadiusInMiles * c;

			return distance <= targetRange;
		});
		selectedProducers = filteredItems;
	}
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

				<button
					type="button"
					class="button"
					on:click={(e) =>
						findProducers(targetRange, allProducers, meetupLocation)}
				>
					Find Producers
				</button>
			</div>
			<div class="selectedProducers">
				<h3>Producers within the area</h3>
				{#each selectedProducers as selectedProducer}
					<div class="selectedList">
						<h3>{selectedProducer.name}</h3>
						<p>{selectedProducer.email}</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="right">
			<h3 class="stepTitle">
				Step 1: Choose the location of the meetup
				<span>(The green marker is the location of the meetup)</span>
			</h3>
			<div id="map">
				<Leaflet view={initialView} zoom={5}>
					<FindProducersDraggableMarker {initialLocation} />
					{#each allProducers as producer}
						<Marker lat={producer.lat} long={producer.long}>
							<Popup>
								<h3>{producer.name}</h3>
								<p>{producer.email}</p>
								<a class="userLink" href="/user/{producer.linkText}"
									>View Profile</a
								>
							</Popup>
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
		width: 60%;
		margin: 0.5rem 0;
		padding: 0.5rem 0.5rem;
		word-wrap: break-word;
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

	.userLink {
		padding: 0.5rem 0.5rem;
		text-decoration: none;
		color: black;
		background: rgb(212, 212, 212);
		border: solid 1px rgb(212, 212, 212);
		border-radius: 5px;
	}

	#map {
		margin-top: 1rem;
		height: 60vh;
		width: 50vw;
	}

	@media screen and (max-width: 860px) {
		.button {
			margin-top: 1rem;
		}
	}

	@media screen and (max-width: 700px) {
		.main {
			flex-direction: column-reverse;
		}
		.left {
			width: 80%;
		}
		.right {
			width: 80%;
		}
		#map {
			width: 100%;
		}
	}
</style>
