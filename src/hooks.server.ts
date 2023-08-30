import type { Handle } from '@sveltejs/kit';
import db from '$lib/db';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	// find the user based on the session
	const user = await db.collection('users').findOne({ userAuthToken: session });

	// if user is found set it to events.local
	if (user) {
		event.locals.user = {
			name: user.name,
			email: user.email,
			linkText: user.linkText,
			role: user.role,
			lat: user.lat,
			long: user.long,
			peerage: user.peerage,
			phone: user.phone,
			facebook: user.facebook,
			twitter: user.twitter,
			instagram: user.instagram,
			linkedin: user.linkedin,
			youtube: user.youtube,
			nasocial: user.nasocial,
			website: user.website
		};
	}

	return await resolve(event);
};
