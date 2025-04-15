<script lang="ts">
	import { theme } from "$lib/themer.svelte";
	import type { MouseEventHandler } from "svelte/elements";

	const onclick: MouseEventHandler<HTMLButtonElement> = (e) => {
		theme.current = theme.current === "light" ? "dark" : "light";
	};
</script>

<button type="button" title="Theme toggle" aria-live="polite" aria-label={theme.current} {onclick}>
	<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
		<mask id="moon-mask">
			<rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
			<circle cx="24" cy="10" r="6" fill="black"></circle>
		</mask>
		<circle cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor"></circle>
		<g stroke="currentColor">
			<line x1="12" y1="1" x2="12" y2="3"></line>
			<line x1="12" y1="21" x2="12" y2="23"></line>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
			<line x1="1" y1="12" x2="3" y2="12"></line>
			<line x1="21" y1="12" x2="23" y2="12"></line>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
		</g>
	</svg>
</button>

<style>
	svg {
		stroke-linecap: round;

		& > :is(mask, svg > circle, g) {
			transform-origin: center center;
		}

		& > :is(mask, svg > circle) {
			fill: var(--c-text-primary);
		}

		& > g {
			stroke: var(--c-text-primary);
			stroke-width: 2px;
		}
	}

	button:is(:hover, :focus-visible) svg {
		& > :is(mask, svg > circle) {
			fill: var(--c-text-secondary);
		}

		& > g {
			stroke: var(--c-text-secondary);
		}
	}

	:global([data-theme="dark"]) svg {
		& > circle {
			transform: scale(1.75);
		}

		& > g {
			opacity: 0;
		}

		& > mask > circle {
			transform: translate(-7px);
		}
	}

	@supports (cx: 1) {
		:global([data-theme="dark"]) svg > mask > circle {
			transform: translate(0);
			cx: 17;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		svg {
			& > circle {
				transition: transform 0.5s cubic-bezier(0.5, 1.25, 0.75, 1.25);
			}

			& > g {
				transition:
					transform 0.5s cubic-bezier(0.5, 1.5, 0.75, 1.25),
					opacity 0.5s cubic-bezier(0.25, 0, 0.3, 1);
			}

			& mask > circle {
				transition: transform 0.25s cubic-bezier(0, 0, 0, 1);
			}
		}

		@supports (cx: 1) {
			svg mask > circle {
				transition: cx 0.25s cubic-bezier(0, 0, 0, 1);
			}
		}

		:global([data-theme="dark"]) svg {
			& > circle {
				transform: scale(1.75);
				transition-timing-function: cubic-bezier(0.25, 0, 0.3, 1);
				transition-duration: 0.25s;
			}

			& > g {
				transform: rotate(-25deg);
				transition-duration: 0.15s;
			}

			& > mask > circle {
				transition-delay: 0.25s;
				transition-duration: 0.5s;
			}
		}
	}

	button {
		inline-size: 32px;
		border: none;
		padding: 0;

		background: none;
		outline-offset: 5px;
		z-index: 2;
	}
</style>
