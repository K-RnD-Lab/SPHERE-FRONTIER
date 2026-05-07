function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const payload = {
    updatedAt: new Date().toISOString(),
    study: readSheet(ss, 'StudyLog'),
    sessions: readSheet(ss, 'SessionLog'),
    resources: readSheet(ss, 'Resources'),
  };

  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const body = parseRequestBody(e);
  const type = String(body.type || '').trim();

  // 1. Append new row (study / session)
  if (type === 'study' || type === 'session') {
    const row = body.row || {};
    if (!Object.keys(row).length) return jsonResponse({ ok: false, error: 'Missing row payload.' });
    const sheetName = type === 'study' ? 'StudyLog' : 'SessionLog';
    appendObjectRow(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName), row);
    return jsonResponse({ ok: true, updatedAt: new Date().toISOString() });
  }

  // 2. Update a field in an existing row (e.g. actual_score)
  if (type === 'update') {
    const sessionId = body.session_id;
    const field = body.field;
    const value = body.value;
    if (!sessionId || !field) return jsonResponse({ ok: false, error: 'Missing session_id or field.' });
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('SessionLog');
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
    const colIdx = headers.indexOf(field);
    const idIdx = headers.indexOf('session_id');
    if (colIdx === -1 || idIdx === -1) return jsonResponse({ ok: false, error: 'Column not found: ' + field });
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][idIdx]) === String(sessionId)) {
        sheet.getRange(i + 1, colIdx + 1).setValue(value);
        return jsonResponse({ ok: true, updated: true, updatedAt: new Date().toISOString() });
      }
    }
    return jsonResponse({ ok: false, error: 'Session not found: ' + sessionId });
  }

  return jsonResponse({ ok: false, error: 'Unsupported type: ' + type });
}

function parseRequestBody(e) {
  const contents = e && e.postData && e.postData.contents
    ? String(e.postData.contents)
    : '';

  if (contents) {
    try {
      return JSON.parse(contents);
    } catch (error) {
      // Ignore and continue with form-style payloads.
    }
  }

  const params = e && e.parameter ? e.parameter : {};
  let row = params.row || {};

  if (typeof row === 'string') {
    try {
      row = JSON.parse(row);
    } catch (error) {
      row = {};
    }
  }

  return {
    type: params.type || '',
    row: row || {},
  };
}

function readSheet(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1)
    .filter(row => row.some(cell => String(cell).trim() !== ''))
    .map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
}

function appendObjectRow(sheet, row) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  const values = headers.map(header => row[header] ?? '');
  sheet.appendRow(values);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Migration helpers (run once from editor) ──

// Fix legacy subject "tznk" → "all"
function fixSubjectToAll() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SessionLog');
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  const subIdx = headers.indexOf('subject');
  let updated = 0;
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const sub = String(data[i][subIdx] || '').trim().toLowerCase();
    if (sub === 'tznk') {
      sheet.getRange(i + 1, subIdx + 1).setValue('all');
      updated++;
    }
  }
  Logger.log('Fixed ' + updated + ' rows: tznk→all');
}

// Fix ISO dates (2026-05-07T19:38:21.501Z → 2026-05-07)
function fixIsoDates() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SessionLog');
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  const dateIdx = headers.indexOf('date');
  let updated = 0;
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const d = String(data[i][dateIdx] || '');
    if (d.includes('T')) {
      sheet.getRange(i + 1, dateIdx + 1).setValue(d.slice(0, 10));
      updated++;
    }
  }
  Logger.log('Fixed ' + updated + ' dates');
}
