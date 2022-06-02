var token = localStorage.getItem('token');
document.addEventListener("DOMContentLoaded", function(){
    fetch("https://app-e-exam.herokuapp.com/teacherSubjects", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(function (response) {
      if (response.ok) {
        console.log(response.status);
        return response.json();
      }
      console.log(response.status);
      return Promise.reject(response);
    })
    .then(function (data) {
    exams = data['data'];
    let allExams = data;
    let table = document.getElementById('professorSubjectsTable');
    
   
    for (let i = 0; i<exams.length;i++){
        let tr = document.createElement('tr');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let showResults = document.createElement('a');
        showResults.href = 'gradesForProfessor.html';
        td3.innerHTML = exams[i]['subjectName'];
        showResults.innerHTML = "show results";
      
        let actionButton = document.createElement('a');
        
        actionButton.innerHTML = 'add exam';
      
      
        actionButton.href ="createexam.html";
        actionButton.onclick = function createExam(){
            sessionStorage.setItem('subject_id',exams[i]['_id']);
            actionButton.href='createexam.html';

        }
        showResults.onclick = function get_grades(){
          sessionStorage.setItem('subject_id',exams[i]['_id']);
          actionButton.href='gradesForProfessor.html';

      }
        //actionButton.onclick = takeExam();
        // idExams.push(examId);
        td4.appendChild(actionButton);
        td5.appendChild(showResults);

        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        table.appendChild(tr);
    }
      console.log(exams);
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
  
    })

   
    