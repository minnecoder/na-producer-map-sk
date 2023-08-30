// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				name: string;
				email: string;
				linkText: string;
				role: string;
				lat: LatLngTuple;
				long: 0.0;
				peerage: string;
				phone: string;
				facebook: string;
				twitter: string;
				instagram: string;
				linkedin: string;
				youtube: string;
				nasocial: string;
				website: string;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module 'svelte-leafletjs';

export {};
