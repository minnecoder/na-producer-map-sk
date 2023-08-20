import type { Actions } from '../$types';
import bcrypt from 'bcryptjs';
import db from '$lib/db';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request }) => {
		let { email, password } = Object.fromEntries(
			await request.formData()
		) as unknown as {
			email: string;
			password: string;
		};
		console.log('hello');

		// Check if producer exists

		const producer = await db.collection('users').findOne({ email: email });
		console.log(producer);
		// TODO: Change message before finishing this project
		if (!producer) {
			return fail(400, { message: "User doesn't exist" });
		}

		// Verify that the given password is correct
		const isPasswordValid = await bcrypt.compare(password, producer.email);
		console.log(isPasswordValid);

		// TODO: Change message before finishing this
		if (!isPasswordValid) {
			return fail(400, { message: 'Password is wrong' });
		}
		console.log('User should be logged in now');
		// throw redirect(302, '/');
	}
};
