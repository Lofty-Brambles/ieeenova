<script lang="ts">
	import darkLogoURL from "$lib/assets/ieee-logo-dark.webp?enhanced";
	import lightLogoURL from "$lib/assets/ieee-logo-light.webp?enhanced";

	import { theme } from "$lib/themer.svelte";
	import Marquee from "./Marquee.svelte";
	import ThemeChanger from "./ThemeChanger.svelte";

	const { hide = false }: { hide?: boolean } = $props();
</script>

<header>
	<Marquee text="The time is now, and your moment is here!" rpm={20} />
	<a href="/" aria-label="The logo for IEEE Student Branch" data-special
		>{#if theme.current == "dark"}
			<enhanced:img src={darkLogoURL} alt="IEEE Student Branch logo"></enhanced:img>
		{:else}
			<enhanced:img src={lightLogoURL} alt="IEEE Student Branch logo"></enhanced:img>
		{/if}</a
	>
	<div>
		<ThemeChanger />
		<a href="#register" data-special class:hide><kbd>r</kbd>#register</a>
	</div>
</header>

<style>
	header {
		display: flex;
		place-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--c-divider);
		padding: 16px 4vw;
	}
	div {
		display: flex;
		gap: 16px;
	}

	a {
		&[href="#register"] {
			display: flex;
			place-items: center;
			gap: 8px;

			padding: 8px 16px;
			border-radius: 500px;
			transition: all 250ms;

			background-color: var(--c-btn-normal);
			font: var(--fonts-lg) 700;
			color: var(--c-btn-text);

			&:hover,
			&:active {
				background-color: var(--c-btn-hover);
				transform: scale(1.05) rotate(-1deg);
			}
		}

		&.hide {
			display: none;
		}

		&[href="/"] {
			width: 7.5rem;
		}
	}

	kbd {
		height: 24px;
		width: 24px;

		border: 1px solid var(--c-surface-active);
		border-radius: 4px;
		text-align: center;
		line-height: 20px;
	}
</style>
