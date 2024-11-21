import { pgTable, serial, text, pgEnum, integer, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';

export const userTable = pgTable('user', {
	id: serial('id').primaryKey(),
	firstName: text('first_name'),
	lastName: text('last_name')
});

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const itemsStatus = pgEnum('status', ['active', 'inactive']);

export const itemTable = pgTable('item', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	status: itemsStatus('status').notNull().default('active')
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
