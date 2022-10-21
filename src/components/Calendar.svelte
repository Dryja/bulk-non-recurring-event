<script>
	import dayjs from 'dayjs';

	import CalendarDay from '../components/CalendarDay.svelte';

    export let startOfMonth;
    let daysInMonth = startOfMonth.daysInMonth();

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function addEvent(event) {
		dispatch('daySelect', { day: event.detail.day });
	}

    function addMonth(n) {
        startOfMonth = startOfMonth.add(n, 'month');
        daysInMonth = startOfMonth.daysInMonth();
    }
</script>

<div>
    <div class="date-controls">
        <button on:click={() => addMonth(-1)}>&lt;</button>
        <p>{startOfMonth.format("MMMM YYYY")}</p>
        <button on:click={() => addMonth(1)}>&gt;</button>
    </div>
    
	<div class="date-grid" style="--month_start:{startOfMonth.day()}">
        {#each Array("Mo", "Tu", "We", "Th", "Fr", "Sa", "Su") as short_day}
        <div class="week-day-name">{short_day}</div>
        {/each}

		{#each Array(daysInMonth) as _, i}
			<CalendarDay on:daySelect={addEvent} date={startOfMonth.add(i, 'day')} />
		{/each}
	</div>
</div>

<style>
	.week-day-name {
		text-align: center;
	}
	.date-grid {
		max-width: 600px;
		display: grid;
		grid-gap: 0.2em;
		grid-row-start: 1;
		grid-template-columns: repeat(7, 1fr);
		margin: 0 auto;
	}

	.date-grid :global(div):nth-child(8) {
		grid-column: var(--month_start);
	}

    .date-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        vertical-align: center;
    }
    
    .date-controls p {
        font-size: x-large;
    }
</style>
