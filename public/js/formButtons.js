function editButtonPress() {
  $('form :input').prop('readonly', false);
  $('#view-buttons').hide();
  $('#update-buttons').show();
}
