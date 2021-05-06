// elements and variables
let body = document.getElementsByTagName("body");
let main = document.querySelector(".main");
let current = "";
let navlinks = document.getElementsByClassName("navlinks");
let gamedate = document.getElementById("gamedate");
let income = document.getElementById("income");
let cash = document.getElementById("cash");
let age_el = document.getElementById("age");
let jobs_list = document.getElementById("jobs_list");
let Appernticeship = document.getElementById("Appernticeship");
let College_Courses = document.getElementById("College_Courses");
let University_Courses = document.getElementById("University_Courses");
let Masters_Degree_Courses = document.getElementById("Masters_Degree_Courses");
let Doctorate_Courses = document.getElementById("Doctorate_Courses");
let Specialist_Courses = document.getElementById("Specialist_Courses");
let day_left_education = document.getElementById("day_left_education");
let qualifications_el = document.getElementById("qualifications");
let playername_el = document.getElementById("playername");
let childnode = document.createElement("li");
let start = document.getElementById("newlife");
// cash
let PlayerName;
let current_cash;
let per_month_income;
let per_month_expenses;
// what doing currently
let full_time_job;
let full_time_study;
let doing_job;
let current_job;
// education
let in_education;
let current_degrees;
let days_left_in_education;
let currently_doing_course;
let feespermonth;
let givespermonth;
// jobs
let jobs;
let job_salary;
let job_requirments;
// Date
let startdate;
let dob = startdate;
let current_age;
let day = 60 * 60 * 24 * 1000;
let date;
let match;


// user local storage check
let localstorage1 = localStorage.getItem("localstorage");
if (localstorage1 != null) {
  start.style.display = "none";
}

function StartNewLife() {
  localStorage.clear();
  let payername = document.getElementById("payernameinput").value;
  PlayerName = payername;
  start.style.display = "none";
  // cash
  current_cash = 0;
  per_month_income = 100;
  per_month_expenses = 0;

  // what doing currently
  full_time_job = false;
  full_time_study = false;
  doing_job = false;
  current_job = "";

  // education
  in_education = false;
  current_degrees = [];
  days_left_in_education = 0;
  currently_doing_course = "";
  feespermonth = 0;
  givespermonth = 0;

  // jobs
  jobs = [];
  job_salary = [];
  job_requirments = [];

  // Date
  startdate = new Date();
  dob = startdate;
  current_age = 16;
  day = 60 * 60 * 24 * 1000;
  // let month = 60 * 60 * 24 * 1000;
  date;
  match = 0;
  setlocalvariables();
  localstorage1 = true;
  gameloop();
}

function setlocalvariables() {
  localStorage.setItem("localstorage", localstorage1);
  localStorage.setItem("PlayerName", PlayerName);
  localStorage.setItem("current_cash", current_cash);
  localStorage.setItem("per_month_income", per_month_income);
  localStorage.setItem("per_month_expenses", per_month_expenses);
  localStorage.setItem("current_degrees", current_degrees);
  localStorage.setItem("days_left_in_education", days_left_in_education);
  localStorage.setItem("feespermonth", feespermonth);
  localStorage.setItem("startdate", startdate);
  localStorage.setItem("dob", dob);
  localStorage.setItem("doing_job", doing_job);
  localStorage.setItem("current_job", current_job);
  localStorage.setItem("in_education", in_education);
  localStorage.setItem("dob", dob);
}
window.addEventListener("load", () => {
  PlayerName = localStorage.getItem("PlayerName");
  current_cash = JSON.parse(localStorage.getItem("current_cash"));

  current_degrees = JSON.parse(localStorage.getItem("current_degrees"));

  per_month_income = localStorage.getItem("per_month_income");
  per_month_expenses = localStorage.getItem("per_month_expenses");
  startdate = new Date(localStorage.getItem("startdate"));
  console.log(startdate);
  per_month_income = localStorage.getItem("per_month_income");
  gameloop();
});

fetch("./js/courses.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    json_courses = data;
    addCourse(json_courses["Apprentices"], Appernticeship, true);
    addCourse(json_courses["College Courses"], College_Courses, false);
    addCourse(json_courses["University Courses"], University_Courses, false);
    addCourse(
      json_courses["Masters Degree Courses"],
      Masters_Degree_Courses,
      false
    );
    addCourse(json_courses["Doctorate Courses"], Doctorate_Courses, false);
    addCourse(json_courses["Specialist Courses"], Specialist_Courses, false);
  });
