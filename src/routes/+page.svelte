<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	let { data } = $props();

	let loading = false;
	let searchValue: null | string = $state(data.searchValue);

	const updateSearch = async () => {
		loading = true;
		let path = '/?';
		if (searchValue) {
			path += `search=${searchValue}`;
		}
		await goto(path);
		loading = false;
	};
</script>

<div id="organization-ui" class="flex flex-row gap-5">
	<div class="w-52">
		<Input bind:value={searchValue}></Input>
		<Button on:click={() => updateSearch()}>Search</Button>
		<Button on:click={() => goto('/new')}>New</Button>
	</div>
	<div class="flex flex-grow flex-col">
		Search value: {data.searchValue}
		Items:
		{#if data.items}
			{#each data.items as result}
				<div class="flex flex-row gap-5 border-black border p-1">
					<div class="w-52">{result.id}</div>
					<div class="w-52">{result.name}</div>
					<div class="w-52">{result.status}</div>
				</div>
			{/each}
		{:else}
			<div>No results found</div>
		{/if}
	</div>
</div>
