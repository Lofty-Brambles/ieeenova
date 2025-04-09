/* eslint-disable @typescript-eslint/no-unused-expressions */
import { on } from "svelte/events";
import { createSubscriber, MediaQuery } from "svelte/reactivity";

class Themer {
	#preference = new Persist("user-theme", "system");
	#query = new MediaQuery("prefers-color-scheme: dark");
	#system = $derived(this.#query.current ? "dark" : "light");

	get current() {
		return this.#preference.current === "system" ? this.#system : this.#preference.current;
	}

	set current(value: string) {
		this.#preference.current = value === this.#system ? "system" : value;
	}
}

class Persist {
	#key: string;
	#fallback: string;
	#version = $state(0);
	#storage = typeof localStorage === "undefined" ? undefined : localStorage;

	constructor(key: string, fallback: string) {
		this.#key = key;
		this.#fallback = fallback;
	}

	#subscriber = createSubscriber((update) =>
		on(window, "storage", (e) => {
			if (e.key === this.#key) update();
		}),
	);

	get current() {
		this.#subscriber();
		this.#version;
		return this.#storage?.getItem(this.#key) ?? this.#fallback;
	}

	set current(value) {
		this.#storage?.setItem(this.#key, value);
		this.#version += 1;
	}
}

export const theme = new Themer();
