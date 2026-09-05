# His Life, His Voice — RSVP site

A zero-build static invitation designed from the supplied navy, gold, and ivory invitation. The RSVP appears automatically as a popup shortly after the page loads and can be reopened from **Confirm attendance**.

## Edit event details

Open `index.html` and replace the displayed name, date, venue, dress code, or RSVP text. There are no packages to install.

## Save RSVP answers for free

The site works as a visual preview without a database. To collect actual answers in a free Google Sheet:

1. Create a Google Sheet and choose **Extensions → Apps Script**.
2. Paste the contents of `google-apps-script/Code.gs`.
3. Choose **Deploy → New deployment → Web app**. Set **Execute as** to *Me* and **Who has access** to *Anyone*.
4. Copy the deployment URL into `config.js` as the `endpoint` value.

## Deploy free on Vercel

1. Create a GitHub repository and upload this `rsvp-invitation` folder.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Select framework preset **Other**. Leave Build Command and Output Directory empty.
4. Click **Deploy**.

Vercel’s free Hobby plan is appropriate for a personal invitation site. Google Sheets stores the replies without a paid database.
