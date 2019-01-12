function editButtonPress() {
  $('form :input').prop('readonly', false);
  $('#view-buttons').hide();
  $('#view-mailshots').hide();
  $('#update-buttons').show();
}
