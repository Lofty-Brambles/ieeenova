<script lang="ts">
	import { enhance } from "$app/forms";

	const fields = [
		{ name: "name", type: "text" },
		{ name: "email", type: "email" },
	] satisfies { name: string; type: string }[];
</script>

<form method="POST" use:enhance>
	{#each fields as field}
		<div class="container">
			<input name={field.name} id={field.name} type={field.type} placeholder=" " /><label
				for={field.name}>{field.name[0].toUpperCase() + field.name.slice(1)}</label
			>
		</div>
	{/each}
	<button type="submit" class="container">Let me in!</button>
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

		&:active {
			background-color: var(--c-btn-active);
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
