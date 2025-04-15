<script lang="ts">
	import { onMount } from "svelte";

	const { date }: { date: Date } = $props();

	const trackers = ["days", "hours", "minutes", "seconds"];
	const newSegment = { top: "00", bottom: "00", transition: false };
	let interval: ReturnType<typeof setInterval>;
	let display = $state(trackers.map(() => newSegment));

	const oppositeDir = (dir: "top" | "bottom") => (dir === "top" ? "bottom" : "top");
	const getTime = () => {
		const diff = (date.getTime() - new Date().getTime()) / 1000;
		const marks = [diff / (60 * 60 * 24), (diff / (60 * 60)) % 24, (diff / 60) % 60, diff % 60];
		return marks.map((n) => String(Math.floor(n)).padStart(2, "0"));
	};
	const repaint = () => {
		const newTime = getTime();
		const goto = (d: string, bottom: string) => ({ top: d, bottom, transition: d !== bottom });
		display = display.map(({ bottom }, i) => goto(newTime[i], bottom));
		setTimeout(() => {
			display = display.map(({ top }, i) => ({ top, bottom: newTime[i], transition: false }));
		}, 500);
	};

	onMount(() => {
		interval = setInterval(repaint, 1000);
		return () => interval && clearInterval(interval);
	});
</script>

<div class="clock">
	{#each ["overlay", "base"] as layer}
		<div class={layer}>
			{#each display as newSegment, index}
				<div class="segment" aria-labelledby={trackers[index]}>
					{@render Tracker(layer, "top", newSegment)}
					{@render Tracker(layer, "bottom", newSegment)}
				</div>
			{/each}
		</div>
	{/each}
</div>
<div class="display">
	{#each trackers as tracker}
		<p id={tracker}>{tracker}</p>
	{/each}
</div>

{#snippet Tracker(layer: string, is: "top" | "bottom", seg: typeof newSegment)}
	{#if layer === "overlay"}
		<p class={is} class:transition={seg.transition}><span>{seg[oppositeDir(is)]}</span></p>
	{:else}
		<p class={is}><span>{seg[is]}</span></p>
	{/if}
{/snippet}

<style>
	.clock {
		position: relative;
		justify-self: center;
		font-size: 1.5em;
		height: 1.51em;
		width: calc(16ch + 2.3em);
	}

	@media (min-width: 450px) {
		.clock {
			font-size: 2em;
		}
	}

	.base,
	.overlay {
		display: flex;
		gap: 0.1em;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;

		& .bottom {
			transform: scaleY(0);
		}
	}

	.base p {
		border-radius: 0.25em;
	}

	.segment {
		position: relative;
		height: 100%;
		width: calc(4ch + 0.5em);

		& p {
			background: var(--c-surface-normal);
			padding: 0.125em 0.25em;
			width: 4ch;
			text-align: center;
		}

		& .top {
			border-radius: 0.25em 0.25em 0 0;
			position: absolute;
			top: 0;
			left: 0;
			clip-path: inset(0px 0px 50% 0px);

			&.transition {
				transition: transform 0.25s ease-in;
				transform: scaleY(0);
			}
		}

		& .bottom {
			border-radius: 0 0 0.25em 0.25em;
			position: absolute;
			top: 0.01em;
			left: 0;
			clip-path: inset(50% 0px 0px 0px);

			&.transition {
				transition: transform 0.25s 0.25s ease-in-out;
				transform: scale(100%);
			}
		}
	}

	.display {
		display: flex;
		justify-content: center;
		gap: 1.3em;
		position: relative;
		right: 0.5em;

		& p {
			width: calc(8ch - 0.1em);
			text-align: center;
			text-transform: uppercase;
			color: var(--c-text-secondary);
		}
	}
</style>
