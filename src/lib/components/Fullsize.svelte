<script lang="ts">
	import { onMount, type Snippet } from "svelte";

	type Props = {
		ast: keyof HTMLElementTagNameMap;
		children: Snippet;
		cls?: string[];
	} & Partial<Record<"compression" | "min" | "max", number>>;

	const {
		ast = "div",
		compression = 1,
		min = Number.NEGATIVE_INFINITY,
		max = Number.POSITIVE_INFINITY,
		cls = [],
		children,
	}: Props = $props();

	let element: HTMLElement;
	const getSize = () => {
		const size = Math.max(Math.min(element.clientWidth / (compression * 10), max), min);
		element.style.fontSize = `${size}px`;
	};

	onMount(getSize);
</script>

<svelte:window onresize={getSize} onorientationchange={getSize} />

<svelte:element this={ast} bind:this={element} class={cls}>{@render children()}</svelte:element>