function addCourse(course, course_el, fulltime) {
  course.forEach((element) => {
    childnode = document.createElement("li");
    childnode.innerHTML = `${element.name}`;
    childnode.classList.add("btn1");

    childnode.addEventListener("click", () => {
      if (!in_education && !current_degrees.includes(element.name)) {
        if (element.requirements === "") {
          full_time_study = fulltime;
          if (element.feespermonth != 0) {
            if (per_month_income >= element.feespermonth) {
              per_month_expenses += element.feespermonth;
              feespermonth = element.feespermonth;
              in_education = true;
              currently_doing_course = element.name;
              days_left_in_education = (element.duration / 6) * 182;
            } else {
              console.log("Per month income does not enough");
            }
          }

          if (element.givespermonth != 0) {
            per_month_income += element.givespermonth;
            givespermonth = element.givespermonth;
            in_education = true;
            currently_doing_course = element.name;
            days_left_in_education = (element.duration / 6) * 182;
          }

          if (element.onetimefees != 0) {
            if (current_cash >= element.onetimefees) {
              current_cash -= element.onetimefees;
              in_education = true;
              s;
              currently_doing_course = element.name;
              days_left_in_education = (element.duration / 6) * 182;
            } else {
              console.log("You dont have enough cash");
            }
          }
        } else if (current_degrees.includes(element.requirements)) {
          if (element.feespermonth != 0) {
            if (per_month_income >= element.feespermonth) {
              per_month_expenses += element.feespermonth;
              feespermonth = element.feespermonth;
              in_education = true;
              currently_doing_course = element.name;
              days_left_in_education = (element.duration / 6) * 182;
            } else {
              console.log("Per month income does not enough");
            }
          }

          if (element.givespermonth != 0) {
            per_month_income += element.givespermonth;
            givespermonth = element.givespermonth;
            in_education = true;
            currently_doing_course = element.name;
            days_left_in_education = (element.duration / 6) * 182;
          }

          if (element.onetimefees != 0) {
            if (current_cash >= element.onetimefees) {
              current_cash -= element.onetimefees;
              in_education = true;
              s;
              currently_doing_course = element.name;
              days_left_in_education = (element.duration / 6) * 182;
            } else {
              console.log("You dont have enough cash");
            }
          }
        } else {
          console.log(
            "course requirements did not match " +
              current_degrees +
              element.requirements
          );
        }
      } else {
        console.log("you are  already in education");
      }
    });

    course_el.appendChild(childnode);
  });
}
function quit_course() {
  if (in_education) {
    in_education = false;
    days_left_in_education = 0;
    currently_doing_course = "";
    per_month_expenses -= feespermonth;
    per_month_income -= givespermonth;
    feespermonth = 0;
    givespermonth = 0;
  }
}

Array.from(navlinks).forEach((element) => {
  element.addEventListener("click", () => {
    current = document.querySelector(".active");
    current.classList.remove("active");
    element.classList.add("active");
  });
});

function setdate() {
  date = new Date(startdate.getTime() + day);
  gamedate.innerText = `${startdate.getDate()} / ${
    startdate.getMonth() + 1
  } / ${startdate.getFullYear()}`;
  startdate = date;
}

function setcash() {
  try {
    income.innerHTML = `${per_month_income}/Month`;
    if (startdate.getDate() === 1) {
      current_cash += per_month_income - per_month_expenses;
    }
    cash.innerHTML = current_cash;
  } catch (error) {
    if (startdate.getDate() === 1) {
      current_cash += per_month_income - per_month_expenses;
    }
    cash.innerHTML = current_cash;
  }
}
function gameloop() {
  setInterval(() => {
    setdate();
    setcash();
    if (localstorage1) {
      setlocalvariables();
    }
    playername_el.innerHTML = `${PlayerName}`;
    if (qualifications_el != null) {
      let innerd = "";
      current_degrees.forEach((element) => {
        innerd = ` ${innerd} ${element} </br>`;
      });
      qualifications_el.innerHTML = `${innerd}`;
    }
    current_age = startdate.getFullYear() - dob.getFullYear() + 16;
    if (age_el != null) {
      age_el.innerHTML = `Age: ${current_age}`;
    }

    if (in_education) {
      days_left_in_education -= 1;
      if (days_left_in_education === 0) {
        in_education = false;

        per_month_expenses -= feespermonth;
        per_month_income -= givespermonth;
        current_degrees = current_degrees.concat([currently_doing_course]);
        currently_doing_course = "";
        feespermonth = 0;
        givespermonth = 0;
      }
    }
    day_left_education.innerHTML = `<div>${days_left_in_education} Days Remaining </br> <p class="text-white-50">Current Course: ${currently_doing_course}</p></div>`;
  }, 1000);
}

class job {
  constructor(job_name, job_salary, job_requirments) {
    this.name = job_name;
    this.salary = job_salary;
    this.requirments = job_requirments;
  }
  do() {
    match = 0;
    degrees.forEach((element) => {
      if (element === this.requirments) {
        match += 1;
      }
    });
    if (!doing_job) {
      if (match === 1) {
        doing_job = true;
        current_job = this.name;
        per_month_income += this.salary;
      } else {
        console.log("dont have an degree");
      }
    } else {
      console.log("already doing a job");
    }
  }
  quit() {
    if (doing_job) {
      doing_job = false;
      current_job = "";
      per_month_income -= this.salary;
    } else {
      console.log("you are not doing any job");
    }
  }
}

for (let index = 0; index < jobs.length; index++) {
  jobs[index] = new job(jobs[index], job_salary[index], job_requirments[index]);
  // console.log(jobs[index])
}
