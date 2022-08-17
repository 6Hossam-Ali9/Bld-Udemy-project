let all_courses = {};
let current_courses = {};
let used_course = "python";
let filter_text = "";
let window_size = window.innerWidth;

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

  let carousel_inner = document.querySelector(".carousel-inner");
  carousel_inner.innerHTML = "";

  let courses_num = 5;
  let col = 2;

  filterd_courses.forEach((course, i) => {
    let instructors = "";
    course.instructors.forEach((instructor) => {
      instructors += `${instructor.name}, `;
    });

    if (window.innerWidth < 920 && window.innerWidth >= 700) {
      courses_num = 3;
      col = 4;
    } else if (window.innerWidth < 700) {
      courses_num = 1;
      col = 11;
    }
    if (i % courses_num == 0) {
      carousel_inner.innerHTML += `
      <div class="carousel-item ${!i && "active"}" id="item-${Math.floor(
        i / courses_num
      )}">
          <div class="container-fluid">
            <div class="row">
            </div>
          </div>
        </div>
      `;
    }
    let my_id = `item-${Math.floor(i / courses_num)}`;
    let carousel_item = document.querySelector(`#${my_id} .row`);
    carousel_item.innerHTML += `
    <div class="col-${col} course-cont ${col == 11 && "mx-auto pr-0"} mt-5">
      <a href="">
        <img src="${course.image}" alt="${course_name} img" />
        <h3>${course.title}</h3>
        <p class="instructor">${instructors.trim().slice(0, -1)}</p>
        <h3>E£${course.price}</h3>
      </a>
    </div>
              `;
  });
};

let categories = document.querySelector(".categories");
let categories_type = [
  "Design",
  "Development",
  "Marketing",
  "IT and Software",
  "Personal Development",
  "Business",
  "Photography",
  "Music",
];
categories_type.forEach((category, idx) => {
  categories.children[1].innerHTML += `
      <div class="col-12 col-md-4 col-lg-3 py-2 mb-3">
      <a href="">
        <img src="./icons/img-${idx + 1}.jpg" alt="category-${idx + 1}"/>
      </a>
      <h3 class="cat-font">${category}</h3>
      </div>
  `;
});

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

window.addEventListener("resize", () => {
  if (
    (window_size >= 920 && window.innerWidth < 920) ||
    (window_size < 920 && window.innerWidth >= 920) ||
    (window_size >= 700 && window.innerWidth < 700) ||
    (window_size < 700 && window.innerWidth >= 700)
  ) {
    window_size = window.innerWidth;
    applyCourse();
  }
});
