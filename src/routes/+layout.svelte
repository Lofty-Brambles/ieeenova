<script lang="ts">
	import type { Snippet } from "svelte";
	import { MetaTags, type OpenGraph } from "svelte-meta-tags";
	import { shortcut, type ShortcutEventDetail, type ShortcutParameter } from "@svelte-put/shortcut";

	import { theme } from "$lib/themer.svelte";
	import OG_IMAGE_STR from "$lib/assets/og_image.png";

	const { children }: { children: Snippet } = $props();

	type OGImage = NonNullable<OpenGraph["images"]>[0];
	const ogImage: OGImage = { url: OG_IMAGE_STR, alt: "The IEEEnova place slide" };

	$effect(() => {
		document.documentElement.dataset.theme = theme.current;
	});

	const callback = (event: ShortcutEventDetail) => {};
	const shortcuts: ShortcutParameter = { trigger: [{ key: "r", callback }] };
</script>

<svelte:head>
	<title>IEEEnova | The Final Destination</title>
	<link rel="preload" href="fonts/atkn.subset.woff2" as="font" type="font/woff2" crossorigin="" />
	<script>
		{
			const scheme = localStorage.getItem("user-theme");
			document.documentElement.dataset.theme =
				!scheme || scheme === "system"
					? window.matchMedia("(prefers-color-scheme: dark)").matches
						? "dark"
						: "light"
					: scheme;
		}
	</script>
</svelte:head>

<svelte:window use:shortcut={shortcuts} />

<!-- @TODO complete this shit, maybe add twitter, facebook?
  - https://www.maier.tech/posts/how-to-add-a-basic-seo-component-to-sveltekit 
  - https://oekazuma.github.io/svelte-meta-tags/types/meta-tags-props -->
<MetaTags
	title="IEEEnova | The Final Destination"
	description="Get to know about your next destination. Meet up at IEEEnova."
	canonical={"decide later based on hosting"}
	openGraph={{ type: "website", title: "IEEEnova", images: [ogImage] }}
/>

<!-- @TODO add a sitemap as well.. think on how to add domain though -->

{@render children()}

