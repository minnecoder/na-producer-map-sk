import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/db';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		user: locals.user
	};
};

export const actions: Actions = {
	update: async ({ locals, request }) => {
		let {
			name,
			email,
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

		lat = Number(lat);
		long = Number(long);

		// Replace spaces in name with dashes
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

		// Update the user information
		const updateUser = await db.collection('users').updateOne(
			{ email: locals.user.email },
			{
				$set: {
					name: name,
					linkText: linkText,
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
				}
			}
		);

		if (updateUser.matchedCount === 1) {
			throw redirect(302, '/');
		} else {
			console.log(updateUser);
			return fail(500, { message: 'Server Error' });
		}
	}
};
