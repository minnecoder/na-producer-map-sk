import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const producers = await db.collection('users').find({}).toArray();
	const data = JSON.stringify(producers);

	return { data };
};
