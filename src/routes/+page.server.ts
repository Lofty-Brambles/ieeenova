import {
	CF_PAGES_URL,
	FROM_EMAIL,
	GOOGLE_PRIVATE_KEY,
	GOOGLE_SERVICE_ACCOUNT_EMAIL,
	SENDGRID_KEY,
} from "$env/static/private";
import { fail } from "@sveltejs/kit";

import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import sgMail from "@sendgrid/mail";
import qrcode from "qrcode";

import type { Actions } from "./$types";

export const actions = {
	default: async ({ request }) => {
		const SCOPES = [
			"https://www.googleapis.com/auth/spreadsheets",
			"https://www.googleapis.com/auth/drive.file",
		];
		const SHEET_ID = "1FSAcKUPSCjpGI3FzJXiNFeeQG949-Qi3pceqniN1UdM";

		const jwt = new JWT({
			email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
			key: GOOGLE_PRIVATE_KEY,
			scopes: SCOPES,
		});

		sgMail.setApiKey(SENDGRID_KEY);

		const data = await request.formData();
		const email = data.get("email")?.toString().trim();
		const name = data.get("name")?.toString().trim();

		if (!email || !name) {
			return fail(400, { missingData: true });
		} else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
			return fail(400, { email, invalid: true });
		}

		const setting = { name, email, attendance: false };
		const document = new GoogleSpreadsheet(SHEET_ID, jwt);
		await document.loadInfo();
		const sheet = document.sheetsByIndex[0];
		await sheet.addRow(setting);

		const CLEAN_URL = CF_PAGES_URL.endsWith("/")
			? CF_PAGES_URL.slice(0, CF_PAGES_URL.length - 1)
			: CF_PAGES_URL;
		const ENCODED_URI = encodeURIComponent(email);
		const qr = await qrcode.toDataURL(`${CLEAN_URL}/attend/${ENCODED_URI}`);

		const subject = "Invitation to IEEEnova 2025";
		const html = `
<html>
	<head>
		<title>${subject}</title>
	</head>
	<body style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;">
		<p>
			Hey there, ${name} - you are registered now! You can send this to your organiser to mark your attendance.
		</p>
		<p>Or show the following QR to your nearby organiser!</p>
	</body>
</html>
		`.trim();

		const attachments = [
			{
				filename: "theqr.png",
				content: qr.replace("data:image/png;base64,", ""),
				type: "image/png",
				content_id: "theqr",
				disposition: "inline",
			},
		];

		await sgMail.send({ from: FROM_EMAIL, to: email, subject, html, attachments });
		return { success: true };
	},
} satisfies Actions;
