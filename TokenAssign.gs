/**
 * Add this as an installable trigger: From spreadsheet → On form submit
 * It assigns a sequential token per shop_id and writes back to the sheet.
 */
function onFormSubmit(e){
  const sheet = e.range.getSheet();
  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const row = e.range.getRow();
  const values = sheet.getRange(row,1,1,sheet.getLastColumn()).getValues()[0];
  const get = name => values[headers.indexOf(name)];

  const name = get('Name');
  const phone = (get('Phone (+91)')||'').toString().replace(/\s+/g,'');
  const shopId = (get('Shop ID (e.g., raj-nagar, indirapuram)')||'unknown').toString();
  const mode = get('Mode');
  const service = get('Service');

  // token per shop
  const ps = PropertiesService.getScriptProperties();
  const key = 'token_'+shopId;
  const nextToken = (parseInt(ps.getProperty(key) || '0',10) + 1);
  ps.setProperty(key, String(nextToken));

  // Write token back into a new column "Token"
  const tokenColIndex = (headers.indexOf('Token') >= 0) ? headers.indexOf('Token')+1 : (headers.length+1);
  if(headers.indexOf('Token') < 0){
    sheet.getRange(1, tokenColIndex).setValue('Token');
  }
  sheet.getRange(row, tokenColIndex).setValue(nextToken);

  // Optional: WhatsApp deep link (requires user action)
  const msg = encodeURIComponent(`NoWait Token Confirmed
Shop: ${shopId}
Service: ${service}
Mode: ${mode}
Token: ${nextToken}
Reply here if you are running late.`);
  const wa = `https://wa.me/${phone.replace(/^\+/, '')}?text=${msg}`;
  const waColIndex = (headers.indexOf('WhatsApp Link') >= 0) ? headers.indexOf('WhatsApp Link')+1 : (headers.length+2);
  if(headers.indexOf('WhatsApp Link') < 0){
    sheet.getRange(1, waColIndex).setValue('WhatsApp Link');
  }
  sheet.getRange(row, waColIndex).setValue(wa);
}