<style>
	:global {
		@font-face {
			font-family: "Atkinson Hyperlegible";
			src: url("/fonts/atkn.subset.woff2") format("woff2");
			font-display: swap;
			font-weight: 400;
		}

		@font-face {
			font-family: "Atkinson Hyperlegible fallback";
			src: local("Arial");
			size-adjust: 99.3717%;
			ascent-override: 95.6006%;
			descent-override: 29.1833%;
			line-gap-override: 0%;
		}

		:root {
			--fonts-base:
				"Atkinson Hyperlegible", "Atkinson Hyperlegible fallback", system-ui, -apple-system,
				BlinkMacSystemFont, Segoe UI, Arial, Noto Sans, sans-serif;
			--fonts-mono:
				ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
				monospace;

			--fonts-sm: clamp(0.89rem, 0cqi + 0.89rem, 0.89rem);
			--fonts-md: clamp(1rem, 0.31cqi + 0.94rem, 1.19rem);
			--fonts-lg: clamp(1.13rem, 0.76cqi + 0.97rem, 1.58rem);
			--fonts-xl: clamp(1.27rem, 1.41cqi + 0.98rem, 2.11rem);
			--line-height-compressed: 1.2;
			--line-height-md: 1.5;
			--line-height-heading: 1.15;
			--line-height-list: 1.4;

			--z-header: 3;
		}

		:root[data-theme="light"] {
			--c-surface-normal: hsl(174.76, 99.98%, 90.59%);
			--c-surface-hover: hsl(175.3, 89.35%, 82.07%);
			--c-surface-active: hsl(175.23, 71.3%, 77.62%);
			--c-btn-normal: hsl(176.07, 99.84%, 20.1%);
			--c-btn-hover: hsl(176.08, 99.86%, 17.92%);
			--c-btn-active: hsl(175.92, 99.85%, 15.78%);
			--c-btn-text: hsl(176.02, 100%, 75.18%);
			--c-base: hsl(223.81, 0%, 100%);
			--c-app-bg: hsl(174.04, 49.71%, 96.29%);
			--c-divider: hsl(173.85, 18.48%, 90.14%);
			--c-text-secondary: hsl(172.39, 3.65%, 43.87%);
			--c-text-primary: hsl(171.58, 11.38%, 11.66%);
			--c-shadow: hsl(171.6, 15.9%, 8.05%);
			--shadow-color: 171.344deg 37.257% 69.924%;
			--shadow-elevation1:
				0px 0.4px 0.6px hsl(var(--shadow-color) / 0.07),
				0px 0.8px 1.1px -0.4px hsl(var(--shadow-color) / 0.2),
				0px 1.6px 2.2px -0.7px hsl(var(--shadow-color) / 0.33);
		}

		:root[data-theme="dark"] {
			--c-surface-normal: hsl(176.39, 99.94%, 7.52%);
			--c-surface-hover: hsl(176.49, 99.95%, 9.63%);
			--c-surface-active: hsl(176.52, 99.97%, 11.72%);
			--c-btn-normal: hsl(176.04, 99.84%, 35.8%);
			--c-btn-hover: hsl(175.97, 99.94%, 38.17%);
			--c-btn-active: hsl(175.9, 99.77%, 40.63%);
			--c-base: hsl(174.07, 16.08%, 8.03%);
			--c-app-bg: hsl(173.77, 34.66%, 2.84%);
			--c-divider: hsl(173.44, 8.89%, 15.54%);
			--c-text-secondary: hsl(170.86, 5.97%, 71.02%);
			--c-text-primary: hsl(170.14, 18.97%, 90.51%);
			--c-shadow: hsl(174.07, 16.08%, 8.03%);
			--shadow-color: 173.068deg 99.95% 4.684%;
			--shadow-elevation1:
				0px 0.4px 0.6px hsl(var(--shadow-color) / 0.07),
				0px 0.8px 1.1px -0.4px hsl(var(--shadow-color) / 0.2),
				0px 1.6px 2.2px -0.7px hsl(var(--shadow-color) / 0.33);
		}

		.sr-only {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border-width: 0;
		}

		@media (prefers-reduced-motion: no-preference) {
			html {
				scroll-behavior: smooth;
			}
		}

		body {
			background-color: var(--c-app-bg);
			min-height: 100vh;

			font: var(--fonts-md) / var(--line-height-md) var(--fonts-base);
			-webkit-font-smoothing: antialiased;
			color: var(--c-text-primary);
		}

		a {
			color: inherit;
			text-decoration: none;
		}

		a:not([data-special]) {
			background-image: linear-gradient(var(--c-btn-active), var(--c-btn-hover));
			background-size: 0% 0.1em;
			background-position-y: 100%;
			background-position-x: 100%;
			background-repeat: no-repeat;
			transition: background-size 0.2s ease-in-out;

			&:hover,
			&:active {
				background-size: 100% 0.1em;
				background-position-x: 0%;
			}
		}

		/* Reset styles. */

		* {
			box-sizing: border-box;
			margin: 0;
		}

		html {
			overflow-wrap: break-word;
			-webkit-tap-highlight-color: transparent;
			-webkit-text-size-adjust: none;
			tab-size: 4;
		}

		:where(h1, h2, h3, h4, h5, h6) {
			text-wrap: balance;
		}

		:where(p) {
			text-wrap: pretty;
		}

		:where(ul[role="list"], ol) {
			list-style: none;
			padding: 0;
		}

		:where(img, video, canvas, svg) {
			max-width: 100%;
			display: block;
			height: auto;
		}

		:where(input, button, textarea, select) {
			font: inherit;
		}

		:where(button, [type="button"], [type="reset"], [type="submit"]) {
			appearance: button;
			cursor: pointer;

			&::-moz-focus-inner {
				border-style: none;
				padding: 0;
			}

			&:-moz-focusring {
				outline: 1px dotted ButtonText;
			}
		}
	}
</style>
