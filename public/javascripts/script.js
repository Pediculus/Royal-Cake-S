/*Navbar*/
function openCake(evt, cakeName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cakeName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  /*Default open*/
  document.getElementById("defaultOpen").click();

  /*View all button*/
  function showMore(id) {
       var more = document.getElementById(id + '-more');
      if (more.style.display === "none") {
          more.style.display = "block";
      } else {
          more.style.display = "none";
      }
  }

  function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById('imagePreview');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}