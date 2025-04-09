<script lang="ts">
	import darkLogoURL from "$lib/assets/ieee-logo-dark.webp?enhanced";
	import lightLogoURL from "$lib/assets/ieee-logo-light.webp?enhanced";
	import { theme } from "$lib/themer.svelte";
</script>

<header>
	<a href="/" aria-label="The logo for IEEE Student Branch" data-special
		>{#if theme.current == "dark"}
			<enhanced:img src={darkLogoURL} alt="IEEE Student Branch logo"></enhanced:img>
		{:else}
			<enhanced:img src={lightLogoURL} alt="IEEE Student Branch logo"></enhanced:img>
		{/if}</a
	>
	<a href="/register" data-special>#register</a>
</header>

<style>
	header {
		display: flex;
		place-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--c-divider);
		padding: 16px 4vw;
	}

	a {
		display: block;

		&[href="/register"] {
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

		&[href="/"] {
			width: 7.5rem;
		}
	}
</style>
