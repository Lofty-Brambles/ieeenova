<script>
	import { page } from "$app/state";
	import Header from "$lib/components/Header.svelte";
</script>

<Header />
<section>
	<h2 id="error"><a href="#error">#ohno ({page.status})</a></h2>
	<img src="https://http.cat/{page.status}.webp" alt="The error cat!" />
	<p>You seem to be lost. <a href="/">Return to the home page. ↗</a></p>
</section>
<section><p>Made with hate, and 70 buckets of ☕.</p></section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr min(42rem, calc(100% - 48px)) 1fr;
		padding: 24px;
		gap: 24px;
		border-bottom: 1px solid var(--c-divider);

		& > :global(*) {
			grid-column: 2;
		}
	}

	:global(.hero-text),
	h2,
	p {
		text-align: center;
	}

	h2 {
		position: relative;
		text-transform: uppercase;
		font-size: var(--fonts-sm);
		padding: 32px 0 16px 0;
	}

	p {
		font-size: var(--fonts-lg);
	}

	img {
		width: calc(100% - 24px);
		max-width: 30ch;
    justify-self: center;
	}
</style>
