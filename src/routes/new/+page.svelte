<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { schema } from './schema';
	import SuperDebug from 'sveltekit-superforms';
	export let data;

	// Client API:
	const { form, errors, constraints, message, enhance } = superForm(data.form, {
		validators: zodClient(schema)
	});
</script>

{#if $message}<h3>{$message}</h3>{/if}

<!-- Novalidate is needed to disable browser validation -->
<form method="POST" novalidate use:enhance>
	<label for="name">Name</label>
	<Input
		type="text"
		name="name"
		aria-invalid={$errors.name ? 'true' : undefined}
		bind:value={$form.name}
		{...$constraints.name}
	/>
	{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

	<label for="email">E-mail</label>
	<Input
		type="email"
		name="email"
		aria-invalid={$errors.email ? 'true' : undefined}
		bind:value={$form.email}
		{...$constraints.email}
	/>
	{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}

	<div><Button type="submit">Submit</Button></div>
</form>

<SuperDebug data={$form} />

<style>
	.invalid {
		color: red;
	}
</style>
