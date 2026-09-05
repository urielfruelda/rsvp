/**
 * Free RSVP receiver for Google Sheets.
 * Create a blank Sheet → Extensions → Apps Script, paste this file, then deploy
 * as a Web app (Execute as: Me, Who has access: Anyone).
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVP') ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet('RSVP');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted at', 'Name', 'Attendance', 'Guests', 'Message']);
  }
  const data = JSON.parse(e.postData.contents || '{}');
  sheet.appendRow([data.submittedAt || new Date(), data.name || '', data.attendance || '', data.guests || '', data.message || '']);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
