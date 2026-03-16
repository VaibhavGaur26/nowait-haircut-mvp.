/**
 * Creates a Google Form for haircut booking and links a Sheet.
 * Run once, then use TokenAssign.gs to assign tokens.
 */
function createBookingForm(){
  const form = FormApp.create('NoWait Haircut — Booking');
  form.setConfirmationMessage('Thanks! We received your request. You will get a token number shortly on WhatsApp/SMS.');
  form.setAllowResponseEdits(false);
  form.setCollectEmail(false);

  const sec = form.addSectionHeaderItem().setTitle('Your Details');
  const name = form.addTextItem().setTitle('Name').setRequired(true);
  const phone = form.addTextItem().setTitle('Phone (+91)').setRequired(true);

  form.addSectionHeaderItem().setTitle('Booking');
  const shop = form.addTextItem().setTitle('Shop ID (e.g., raj-nagar, indirapuram)').setRequired(true);
  const service = form.addMultipleChoiceItem().setTitle('Service')
    .setChoiceValues(['Basic Cut','Beard Trim','Kids Cut'])
    .setRequired(true);
  const mode = form.addMultipleChoiceItem().setTitle('Mode')
    .setChoiceValues(['TOKEN','SLOT'])
    .setRequired(true);
  const arrival = form.addTextItem().setTitle('Estimated arrival time (e.g., 15 min)').setRequired(false);

  const sheet = SpreadsheetApp.create('NoWait Booking Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('Form URL: ' + form.getPublishedUrl());
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Sheet URL: ' + sheet.getUrl());
}
