var addbtn = document.getElementById("addBtn");
var departmentNameInput = document.getElementById("name");
var searchInput = document.getElementById("searchInput");
var departmentId = "";
var Depatments = [];
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhkMTNhMzBiMTY1Yzc3OWM0MDVmNDQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTM0MTI3ODF9.axJjVE4jeZt-xYI3YVN6Prf994YCdQngzZ21sqBFX7Q";
getDepatments();

addbtn.onclick = function () {
  if (addbtn.innerHTML == "Add Department") {
    addDepatment();
  } else {
    updatedepartment(departmentId);
    addbtn.innerHTML = "Add Department";
  }
  clearInput();
};

function getDepatments() {
  var httprequest = new XMLHttpRequest();
  httprequest.open("GET", `https://app-e-exam.herokuapp.com/departments`, true);
  httprequest.setRequestHeader("Content-Type", "application/json");
  httprequest.setRequestHeader("Authorization", "Bearer " + token);
  httprequest.send();
  httprequest.addEventListener("readystatechange", function () {
    if (httprequest.readyState == 4 && httprequest.status == 200) {
      console.log(httprequest.response);
      let res = JSON.parse(httprequest.response);
      Depatments = res.data;
      console.log(Depatments);
      displayDepartment();
    }
  });
}
function displayDepartment() {
  let output = "";
  for (let i = 0; i < Depatments.length; i++) {
    output += `
    <tr>
     <td class="title">${Depatments[i]._id}</td>
     <td class="title">${Depatments[i].departmentName}</td>
     <td class="title">${Depatments[i].createdBy.fristName} ${Depatments[i].createdBy.lastName} </td>
     <td><button class="btn btn-danger" onclick="deleteDepatment(${i})">Delete</button></td>
     <td><button class="btn btn-primary" onclick="editDepartment(${i})">Edit</button></td>
     </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = output;
}
function addDepatment() {
  fetch("https://app-e-exam.herokuapp.com/addDepartment", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      departmentName: departmentNameInput.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert(res.message);
      getDepatments();
    })
    .catch((err) => {
      console.log(err);
    });

  getDepatments();
}
function deleteDepatment(index) {
  const departmentId = Depatments[index]._id;
  var httprequest = new XMLHttpRequest();
  httprequest.open(
    "DELETE",
    `https://app-e-exam.herokuapp.com/deleteDepartment/${departmentId}`,
    true
  );
  httprequest.setRequestHeader("Content-Type", "application/json");
  httprequest.setRequestHeader("Authorization", "Bearer " + token);
  httprequest.send();
  httprequest.addEventListener("readystatechange", function () {
    if (httprequest.readyState == 4 && httprequest.status == 200) {
      console.log(httprequest.response);
      let res = JSON.parse(httprequest.response);
      alert(res.message);
      getDepatments();
    }
  });
}
function editDepartment(index) {
  departmentId = Depatments[index]._id;
  departmentNameInput.value = Depatments[index].departmentName;
  addbtn.innerHTML = "Update Department";
}
function updatedepartment(departmentId) {
  fetch(`https://app-e-exam.herokuapp.com/updateDepartment`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({
      departmentId,
      departmentName: departmentNameInput.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert(res.message);
      getDepatments();
    })
    .catch((err) => {
      console.log(err);
    });

  getDepatments();
}
function clearInput() {
  departmentNameInput.value = "";
}
searchInput.onkeyup = function () {
  let output = "";
  for (let i = 0; i < Depatments.length; i++) {
    if (Depatments[i].departmentName.includes(searchInput.value)) {
      output += `
      <tr>
       <td>${Depatments[i]._id}</td>
       <td>${Depatments[i].departmentName}</td>
       <td>${Depatments[i].createdBy.fristName} ${Depatments[i].createdBy.lastName} </td>
       <td><button class="btn btn-danger" onclick="deleteDepatment(${i})">Delete</button></td>
       <td><button class="btn btn-primary" onclick="editDepartment(${i})">Edit</button></td>
       </tr>
      `;
    }
  }
  document.getElementById("tableBody").innerHTML = output;
};
