import type { LatLngExpression } from 'leaflet';
import { writable } from 'svelte/store';

export const indexDraggableLocation = writable<LatLngExpression>([0.0, 0.0]);
export const registerDraggableLocation = writable<LatLngExpression>([0.0, 0.0]);
export const findProducersDraggableLocation = writable<LatLngExpression>([
	0.0, 0.0
]);
