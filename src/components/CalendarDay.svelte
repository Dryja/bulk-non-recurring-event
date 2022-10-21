<script>
	export let date;

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function dayClick() {
		dispatch('daySelect', { day: date });
	}
</script>

<div>
	<button class="day-btn" on:click={dayClick}>{date.format('D')}</button>
</div>

<style>
	div, button {
		width: 100%;
	}
	.day-btn {
		padding-left: 0;
		padding-right: 0;
	}
</style>
