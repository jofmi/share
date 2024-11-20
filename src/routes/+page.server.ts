import { db } from '$lib/server/db';
import { itemTable } from '$lib/server/db/schema';
import { ilike } from 'drizzle-orm';
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
