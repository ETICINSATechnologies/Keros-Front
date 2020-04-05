function editButtonPress() {
  $('select').attr('readonly', false);
  $('select').attr('disabled', false);
  $('form :input').prop('readonly', false);
  $('#confidential').prop('disabled', false);
  $('input[name="isBoard"]').prop('disabled', false);
  $('#view-buttons').hide();
  $('#view-mailshots').hide();
  $('#update-buttons').show();
  $('.view-breadcrumb').hide();
  $('.edit-breadcrumb').show();
}

function executeSearch(){
  searchInput=document.getElementById("searching").value;
  location.href='?search='+searchInput
}

function callEnter(e){
  if(e.keyCode === 13){
    executeSearch()
  }
  return false;
}

