<script lang="ts">
	import '../app.css';
	import { appConfig } from '$lib/config';
	let { children } = $props();
</script>

<div id="app" class="flex flex-col gap-8 p-6">
	<header>
		<div class="shadow-box flex flex-row justify-between items-center px-7 py-6">
			<div><h1 class="text-xl font-bold">{appConfig.title}</h1></div>
			<div><a href="/login">Login</a></div>
		</div>
	</header>
	<div id="page" class="p-1">
		{@render children()}
	</div>
</div>
