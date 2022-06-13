var addbtn = document.getElementById("addBtn");
var searchInput=document.getElementById("searchInput");
var subjectNameInput = document.getElementById("name");
var departmentInput = document.getElementById("department");
var levelInput = document.getElementById("level");
var teacherInput = document.getElementById("teacher");
var subjectId = "";

var Subjects = [];
// let token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhkMTNhMzBiMTY1Yzc3OWM0MDVmNDQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTM0MTI3ODF9.axJjVE4jeZt-xYI3YVN6Prf994YCdQngzZ21sqBFX7Q";
var Token = localStorage.getItem('token');
  getSubject();



function getSubject() {
  var httprequest = new XMLHttpRequest();
  httprequest.open("GET", `https://app-e-exam.herokuapp.com/subjects`, true);
  httprequest.setRequestHeader("Content-Type", "application/json");
  httprequest.setRequestHeader("Authorization", "Bearer " + Token);
  httprequest.send();
  httprequest.addEventListener("readystatechange", function () {
    if (httprequest.readyState == 4 && httprequest.status == 200) {
      console.log(httprequest.response);
      let res = JSON.parse(httprequest.response);
      Subjects = res.data;
      displaySubjects();
    }
  });
}
function displaySubjects() {
  var trs = "";
  for (var i = 0; i < Subjects.length; i++) {
    trs += ` <tr>
    <td class="title">${Subjects[i]._id}</td>
    <td class="title">${Subjects[i].subjectName}</td>
    <td class="title">${Subjects[i].level.levelName}</td>
    <td class="title">${Subjects[i].department.departmentName}</td>
    <td class="title">${Subjects[i].prof.fristName}  ${Subjects[i].prof.lastName}</td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = trs;
}

function clearSubjectsForm() {
  subjectNameInput.value = "";
  departmentInput.value = "";
  levelInput.value = "";
  teacherInput.value = "";
}

searchInput.onkeyup = function () {
  let search = searchInput.value.toLowerCase();
  var trs = "";
  for (var i = 0; i < Subjects.length; i++) {
    if(Subjects[i].subjectName.toLowerCase().includes(search)){
    trs += ` <tr>
    <td>${Subjects[i]._id}</td>
    <td>${Subjects[i].subjectName}</td>
    <td>${Subjects[i].level.levelName}</td>
    <td>${Subjects[i].department.departmentName}</td>
    <td>${Subjects[i].prof.fristName}  ${Subjects[i].prof.lastName}</td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = trs;
}
}


