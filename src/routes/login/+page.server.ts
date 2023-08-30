import type { Actions } from '../$types';
import bcrypt from 'bcryptjs';
import db from '$lib/db';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		let { email, password } = Object.fromEntries(
			await request.formData()
		) as unknown as {
			email: string;
			password: string;
		};

		// Check if producer exists
		const producer = await db.collection('users').findOne({ email: email });
		if (!producer) {
			return fail(400, {
				message: 'There was a problem with the user name or password'
			});
		}

		// Verify that the given password is correct
		const isPasswordValid = await bcrypt.compare(password, producer.password);
		if (!isPasswordValid) {
			return fail(400, {
				message: 'There was a problem with the user name or password'
			});
		}

		const authenticatedUser = await db
			.collection('users')
			.findOneAndUpdate(
				{ email: producer.email },
				{ $set: { userAuthToken: crypto.randomUUID() } },
				{ returnDocument: 'after' }
			);

		cookies.set('session', authenticatedUser.value?.userAuthToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 30
		});

		throw redirect(302, '/');
	}
};
