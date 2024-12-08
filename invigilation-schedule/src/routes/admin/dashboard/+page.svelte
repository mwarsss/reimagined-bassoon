<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let data: any = {};

	onMount(async () => {
		const token = localStorage.getItem('session');
		if (!token) {
			goto('/login');
		} else {
			const response = await fetch('/api/admin/dashboard', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (response.ok) {
				data = await response.json();
			} else {
				goto('/login');
			}
		}
	});
</script>

<h1>Admin Dashboard</h1>

<div>
	<h2>Upcoming Exams</h2>
	<ul>
		{#each data.exams as exam}
			<li>{exam.subject} - {exam.date} - {exam.timeSlot}</li>
		{/each}
	</ul>
</div>

<div>
	<h2>Invigilator Availability</h2>
	<ul>
		{#each data.invigilators as invigilator}
			<li>{invigilator.name} - {invigilator.available ? 'Available' : 'Not Available'}</li>
		{/each}
	</ul>
</div>

<div>
	<h2>Conflicts</h2>
	<ul>
		{#each data.conflicts as conflict}
			<li>{conflict.description}</li>
		{/each}
	</ul>
</div>
