<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import type { Snippet } from "svelte";

	const { children }: { children: Snippet } = $props();
</script>

<Header hide={true} />
<section>
	<h2 id="attendance"><a href="#attendance">#attendance</a></h2>
	<p>Enter the admin passcode to mark your attendance!</p>
	{@render children()}
</section>
<section><p>Made with hate, and 70 buckets of coffee.</p></section>

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
</style>
