<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		const { invigilator } = params as { invigilator: string };
		// Fetch or generate schedule data for the invigilator
		const schedule = {
			invigilator: 'John Doe',
			exams: [
				{ subject: 'Math', timeSlot: 'Morning', venue: 'Room 101' },
				{ subject: 'Physics', timeSlot: 'Afternoon', venue: 'Room 102' }
			]
		};
		return { props: { schedule } };
	};
</script>

<script lang="ts">
	import InvigilatorSchedule from '$lib/components/InvigilatorSchedule.svelte';

	interface Exam {
		subject: string;
		timeSlot: string;
		venue: string;
	}

	interface Schedule {
		invigilator: string;
		exams: Exam[];
	}

	export let schedule: Schedule;
</script>

<InvigilatorSchedule {schedule} />
