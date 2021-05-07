console.log("working js");

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
let in_education;
let current_degrees;
let days_left_in_education;
let currently_doing_course;
let feespermonth;
let givespermonth;

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

// jobs
let jobs;
let job_salary;
let job_requirments;
// Date
let startdate;
let dob
let current_age;
let day = 60 * 60 * 24 * 1000;
let date;
let match;
let localstorage1 = localStorage.getItem("localstorage");

// user local storage check #####

if (localstorage1 != null) {
  console.log("local check");
try {
  start.style.display = "none";
  
} catch (error) {
  
}

  PlayerName = localStorage.getItem("PlayerName");
  current_cash = parseInt(localStorage.getItem("current_cash"));
  per_month_income = parseInt(localStorage.getItem("per_month_income"));
  per_month_expenses = parseInt(localStorage.getItem("per_month_expenses"));
  in_education = parseInt(localStorage.getItem("in_education"));
  per_month_expenses = parseInt(localStorage.getItem("per_month_expenses"));
  startdate = new Date(localStorage.getItem("startdate"));
  current_degrees = JSON.parse(localStorage.getItem("current_degrees"));
  dob = new Date(localStorage.getItem("dob"));
 
  gameloop();
} else {
  StartNewLife();
}
console.log("startdate");
// fetching courses.json


// navbar links active state

// Functions ##############
function StartNewLife() {
  start.style.display = "block";
  let payername = document.getElementById("payernameinput").value;
  localStorage.clear();
  PlayerName = payername;
  current_cash = 0;
  per_month_income = 100;
  per_month_expenses = 0;
  full_time_job = false;
  full_time_study = false;
  doing_job = false;
  current_job = "";
  in_education = false;
  current_degrees = [];
  days_left_in_education = 0;
  currently_doing_course = "";
  feespermonth = 0;
  givespermonth = 0;
  jobs = [];
  job_salary = [];
  job_requirments = [];
  startdate = new Date();
  dob = new Date();
  current_age = 16;
  day = 60 * 60 * 24 * 1000;
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
  localStorage.setItem("current_degrees", JSON.stringify(current_degrees));
  localStorage.setItem("days_left_in_education", days_left_in_education);
  localStorage.setItem("feespermonth", feespermonth);
  localStorage.setItem("startdate", startdate);
  localStorage.setItem("dob", dob);
  localStorage.setItem("doing_job", doing_job);
  localStorage.setItem("current_job", current_job);
  localStorage.setItem("in_education", in_education);
}

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

    setlocalvariables();
    try {
      playername_el.innerHTML = `${PlayerName}`;
    } catch (error) {}
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
    try {
      day_left_education.innerHTML = `<div>${days_left_in_education} Days Remaining </br> <p class="text-white-50">Current Course: ${currently_doing_course}</p></div>`;
      
    } catch (error) {
      
    }
  }, 1000);
}

