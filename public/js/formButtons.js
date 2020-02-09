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

function fctSearch(){
  address=document.getElementById("searching").value;
  location.href='/core/member?search='+address
}

function callEnter(e){
  address=document.getElementById("searching").value;
  console.log(address)
  if(e.keyCode === 13){
    location.href='/core/member?search='+address

  }
  return false;
}

