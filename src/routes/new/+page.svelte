<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { schema } from './schema';
	import { goto } from '$app/navigation';
	import SuperDebug from 'sveltekit-superforms';
	import ArrowLeftIcon from 'lucide-svelte/icons/arrow-left';
	export let data;

	// Client API:
	const { form, errors, constraints, message, enhance } = superForm(data.form, {
		validators: zodClient(schema),
		onUpdate: async ({ result }) => {
			console.log(result);
			if (result.type === 'success') {
				await goto('/');
			}
		}
	});
</script>

<div class="flex flex-row justify-between pb-5">
	<h1>Add new article</h1>
	<Button on:click={() => goto('/')}>
		<ArrowLeftIcon class="mr-2 h-4 w-4" />
		Go back
	</Button>
</div>

{#if $message}<h3>{$message}</h3>{/if}

<form method="POST" novalidate use:enhance action="?/addItem">
	<div class="flex flex-col gap-4">
		<div>
			<label for="name">Name</label>
			<Input
				type="text"
				name="name"
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				{...$constraints.name}
			/>
			{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
		</div>
		<div><Button type="submit">Submit</Button></div>
	</div>
</form>
<div class="pt-10">
	<SuperDebug data={$form} />
</div>

<style>
	.invalid {
		color: red;
	}
</style>
