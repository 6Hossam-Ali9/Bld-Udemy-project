let all_courses = {};
let current_courses = {};
let used_course = "python";
let filter_text = "";

fetch("http://localhost:3000/body")
  .then((res) => res.json())
  .then((data) => {
    all_courses = data;
    applyCourse();
  })
  .catch((err) => console.log(err));

let filterCourses = () => {
  let filterd_courses = [];
  filter_text = input_filter.value;
  current_courses.courses.forEach((course) => {
    if (course.title.toLowerCase().includes(filter_text.toLocaleLowerCase())) {
      filterd_courses.push(course);
    }
  });

  return filterd_courses;
};

let applyCourse = () => {
  current_courses = all_courses[used_course];

  let filterd_courses = filterCourses();
  let course_name = current_courses.title.slice(15);
  let courses_box = document.querySelector(".courses-box");
  courses_box.children[0].textContent = current_courses["header"];
  courses_box.children[1].textContent = current_courses["description"];
  courses_box.children[2].textContent = `Explore ${course_name}`;
  courses_box.children[3].innerHTML = "";
  filterd_courses.forEach((course) => {
    let instructors = "";
    course.instructors.forEach((instructor) => {
      instructors += `${instructor.name}, `;
    });
    courses_box.children[3].innerHTML += `<li class="course-cont">
                <a href="#">
                  <img src="${course.image}" alt="course 1 img" />
                  <h3>${course.title}</h3>
                  <p class="instructor">${instructors.trim().slice(0, -1)}</p>
                  <h3>E£${course.price}</h3>
                </a>
              </li>`;
  });
};

let onChangeCourse = (event) => {
  input_filter.value = "";
  course = event.target;
  if (course != active_course) {
    active_course.classList.toggle("active-course");
    course.classList.toggle("active-course");
    active_course = course;

    let course_name = course.textContent.trim().split(" ")[0].toLowerCase();
    used_course = course_name;
    applyCourse();
  }
};

let active_course = document.querySelector(".active-course");
let tab_element = document.querySelector(".courses-nav").children;

for (let event of tab_element) {
  event.addEventListener("click", onChangeCourse);
}

let input_filter = document.querySelector("input");

input_filter.addEventListener("keyup", (e) => {
  filter_text = e.target.value;
  applyCourse();
});
