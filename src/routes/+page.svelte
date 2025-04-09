<script>
	import Fullsize from "$lib/components/Fullsize.svelte";
	import Header from "$lib/components/Header.svelte";

	import heroImg from "$lib/assets/hero-image.png?enhanced";
	import ThemeChanger from "$lib/components/ThemeChanger.svelte";
</script>

<Header />
<div>
	<Fullsize ast="h1" cls={["hero-text"]}>meet@ieeenova</Fullsize>
	<enhanced:img class="hero-img" src={heroImg} alt="A random hero image" />
</div>
<ThemeChanger />

<style>
	:global(.hero-text) {
		padding: 24px 4vw 0 4vw;
		text-transform: uppercase;
		text-align: center;
		line-height: 0.85;

		position: relative;
	}

	.hero-img {
		width: 100%;
		z-index: -1;
	}
</style>
