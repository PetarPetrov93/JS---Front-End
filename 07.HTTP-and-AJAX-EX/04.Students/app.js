async function attachEvents() {
  
  const baseURL = 'http://localhost:3030/jsonstore/collections/students';

  const tableBody = document.querySelector("tbody");

  const firstNameInputField = document.querySelector(`input[name="firstName"`);
  const lastNameInputField = document.querySelector(`input[name="lastName"`);
  const facultyNumberInputField = document.querySelector(`input[name="facultyNumber"`);
  const gradeInputField = document.querySelector(`input[name="grade"`);

  const submitBtn = document.getElementById("submit");

  const getAllStudents = await fetch(baseURL);
      const allStudents = await getAllStudents.json();

      const students = Object.values(allStudents);

      for (const currStudent of students) {

        const tr = document.createElement("tr");

      const tdFirstName = document.createElement("td");
      tdFirstName.textContent = currStudent.firstName;
      const tdLastName = document.createElement("td");
      tdLastName.textContent = currStudent.lastName;
      const tdFacultyNumber = document.createElement("td");
      tdFacultyNumber.textContent = currStudent.facultyNumber;
      const tdGrade = document.createElement("td");
      tdGrade.textContent = currStudent.grade;

      tr.appendChild(tdFirstName);
      tr.appendChild(tdLastName);
      tr.appendChild(tdFacultyNumber);
      tr.appendChild(tdGrade);

      tableBody.appendChild(tr);
        
      }

  submitBtn.addEventListener("click", async () =>{

    const isValidInput = firstNameInputField.value !== "" && lastNameInputField.value !== "" && facultyNumberInputField.value !== "" && gradeInputField.value !== "";

    if (isValidInput) {
      
      const student = {
        firstName: firstNameInputField.value,
        lastName: lastNameInputField.value,
        facultyNumber: facultyNumberInputField.value,
        grade: gradeInputField.value,
      };

      await fetch(baseURL,{
        method: 'POST',
        body: JSON.stringify(student)
      });

      const tr = document.createElement("tr");

      const tdFirstName = document.createElement("td");
      tdFirstName.textContent = student.firstName;
      const tdLastName = document.createElement("td");
      tdLastName.textContent = student.lastName;
      const tdFacultyNumber = document.createElement("td");
      tdFacultyNumber.textContent = student.facultyNumber;
      const tdGrade = document.createElement("td");
      tdGrade.textContent = student.grade;

      tr.appendChild(tdFirstName);
      tr.appendChild(tdLastName);
      tr.appendChild(tdFacultyNumber);
      tr.appendChild(tdGrade);

      tableBody.appendChild(tr);

      firstNameInputField.value = "";
      lastNameInputField.value = "";
      facultyNumberInputField.value = "";
      gradeInputField.value = "";

    }

  });
}

attachEvents();