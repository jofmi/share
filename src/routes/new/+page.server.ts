import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { itemTable } from '$lib/server/db/schema';

export const load = async () => {
	const form = await superValidate(zod(schema));

	return { form };
};

export const actions = {
	addItem: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await db.insert(itemTable).values(form.data);

		return message(form, 'Form posted successfully!');
	}
};
