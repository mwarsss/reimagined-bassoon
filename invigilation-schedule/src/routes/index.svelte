<script lang="ts">
	import { onMount } from 'svelte';

	interface Invigilator {
		name: string;
		id: number;
	}

	let invigilators: Invigilator[] = [];

	onMount(() => {
		// Fetch or generate invigilator data
		invigilators = [
			{ name: 'John Doe', id: 1 },
			{ name: 'Jane Smith', id: 2 }
		];
	});
</script>

<h1>Invigilation Schedule</h1>
<ul>
	{#each invigilators as invigilator}
		<li>
			<a href={`/schedule/${invigilator.id}`}>{invigilator.name}</a>
		</li>
	{/each}
</ul>
