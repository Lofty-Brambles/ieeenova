# The IEEEnova website

This is an event page for an imaginary IEEE event called IEEEnova.

## Dependancies

This website is dependant on the following:

- Cloudflare Pages: The website is hosted on Cloudflare pages and uses a cloudflare adaptor to
  handle the backend actions. Forms are progressively enhanced to ensure function without JS.
- Google Sheets API: It leverages the sheets API to dump the data of attendees and their attendance
  unto it.
- Sendgrid: It uses Twilio's Sendgrid as a service to send out QRs for marking the attendance of
  attendees.

To get it up and running, you will need to use Cloudflare pages and replace the values in
`.env.example` from the dependancies.

## How it works

It leverages a google spreadsheet as a database. While less "secure", it scales just well for a
small event. On registration, a row of data is written to the spreadsheet and an email is send with
a QR.

Any admin can then use the QR or visit the link provided in the email, enter a password and the
attendance would be marked as `TRUE` in the spreadsheet.

## Demonstrations

- The website for demo lives here: https://ieeenova.pages.dev
- The spreadsheet for the data records is here:
  https://docs.google.com/spreadsheets/d/1FSAcKUPSCjpGI3FzJXiNFeeQG949-Qi3pceqniN1UdM/edit?usp=sharing
