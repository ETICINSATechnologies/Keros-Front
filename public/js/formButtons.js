function editButtonPress() {
  $('form :input').prop('readonly', false);
  $('#confidential').prop('disabled', false);
  $('input[name="isBoard"]').prop('disabled', false);
  $('#view-buttons').hide();
  $('#view-mailshots').hide();
  $('#update-buttons').show();
  $('.view-breadcrumb').hide();
  $('.edit-breadcrumb').show();
}
