<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import L from 'leaflet';

	let popup: L.Popup | undefined;
	let popupElement: HTMLElement;

	let open = false;

	const { getLayer }: { getLayer: () => L.Layer | undefined } =
		getContext('layer');
	const layer = getLayer();

	onMount(() => {
		popup = L.popup().setContent(popupElement);

		if (layer) {
			layer.bindPopup(popup);
			layer.on('popupopen', () => (open = true));
			layer.on('popupclose', () => (open = false));
		}
	});

	onDestroy(() => {
		layer?.unbindPopup();
		popup?.remove();
		popup = undefined;
	});
</script>

<div class="custom-popup" bind:this={popupElement}>
	{#if open}
		<slot />
	{/if}
</div>

<style>
	.custom-popup {
		width: 200px;
		padding: 10px;
	}
</style>
