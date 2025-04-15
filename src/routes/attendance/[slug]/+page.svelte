<script lang="ts">
	import { toast } from "svelte-sonner";
	import { enhance } from "$app/forms";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	let isLoading: boolean = $state(false);
</script>

<form
	method="POST"
	use:enhance={({ formData }) => {
		isLoading = true;
		formData.append("cell", data.cell);
		return async ({ result }) => {
			isLoading = false;
			if (result.type === "success") {
				toast.success("You attendance is marked!");
			} else {
				toast.error(JSON.stringify(result));
			}
		};
	}}
>
	<div class="container">
		<input name="code" id="code" placeholder=" " /><label for="code">Admin code</label>
	</div>
	<button type="submit" class="container" disabled={isLoading}>Let me in!</button>
</form>

<style>
	form {
		display: grid;
		gap: 24px;
	}

	.container {
		position: relative;
		justify-self: center;
		align-self: center;
		width: 30ch;
		min-width: 320px;
	}

	button {
		min-height: 48px;
		border: none;
		background-color: var(--c-btn-normal);
		font-weight: 700;
		color: #fff;
		border-radius: 5px;

		&:hover {
			background-color: var(--c-btn-hover);
		}

		&:disabled {
			background-color: var(--c-surface-active);
		}
	}

	label {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		background-color: var(--c-app-bg);

		padding: 0 5.34px;
		margin: 0 8px;
		transition: 0.1s ease-out;
		transform-origin: left top;
	}

	input {
		width: 100%;
		outline: none;
		border: 1px solid var(--c-divider);
		border-radius: 5px;
		padding: 16px 10.67px;
		transition: 0.1s ease-out;
		background-color: var(--c-app-bg);
		color: inherit;

		&:focus {
			border-color: var(--c-btn-hover);
		}
		&:focus + label {
			color: var(--c-btn-hover);
			top: 0;
			transform: translateY(-50%) scale(0.9);
		}
		&:not(:placeholder-shown) + label {
			top: 0;
			transform: translateY(-50%) scale(0.9);
		}
	}
</style>
