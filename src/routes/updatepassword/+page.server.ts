import type { Actions } from './$types';
import bcrypt from 'bcryptjs';
import db from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	updatePassword: async ({ locals, request }) => {
		let { password, newPassword, confirmNewPassword } = Object.fromEntries(
			await request.formData()
		) as unknown as {
			password: string;
			newPassword: string;
			confirmNewPassword: string;
		};

		// Check if password matches what is in the database
		const producer = await db
			.collection('users')
			.findOne({ email: locals.user.email });

		const doPasswordsMatch = await bcrypt.compare(password, producer?.password);
		if (!doPasswordsMatch) {
			return fail(400, {
				message: 'There was a problem with the current password'
			});
		}

		// Check if new password and confirm new passwords match
		if (newPassword !== confirmNewPassword) {
			return fail(400, { message: 'New passwords must match' });
		}

		// salt and hash new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		// update password
		const updatePassword = await db
			.collection('users')
			.updateOne(
				{ email: locals.user.email },
				{ $set: { password: hashedPassword } }
			);

		if (updatePassword.matchedCount === 1) {
			throw redirect(302, '/');
		} else {
			return fail(500, { message: 'Server Error' });
		}
	}
};
