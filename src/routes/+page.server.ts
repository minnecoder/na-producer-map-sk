import db from '$lib/db';

export async function load() {
	const producers = await db.collection('users').find().toArray();

	console.log(producers);
	return { producers };
}
