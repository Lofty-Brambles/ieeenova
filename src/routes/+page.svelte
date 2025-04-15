<script lang="ts">
	import Fullsize from "$lib/components/Fullsize.svelte";
	import Header from "$lib/components/Header.svelte";
	import Cards from "$lib/components/Cards.svelte";
	import FormFields from "$lib/components/FormFields.svelte";
	import Timer from "$lib/components/Timer.svelte";

	import heroImg from "$lib/assets/hero-image.png?enhanced";
</script>

<Header />
<div>
	<Fullsize ast="h1" cls={["hero-text"]}>meet@ieeenova</Fullsize>
	<enhanced:img class="hero-img" src={heroImg} alt="A random hero" />
</div>
<section>
	<!-- @TODO: spruce this up, maybe add a picture setting like pudding.cool -->
	<h2 id="agenda"><a href="#agenda">#agenda</a></h2>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione laborum, doloribus sit
		temporibus mollitia, eius cum accusamus ad necessitatibus soluta exercitationem, perferendis
		voluptatem! Omnis illo praesentium laborum repellat incidunt itaque.
	</p>
</section>
<section>
	<h2 id="countdown"><a href="#countdown">#countdown</a></h2>
	<p>The time is now! The clock is ticking...</p>
	<Timer date={new Date(1745539200 * 1000)} />
</section>
<section>
	<h2 id="speakers"><a href="#speakers">#speakers</a></h2>
	<Cards />
</section>
<section>
	<h2 id="register"><a href="#register">#register</a></h2>
	<p>Put down your names, be there or be square!</p>
	<FormFields />
</section>
<section><p>Made with hate, and 70 buckets of coffee.</p></section>

<style>
	:global(.hero-text) {
		position: relative;
		padding: 36px 4vw 0 4vw;
		text-transform: uppercase;
		line-height: 0.85;
	}

	.hero-img {
		width: 100%;
	}

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
		padding-bottom: 16px;
	}

	p {
		font-size: var(--fonts-lg);
	}
</style>
