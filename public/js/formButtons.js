function editButtonPress() {
  $('form :input').prop('readonly', false);
  $('#confidential').prop('disabled', false);
  $('#view-buttons').hide();
  $('#view-mailshots').hide();
  $('#update-buttons').show();
  $('.view-breadcrumb').hide();
  $('.edit-breadcrumb').show();
  $('select').prop('disabled', false);
  $('selectpicker').prop('disabled', false);
}
