import { pgTable, serial, text, pgEnum } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	firstName: text('first_name'),
	lastName: text('last_name')
});

export const itemsStatus = pgEnum('status', ['active', 'inactive']);

export const items = pgTable('items', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	status: itemsStatus('status').notNull().default('active')
});
