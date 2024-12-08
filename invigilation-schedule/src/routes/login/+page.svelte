<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let username = '';
	let password = '';
	let error = '';

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const response = await fetch('/api/admin/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			const data = await response.json();
			// Assuming the response contains a session token
			localStorage.setItem('session', data.token);
			goto('/admin/dashboard');
		} else {
			error = 'Invalid credentials';
		}
	}
</script>

<form on:submit={handleSubmit}>
	<div>
		<label for="username">Username:</label>
		<input type="text" id="username" bind:value={username} required />
	</div>
	<div>
		<label for="password">Password:</label>
		<input type="password" id="password" bind:value={password} required />
	</div>
	{#if error}
		<p>{error}</p>
	{/if}
	<button type="submit">Login</button>
</form>
