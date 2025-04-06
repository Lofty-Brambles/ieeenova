<script lang="ts">
	import type { Snippet } from "svelte";
	import { MetaTags, type OpenGraph } from "svelte-meta-tags";

	import OG_IMAGE_STR from "$lib/assets/og_image.png";

	interface Props {
		children: Snippet;
	}

	type OGImage = NonNullable<OpenGraph["images"]>[0];
	const ogImage: OGImage = { url: OG_IMAGE_STR, alt: "The IEEEnova place slide" };

	const { children }: Props = $props();
</script>

<!-- @TODO complete this shit, maybe add twitter, facebook?
  - https://www.maier.tech/posts/how-to-add-a-basic-seo-component-to-sveltekit 
  - https://oekazuma.github.io/svelte-meta-tags/types/meta-tags-props -->
<MetaTags
	title="IEEEnova | The Final Destination"
	description="Get to know about your next destination. Meet up at IEEEnova."
	canonical={"decide later based on hosting"}
	openGraph={{ type: "website", title: "IEEEnova", images: [ogImage] }}
/>

{@render children()}
