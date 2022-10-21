<script>
	let subject = 'Event name',
		startTime = '7:00',
		duration = '12:00',
		location = '',
		organizer = '',
		attendees = '';

	export let formData = '';

	$: formData = {
		subject,
		startTime,
		duration,
		location,
		organizer,
		attendees
	};
	// add validation
</script>

<form>
	<div class="grid">
		<label for="subject">
			Subject
			<input
				type="text"
				id="subject"
				name="subject"
				placeholder="Subject"
				bind:value={subject}
				required
			/>
		</label>
		<label for="start_time">
			Start time
			<input
				type="text"
				id="start_time"
				name="start_time"
				step="300"
				bind:value={startTime}
				required
			/>
		</label>
		<label for="duration">
			Duration
			<input type="text" id="duration" name="duration" bind:value={duration} required />
			<label for="location">
				Location
				<input
					type="text"
					id="location"
					name="location"
					placeholder="Location"
					bind:value={location}
					required
				/>
			</label>
		</label>
	</div>

	<div class="grid">
		<label for="organizer">
			Organizer
			<input
				type="text"
				id="organizer"
				name="organizer"
				bind:value={organizer}
				placeholder="Organizer"
			/>
		</label>
		<label for="attendees">
			Attendees
			<input
				type="text"
				id="attendees"
				name="attendees"
				bind:value={attendees}
				placeholder="Attendees"
			/>
		</label>
	</div>
	<input type="reset" value="Reset" />
</form>
