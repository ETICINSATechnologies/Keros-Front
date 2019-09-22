// When the user clicks on button and call the following function, it opens the popup
function showPopUp() {
  let popup = document.getElementById("popup");
  popup.classList.toggle("show");
}

function showUploadElements() {
  document.getElementById("fileSelection").style.display = "block";
}

function setActionAttribute() {
  const id = $("#selectDocumentId option:selected").attr("value");
  let originValue = $("#addFileForm").attr("action");
  let newValue = originValue + id;
  $("#addFileForm").attr("action", newValue);
}