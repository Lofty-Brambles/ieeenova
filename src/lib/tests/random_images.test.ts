import { RandomImages } from "$lib/random_images";
import { expect, suite, test } from "vitest";

const compareURL = (subject: RandomImages, path: string) =>
	expect(subject.url.toString()).toEqual(RandomImages.BASE_URL + path);

suite("class RandomImages", () => {
	suite("#constructor", () => {
		suite("when graying is used", () => {
			const subjectOne = new RandomImages({ width: 200, height: 300, grayscale: true });

			test("gets an URL with grayscaling", () =>
				compareURL(subjectOne, "/200/300?grayscale=true&random=1"));
		});

		suite("when a format is selected", () => {
			const subjectOne = new RandomImages({ width: 200, height: 300, format: "webp" });

			test("gets an URL with grayscaling", () => compareURL(subjectOne, "/200/300.webp?random=2"));
		});

		suite("when creating a non-seeded instance", () => {
			const subject = new RandomImages({ width: 200, height: 300 });

			test("updates the static variable", () =>
				expect(RandomImages.images).toEqual({ "/200/300": 3 }));
			test("gets a fresh URL", () => compareURL(subject, "/200/300?random=3"));
		});

		suite("when creating a seeded instance", () => {
			const subjectOne = new RandomImages({ width: 200, seed: "hallo" });

			test("doesn't update static variable", () =>
				expect(RandomImages.images).toEqual({ "/200/300": 3 }));
			test("gets a fresh seeded URL", () => compareURL(subjectOne, "/seed/hallo/200"));
		});
	});
});
