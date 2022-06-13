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
addProf.onclick = function addProf(){
    fetch("https://app-e-exam.herokuapp.com/addProfessor", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      fristName: profFirstName.value,
      lastName: profLastName.value,
      email: profEmail.value,
      password: profPassword.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + Token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert(res.message);
      getProfessors();
    })
    .catch((err) => {
      console.log(err);
    });
    clearProfessorsForm();
}

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

function clearProfessorsForm(){
    profFirstName.value = "";
    profLastName.value = "";
    profEmail.value = "";
    profPassword.value = "";
}

function displayProfessors() {
    var trs = "";
    for (var i = 0; i < professors.length; i++) {
      trs += ` <tr>
      <td class="title">${professors[i]._id}</td>
      <td class="title">${professors[i].fristName}  ${professors[i].lastName}</td>
      <td class="title">${professors[i].email}</td>
      <td><button class="btn btn-danger" onclick="deleteProfessor(${i})">Delete</button></td>
      
      </tr>`;
    }
    document.getElementById("tableBody").innerHTML = trs;
  }



function deleteProfessor(i){
    const professorId = professors[i]._id;
    fetch(`https://app-e-exam.herokuapp.com/deleteUser/${professorId}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + Token,
        }
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          alert(res.message);
          getProfessors();
        })
        .catch((err) => {
          console.log(err);
        });
}


// function editProfessor(i) {
//     addbtn.innerHTML = "Update Subject";
//     profFirstName.value = professors[i].fristName;
//     departmentInput.value = professors[i].lastName;
//     levelInput.value =  professors[i].email;
//     teacherInput.value = professors[i].
//     professorId = professors[i]._id;
    
  
    
//   }


searchProf.onkeyup = function () {
    let search = searchInput.value.toLowerCase();
    var trs = "";
    for (var i = 0; i < professors.length; i++) {
      if(professors[i].email.toLowerCase().includes(search)){
        trs += ` <tr>
        <td>${professors[i]._id}</td>
        <td>${professors[i].fristName}  ${professors[i].lastName}</td>
        <td>${professors[i].email}</td>
        <td><button class="btn btn-danger" onclick="deleteProfessor(${i})">Delete</button></td>
   
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = trs;
  }
  }
  
