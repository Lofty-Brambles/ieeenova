import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";
import { error, fail, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
	const SCOPES = [
		"https://www.googleapis.com/auth/spreadsheets",
		"https://www.googleapis.com/auth/drive.file",
	];

	const jwt = new JWT({
		email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		key: env.GOOGLE_PRIVATE_KEY,
		scopes: SCOPES,
	});

	let cell = "B";
	const email = decodeURIComponent(params.slug);

	const document = new GoogleSpreadsheet(env.SHEET_ID, jwt);
	await document.loadInfo();
	const sheet = document.sheetsByIndex[0];
	await sheet.loadCells(`B1:B${sheet.rowCount}`);
	for (let i = 2; i <= sheet.rowCount; i++)
		if (email === sheet.getCellByA1(`B${i}`).value) {
			cell += String(i);
			break;
		}

	return cell.length === 2 ? { cell } : error(404, "Not registered");
};

export const actions = {
	default: async ({ request }) => {
		const SCOPES = [
			"https://www.googleapis.com/auth/spreadsheets",
			"https://www.googleapis.com/auth/drive.file",
		];

		const jwt = new JWT({
			email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			key: env.GOOGLE_PRIVATE_KEY,
			scopes: SCOPES,
		});

		const data = await request.formData();
		const code = data.get("code")?.toString().trim();
		const cell = data.get("cell")?.toString().trim();

		if (!code || !cell) {
			return fail(400, { missingData: true });
		} else if (code !== env.ADMIN_PASSCODE) {
			return fail(401, { message: "Missing/Incorrect credentials." });
		}

		const markedCells = `A${cell[1]}:C${cell[1]}`;
		const document = new GoogleSpreadsheet(env.SHEET_ID, jwt);
		await document.loadInfo();
		const sheet = document.sheetsByIndex[0];
		await sheet.loadCells(markedCells);
		const key = sheet.getCellByA1(`C${cell[1]}`);
		key.value = true;
		await sheet.saveUpdatedCells();

		return { success: true };
	},
} satisfies Actions;
