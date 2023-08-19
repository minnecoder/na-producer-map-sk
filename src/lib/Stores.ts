import type { LatLngTuple } from 'leaflet';
import { writable } from 'svelte/store';

export const indexDraggableLocation = writable<LatLngTuple>([0.0, 0.0]);
export const registerDraggableLocation = writable<LatLngTuple>([0.0, 0.0]);
export const findProducersDraggableLocation = writable<LatLngTuple>([0.0, 0.0]);
