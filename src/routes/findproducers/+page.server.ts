import db from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const response = await db.collection('users').find({}).toArray();
	const allUsers = JSON.stringify(response);

	return {
		data: {
			producers: allUsers,
			user: locals.user
		}
	};
};
