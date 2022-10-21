<script>
	export const prerender = true;
	
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import utc from 'dayjs/plugin/utc';
	import ical, { formatDate } from 'ical-generator';
	import Inputs from './../components/Inputs.svelte';
	import Calendar from '../components/Calendar.svelte';
	
	dayjs.extend(customParseFormat);
	dayjs.extend(utc);

	const calendar = ical();
	let events = [];
	let startOfMonth = dayjs().startOf('month').add(1, 'month');

	let eventData = {};

	function addEvent(event) {
		const timeFormat = ['H:mm', 'HH:mm'];

		let event_day = event.detail.day;
		let start = dayjs(eventData.startTime, timeFormat);
		let duration = dayjs(eventData.duration, timeFormat);

		start = event_day.set('hour', start.hour()).set('minute', start.minute());
		let end = start.add(duration.hour(), 'hour').add(duration.minute(), 'minute');
		console.log(eventData);
		let attendees = eventData.attendees.split(',');

		const cal_event = calendar.createEvent({
			start,
			end,
			organizer: eventData.organizer,
			summary: eventData.subject,
			location: eventData.location
		});

		if (attendees.length > 0 && attendees[0] !== '') {
			console.log(attendees);
			cal_event.attendees(attendees);
		}
		events = calendar.events();

		// check inputs
		// notfiy?
	}

	function returnICS() {
		const blob = new Blob([calendar.toString()], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = 'cal.ics';
		link.href = url;
		link.click();
		URL.revokeObjectURL(url);
	}

	function clearEvents() {
		calendar.clear();
		events = [];
	}

	function removeEvent(event) {
		events = calendar.events().filter((e) => e.data.id !== event.data.id);
		calendar.clear();
		calendar.events(events);
	}

	function sortEvents(a, b){
		return a.start().diff(b.start());
	}
</script>

<Inputs bind:formData={eventData} />

<Calendar startOfMonth={startOfMonth} on:daySelect={addEvent} />
{#if events.length > 0}
	<div class="events-control">
		<button on:click={returnICS}>Download ICS</button>
		<button on:click={clearEvents}>Clear</button>
	</div>
	<table>
		<thead>
			<tr>
				<th scope="col">Title</th>
				<th scope="col">Event time</th>
			</tr>
		</thead>
		<tbody>
			{#each events.sort(sortEvents) as event}
				<tr>
					<td>{event.summary()}</td>
					<td
						>{event.start().format('D/M/YYYY, HH:mm')} - {event
							.end()
							.format('D/M/YYYY, HH:mm  Z')}</td
					>
					<td><button on:click={() => removeEvent(event)}>X</button></td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<h3>No events added</h3>
{/if}

<style>
	.events-control {
		display: flex;
		justify-content: end;
		margin-top: 2em;
		margin-bottom: 2em;
	}
	h3 {
		text-align: center;
	}
</style>
