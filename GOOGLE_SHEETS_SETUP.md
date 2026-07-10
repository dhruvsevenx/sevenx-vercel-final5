# Google Sheets Contact-Form Setup (60 seconds)

The SevenX contact form pushes each submission to a Google Sheet via a Google Apps Script Web App.
You already have the target sheet:
`https://docs.google.com/spreadsheets/d/14CC25oIDB6cjFuftlM3_vZjqAVWxPbwR_J3e3Ihe468/edit`

## 1. Open the Apps Script editor

1. Open your sheet.
2. Click **Extensions → Apps Script**.
3. A new editor tab opens.

## 2. Paste this exact script

Replace everything in `Code.gs` with the block below and click the **💾 Save** icon.

```javascript
// SevenX Media — Contact Form → Google Sheets bridge
const SHEET_ID   = "14CC25oIDB6cjFuftlM3_vZjqAVWxPbwR_J3e3Ihe468";
const SHEET_NAME = "Leads"; // change if you renamed the tab

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const ss   = SpreadsheetApp.openById(SHEET_ID);
    let sheet  = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Header row (only added once)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Name", "Company", "Email", "Phone",
        "Vertical", "Budget", "Message", "Page", "Referrer"
      ]);
    }

    sheet.appendRow([
      body.timestamp || new Date().toISOString(),
      body.name || "",
      body.company || "",
      body.email || "",
      body.phone || "",
      body.vertical || "",
      body.budget || "",
      body.message || "",
      body.page || "",
      body.referrer || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("SevenX lead webhook alive.");
}
```

## 3. Deploy as a Web App

1. Top-right → **Deploy → New deployment**.
2. Gear icon → choose **Web app**.
3. Description: `SevenX Contact Form`
4. **Execute as:** *Me*  (your Google account)
5. **Who has access:** *Anyone*  (this is safe — the script only appends rows to your sheet)
6. Click **Deploy**, then **Authorize access** and grant permissions.
7. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfy…/exec`

## 4. Paste the URL into the site config

Open `/app/frontend/.env` and set:

```
REACT_APP_SHEETS_ENDPOINT=https://script.google.com/macros/s/AKfy…/exec
```

On Vercel, add the same key/value under **Project Settings → Environment Variables** (Production, Preview, Development) and redeploy.

## 5. Test

Submit the contact form on the site — a new row should appear in your **Leads** tab within a second.

### Notes

- The frontend uses `mode: "no-cors"` and `Content-Type: text/plain` so no CORS preflight is needed. You will see an "opaque" response in DevTools — that is expected and works.
- Every submission is also stored in the visitor's `localStorage` under `sevenx_leads` so no lead is ever lost, even if Google is momentarily unreachable.
- Whenever you update the Apps Script, click **Deploy → Manage deployments → ✏️ → New version** and re-deploy. The URL stays the same.
