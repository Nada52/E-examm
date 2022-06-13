var addbtn = document.getElementById("addBtn");
var levelNameInput = document.getElementById("name");
var searchInput=document.getElementById("searchInput");
var levelId = "";


var levels = [];
// let token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhkMTNhMzBiMTY1Yzc3OWM0MDVmNDQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTM0MTI3ODF9.axJjVE4jeZt-xYI3YVN6Prf994YCdQngzZ21sqBFX7Q";
var Token = localStorage.getItem('token');  
getLevels();



addbtn.onclick = function () {
    if (addbtn.innerHTML == "Add Level") {
      addLevel();
      getLevels();
    } else {
      updatelevel(levelId);
      getLevels();
      addbtn.innerHTML = "Add Level";
      
    }
    clearInput();
    
  };
function getLevels() {
  var httprequest = new XMLHttpRequest();
  httprequest.open("GET", `https://app-e-exam.herokuapp.com/levels`, true);
  httprequest.setRequestHeader("Content-Type", "application/json");
  httprequest.setRequestHeader("Authorization", "Bearer " + Token);
  httprequest.send();
  httprequest.addEventListener("readystatechange", function () {
    if (httprequest.readyState == 4 && httprequest.status == 200) {
      console.log(httprequest.response);
      let res = JSON.parse(httprequest.response);
      levels = res.levels;
      console.log(levels);    
      displayLevel ();  
    }
  });
}

function displayLevel () {
  let output = "";
  for (let i = 0; i < levels.length; i++) {
    output += `
    <tr>
    <td class="title">${levels[i]._id}</td>
    <td class="title">${levels[i].levelName}</td>
    <td class="title">${levels[i].createdBy.fristName} ${levels[i].createdBy.lastName} </td>
   
    <td><button class="btn btn-danger" onclick="deleteLevel(${i})">Delete</button></td>
    <td><button class="btn btn-primary" onclick="editLevel(${i})">Edit</button></td>
    </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = output;
}

function addLevel() {
  fetch("https://app-e-exam.herokuapp.com/addLevels", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      levelName : levelNameInput.value,
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
      getLevels();
    })
    .catch((err) => {
      console.log(err);
    });
    clearInput();
    getLevels();
    

}

function deleteLevel(index) {
  const levelId = levels[index]._id;
  var httprequest = new XMLHttpRequest();
  httprequest.open("DELETE", `https://app-e-exam.herokuapp.com/removeLevels/${levelId}`, true);
  httprequest.setRequestHeader("Content-Type", "application/json");
  httprequest.setRequestHeader("Authorization", "Bearer " + Token);
  httprequest.send();
  httprequest.addEventListener("readystatechange", function () {
    if (httprequest.readyState == 4 && httprequest.status == 200) {
      console.log(httprequest.response);
      let res = JSON.parse(httprequest.response);
      alert(res.message);
      getLevels();
    }
  });
}
function editLevel(index) {
  levelId = levels[index]._id;
  levelNameInput.value = levels[index].levelName;
  addbtn.innerHTML = "Update level";
}
function updatelevel(levelId) {
  fetch("https://app-e-exam.herokuapp.com/updateLevels", {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({
      levelId ,
      levelName : levelNameInput.value,
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
      getSubject();
    })
    .catch((err) => {
      console.log(err);
    });
    clearInput();
    getLevels();
    
}
searchInput.onkeyup = function () {
  let search = searchInput.value.toLowerCase();
  let output = "";
  for (let i = 0; i < levels.length; i++) {
    if (  levels[i].levelName.toLowerCase().includes(search)) {
      output += 
      `<tr>
      <td>${levels[i]._id}</td>
      <td>${levels[i].levelName}</td>
      <td>${levels[i].createdBy.fristName} ${levels[i].createdBy.lastName} </td>
      <td><button class="btn btn-danger" onclick="deleteLevel(${i})">Delete</button></td>
      <td><button class="btn btn-primary" onclick="editLevel(${i})">Edit</button></td>
      </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = output;
};
function clearInput() {
  levelNameInput.value = "";
}

