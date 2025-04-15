<script lang="ts">
	const { text, rpm }: { text: string; rpm: number } = $props();
</script>

<svg width="200" height="200" viewBox="0 0 200 200" style:--rpm={`${rpm}s`}>
	<path id="myPath" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
	<text>
		<textPath href="#myPath">{text}</textPath>
	</text>
</svg>

<style>
	svg {
		fill: none;
		animation: rotate var(--rpm) linear infinite;

		left: 10%;
		opacity: 0.4;
		position: absolute;
		transform: translate(-50%);
	}

	@media (min-width: 650px) {
		svg {
			opacity: 1;
			left: 50%;
		}
	}

	@keyframes rotate {
		to {
			transform: translate(-50%) rotate(360deg);
		}
	}

	textPath {
		stroke: var(--c-text-primary);
		text-transform: uppercase;
		font-size: var(--font-sm);
	}
</style>
