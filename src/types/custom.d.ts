import type { LatLngTuple } from 'leaflet';

export interface User {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	linkText: string;
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
}
