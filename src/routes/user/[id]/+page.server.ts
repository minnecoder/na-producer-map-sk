import db from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const response = await db
		.collection('users')
		.findOne({ linkText: params.id }, { projection: { password: 0 } });
	const data = JSON.stringify(response);
	return { data };
};
