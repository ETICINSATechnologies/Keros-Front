function editButtonPress() {
  $('form :input').prop('readonly', false);
  $('#confidential').prop('disabled', false);
  $('#view-buttons').hide();
  $('#view-mailshots').hide();
  $('#update-buttons').show();
}
