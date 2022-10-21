import adapter from '@sveltejs/adapter-static';

const is_gh = process.env.CI;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		paths: {
			base: is_gh ? '/bulk-non-recurring-event' : '',
		},
	}
};

export default config;
