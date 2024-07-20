
const baseURL = `http://localhost:3030/jsonstore/tasks/`;

const courseTitleInput = document.querySelector("#course-name");
const courseTypeInput = document.querySelector("#course-type");
const courseDescriptionInput = document.querySelector("#description");
const courseTeacherInput = document.querySelector("#teacher-name");

const form = document.querySelector("#form form");

const listOfCourses = document.querySelector("#list");

const addBtn = document.querySelector("#add-course"); // prevent default
addBtn.addEventListener("click", addCourse);

const editBtnForm = document.querySelector("#edit-course"); // prevent default
editBtnForm.addEventListener("click", editCourse);

const loadBtn = document.querySelector("#load-course");
loadBtn.addEventListener("click", loadCourses);

function loadCourses(){

    fetch(baseURL)
    .then(res => res.json())
    .then (result => renderCourses(Object.values(result)));
}

function renderCourses(courses){

    listOfCourses.innerHTML = "";

    for (const course of courses) {
        
        listOfCourses.appendChild(renderCourse(course));
    }
}

function renderCourse(course){
    const title = course.title;
    const teacher = course.teacher;
    const type = course.type;
    const description = course.description;
    

    const container = document.createElement("div");
    container.classList.add("container");

    const h2 = document.createElement("h2");
    h2.textContent = title;


    const h3Teacher = document.createElement("h3");
    h3Teacher.textContent = teacher;

    const h3Type = document.createElement("h3");
    h3Type.textContent = type;

    const h4 = document.createElement("h4");
    h4.textContent = description;

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit Course";
    editBtn.addEventListener("click", () =>{

        courseTitleInput.value = title;
        courseTypeInput.value = type;
        courseDescriptionInput.value = description;
        courseTeacherInput.value = teacher;

        container.remove();

        editBtnForm.disabled = false;
        addBtn.disabled = true;

        form.dataset.courseId = course._id;
    });

    const finishBtn = document.createElement("button");
    finishBtn.classList.add("finish-btn");
    finishBtn.textContent = "Finish Course";
    finishBtn.addEventListener("click", () =>{

        fetch(`${baseURL}${course._id}`,{
            method: "DELETE"
        })
        .then(loadCourses);
    });

    container.appendChild(h2);
    container.appendChild(h3Teacher);
    container.appendChild(h3Type);
    container.appendChild(h4);
    container.appendChild(editBtn);
    container.appendChild(finishBtn);

    return container;
}

function clearInput(){

    courseTitleInput.value = "";
    courseTypeInput.value = "";
    courseDescriptionInput.value = "";
    courseTeacherInput.value = "";
}

function addCourse(e){
    e.preventDefault();

    const title = courseTitleInput.value;
    const teacher = courseTeacherInput.value;
    const type = courseTypeInput.value;
    const description = courseDescriptionInput.value;

    const isEmptyInput = title === "" || teacher === "" || type === "" || description === "";
    if (isEmptyInput) {
        return;
    }

    const newCourse = {
        title,
        teacher,
        type,
        description,
    };

    fetch(baseURL,{
        method: "POST",
        body: JSON.stringify(newCourse),
    })
    .then(loadCourses);

    clearInput();
}


function editCourse(e){
    e.preventDefault();

    const id = form.dataset.courseId;
    const title = courseTitleInput.value;
    const teacher = courseTeacherInput.value;
    const type = courseTypeInput.value;
    const description = courseDescriptionInput.value;
    
    const edditedCourse = {
        title,
        teacher,
        type,
        description,
        _id: id,
    };

    fetch(`${baseURL}${id}`,{
        method: "PUT",
        body: JSON.stringify(edditedCourse),
    })
    .then(loadCourses)
    .then(() => {

        addBtn.disabled = false;
        editBtnForm.disabled = true;
        
        clearInput();
        
        delete form.dataset.courseId;
    });
}

