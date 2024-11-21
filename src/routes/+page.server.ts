import { db } from '$lib/server/db';
import { itemTable } from '$lib/server/db/schema';
import { eq, ilike } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const searchValue = url.searchParams.get('search');
	let query = db.select().from(itemTable).$dynamic();
	if (searchValue) {
		query = query.where(ilike(itemTable.name, '%' + searchValue + '%'));
	}
	const result = await query;
	return {
		items: result,
		searchValue: searchValue
	};
};

export const actions = {
	removeItem: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (!id) {
			return { status: 400, body: { message: 'No id provided' } };
		}

		await db.delete(itemTable).where(eq(itemTable.id, Number(id)));
	}
};
