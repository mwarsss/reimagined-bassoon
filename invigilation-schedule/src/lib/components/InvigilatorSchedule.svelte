<script>
	export let schedule;
</script>

<div>
	<h2>{schedule.invigilator}</h2>
	<ul>
		{#each schedule.exams as exam}
			<li>
				{exam.subject} - {exam.timeSlot} - {exam.venue}
			</li>
		{/each}
	</ul>
</div>
