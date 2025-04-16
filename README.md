# The IEEEnova website

This is an event page for an imaginary IEEE event called IEEEnova.

## The tech ⚙

To get it running, update the `.env.example` file with the necessary variables, and use
`pnpm install --frozen-lockfile && pnpm dev`. Also, `pnpm install --frozen-lockfile && pnpm build`
to build and `node build/index.js` to run.

- The website is made with **Sveltekit** on runes mode, with a node adapter.
- No tailwind, but rather, some class-less CSS. (😎 Selectors are underappreciated, thanks, KPowell)
- It is tested with **Vitest** alongside v8 for test-cov. Though, it's low due to a lack of time.
- It uses a dependancy-lenient `qrcode` package to generate QRs.
- Google's **spreadsheet** API for the spreadsheet access and Sendgrid **mailing** for the emails.
- Eslint, Prettier and all that **DevEx** jazz. Hosted on render.

## How it works 🌏

It leverages a google spreadsheet as a database. While less "secure", it scales just well for a
small event, using a common interface. On registration, a row of data is written to the spreadsheet
and an email is sent with Twilio Sendgrid, with a QR attached.

Any admin can then use the QR or visit the link provided in the email, enter a password and the
attendance would be marked as `TRUE` in the spreadsheet.

## Demonstrations ⚡

The demo might take some time due to render's free tier taking it's time to spin up. Especially with
the emails.

- The website for demo lives here: https://ieeenova.onrender.com
- The spreadsheet for the data records is here:
  https://docs.google.com/spreadsheets/d/1FSAcKUPSCjpGI3FzJXiNFeeQG949-Qi3pceqniN1UdM/edit?usp=sharing
