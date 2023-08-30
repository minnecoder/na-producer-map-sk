import type { Actions } from './$types';
import bcrypt from 'bcryptjs';
import db from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	register: async ({ request }) => {
		let {
			name,
			email,
			password,
			confirmPassword,
			linkText,
			lat,
			long,
			peerage,
			phone,
			facebook,
			twitter,
			instagram,
			linkedin,
			youtube,
			nasocial,
			website
		} = Object.fromEntries(await request.formData()) as unknown as {
			name: string;
			email: string;
			password: string;
			confirmPassword: string;
			linkText: string;
			lat: number;
			long: number;
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

		//Convert lat and long to numbers
		lat = Number(lat);
		long = Number(long);

		// Check if password and confirm passwords match
		if (password !== confirmPassword) {
			return fail(400, { message: 'Passwords do not match' });
		}

		// Salt and hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Replace spaces with dashes
		function replaceSpacesWithDashes(input: string): string {
			let result = '';
			for (let i = 0; i < input.length; i += 1) {
				if (input[i] === ' ') {
					result += '-';
				} else {
					result += input[i];
				}
			}
			return result;
		}

		linkText = replaceSpacesWithDashes(name);

		// See if email is already used
		const findUser = await db.collection('users').findOne({
			email: email
		});

		if (findUser) {
			return fail(400, { message: 'Email already exists' });
		}

		// Create new user
		const createUser = await db.collection('users').insertOne({
			name: name,
			email: email,
			password: hashedPassword,
			userAuthToken: crypto.randomUUID(),
			role: 'user',
			linkText,
			lat: lat,
			long: long,
			peerage: peerage,
			phone: phone,
			facebook: facebook,
			twitter: twitter,
			instagram: instagram,
			linkedin: linkedin,
			youtube: youtube,
			nasocial: nasocial,
			website: website
		});

		if (!createUser) {
			return fail(400, { message: 'User not created' });
		}

		throw redirect(302, '/');
	}
};
