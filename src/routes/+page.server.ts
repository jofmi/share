import { db } from '$lib/server/db';
import { items } from '$lib/server/db/schema';
import { ilike } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const searchValue = url.searchParams.get('search');
	let query = db.select().from(items).$dynamic();
	if (searchValue) {
		query = query.where(ilike(items.name, '%' + searchValue + '%'));
	}
	const result = await query;
	return {
		items: result,
		searchValue: searchValue
	};
};
