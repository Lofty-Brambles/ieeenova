<script lang="ts">
	import maleAvatar from "$lib/assets/male_avatar.png?enhanced";
	import femaleAvatar from "$lib/assets/female_avatar.png?enhanced";

	const cards = [
		{
			name: "Random Guy 101",
			desgn: ["Did this AI thing", "Works at that AI slop"],
			img: maleAvatar,
		},
		{
			name: "Random Girl 102",
			desgn: ["Did this AI thing", "Works at that AI slop"],
			img: femaleAvatar,
		},
		{
			name: "Random Girl 105",
			desgn: ["Did this AI thing", "Works at that AI slop"],
			img: femaleAvatar,
		},
		{
			name: "Random Guy 104",
			desgn: ["Did this AI thing", "Works at that AI slop"],
			img: maleAvatar,
		},
	];
</script>

<div class="full-bleed">
	{#each cards as card}
		<div class="card">
			<div class="pad">
				<p>{card.name}</p>
				<ul role="list">
					{#each card.desgn as desgn}
						<li>{desgn}</li>
					{/each}
				</ul>
			</div>
			<enhanced:img class="img" src={card.img} alt={card.name} />
		</div>
	{/each}
</div>

<style>
	.full-bleed {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
		place-items: center;
		gap: 4vw;
	}

	.card {
		overflow: hidden;
		transition: transform 500ms;
		height: 364px;
		max-width: 320px;
		border-radius: 10px;
		background: linear-gradient(to bottom, var(--c-surface-active), var(--c-surface-normal));

		&:hover,
		&:active {
			transform: scale(1.05);
		}
	}

	.pad {
		padding: 16px;

		& p {
			font-size: var(--fonts-lg);
			font-weight: 700;
		}

		& ul {
			line-height: var(--line-height-heading);
			opacity: 0.7;
		}
	}
</style>
