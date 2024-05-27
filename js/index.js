var siteNameInput = document.getElementById("siteName");
var siteLinkInput = document.getElementById("siteLink");
var bookMarksList = [];

if (localStorage.getItem("bookMarks") !== null) {
  bookMarksList = JSON.parse(localStorage.getItem("bookMarks"));
  display();
}

function addBookMark() {

  if (siteNameInput.classList.contains('is-valid') && siteLinkInput.classList.contains('is-valid')) {
    var bookMark = {
      name: siteNameInput.value,
      url: siteLinkInput.value
    };
  
    bookMarksList.push(bookMark);
    display();
    clearForm();
  
    localStorage.setItem("bookMarks", JSON.stringify(bookMarksList));

    siteNameInput.classList.remove('is-valid');
    siteLinkInput.classList.remove('is-valid');

  }
  else {
    window.alert("- Site name must contain at least 3 characters \n- Site URL must be a valid one");
  }

  
}

function display() {
  var cartona = "";
  for (var i = 0; i < bookMarksList.length; i++) {
    cartona += `
                <tr>
                    <th>${i + 1}</th>
                    <td>${bookMarksList[i].name}</td>
                    <td><button onclick="visitUrl(${i});" type="button" class="btn btn-warning">Visit</button></td>
                    <td><button onclick="deleteMark(${i});" type="button" class="btn btn-danger">Delete</button></td>
                </tr>
        `;
  }
  document.getElementById("myData").innerHTML = cartona;
}

function clearForm() {
  siteNameInput.value = null;
  siteLinkInput.value = null;
}

function deleteMark(deletedIndex) {
  bookMarksList.splice(deletedIndex, 1);
  display();
  localStorage.setItem("bookMarks", JSON.stringify(bookMarksList));
}

function visitUrl(index) {
  window.open(bookMarksList[index].url, "_blank");
}

function validateForm(element) {
  var regex = {
    siteName: /^[a-z0-9_-]{3,20}$/,
    siteLink: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  }
  
  if (regex[element.id].test(element.value)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
  }
  else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}
