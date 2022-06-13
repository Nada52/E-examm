var profFirstName = document.getElementById('firstName');
var profLastName = document.getElementById('lastName');
var profEmail = document.getElementById('email');
var profPassword = document.getElementById('password');
var addProf = document.getElementById('addBtn');
var searchProf = document.getElementById('searchInput');
var professors = [];
var professorId = "";
// var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhkMTNhMzBiMTY1Yzc3OWM0MDVmNDQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTM0MTI3ODF9.axJjVE4jeZt-xYI3YVN6Prf994YCdQngzZ21sqBFX7Q"
var Token = localStorage.getItem('token');
document.addEventListener("DOMContentLoaded",function getProfessors(){
    fetch("https://app-e-exam.herokuapp.com/professors",{
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + Token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          professors = res['users'];
          console.log(professors);
          displayProfessors();
        })
        .catch((err) => {
          console.log(err);
        });
  
})


function displayProfessors() {
    var trs = "";
    for (var i = 0; i < professors.length; i++) {
      trs += ` <tr>
      <td class="title">${professors[i]._id}</td>
      <td class="title">${professors[i].fristName}  ${professors[i].lastName}</td>
      <td class="title">${professors[i].email}</td>
      </tr>`;
    }
    document.getElementById("tableBody").innerHTML = trs;
  }
