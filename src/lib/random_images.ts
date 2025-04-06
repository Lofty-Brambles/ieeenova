export class RandomImages {
	static images: Record<string, number> = {};
	static BASE_URL = "https://picsum.photos";
	url: URL;

	constructor({ width, height, seed, blur, grayscale, format }: Options) {
		const builder = [RandomImages.BASE_URL];
		if (seed) builder.push(`/seed/${seed}`);
		const key = builder.push(height ? `/${width}/${height}` : `/${width}`);
		if (format) builder.push(`.${format}`);
		this.url = new URL(builder.join(""));

		if (blur) this.url.searchParams.set("blur", String(blur));
		if (grayscale) this.url.searchParams.set("grayscale", String(grayscale));
		if (!seed) {
			const counter = (RandomImages.images[builder[key - 1]] ?? 0) + 1;
			RandomImages.images[builder[key - 1]] = counter;
			this.url.searchParams.set("random", String(counter));
		}
	}
}

interface Options {
	width: number;
	height?: number;
	seed?: string;
	blur?: number;
	grayscale?: boolean;
	format?: "webp" | "jpg";
}
