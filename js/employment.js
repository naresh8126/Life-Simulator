const elj = document.getElementById("elj");
const mlj = document.getElementById("mlj");
const llj = document.getElementById("llj");
const hlj = document.getElementById("hlj");
const tlj = document.getElementById("tlj");
const sj = document.getElementById("sj");
const clj = document.getElementById("clj");
const Employment_Status_el = document.getElementById("Employment_Status");
const Current_Salary_el = document.getElementById("Current_Salary");

Employment_Status_el.innerHTML = `${current_job}`;
Current_Salary_el.innerHTML = `$${current_job_salary} / Month`;

fetch("./js/jobs.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    json_jobs = data;
    addCourse(json_jobs["Entry Level Jobs"], elj);
    addCourse(json_jobs["Low Level Jobs"], llj);
    addCourse(json_jobs["MId Level Jobs"], mlj);
    addCourse(json_jobs["High Level Jobs"], hlj);
    addCourse(json_jobs["Top Level Jobs"], tlj);
    addCourse(json_jobs["Special Jobs"], sj);
    addCourse(json_jobs["Criminal Level Jobs"], clj);
  });

function addCourse(job, job_el) {
  job.forEach((element) => {
    childnode = document.createElement("li");
    childnode.innerHTML = `${element.Name} - ${element.Salary} / month`;
    childnode.classList.add("btn1");
    childnode.addEventListener("click", () => {
      if (!doing_job) {
        if (element.Requirements === "") {
          if (element.Degree === "") {
            dojob(element)
          } else {
            if (current_degrees.includes(element.Degree)) {
              dojob(element)
            } else {
              msg(`This job requirements is ${element.Degree}`);
            }
          }
        } else {
          if (element.Degree === "") {
            if (resume_includes(element.Requirements)) {
              dojob(element)
            } else {
              msg(`This job requirements is ${element.Experience} month experience of ${element.Requirements}`);
            }
          } else {
            if (current_degrees.includes(element.Degree)) {
              if (resume_includes(element.Requirements)) {
                dojob(element)
              } else {
                msg(`This job requirements is ${element.Requirements} experience and ${element.Degree} degree`);
              }
            } else {
              msg(`This job requirements is ${element.Experience} month experience of ${element.Requirements} and ${element.Degree}`);
            }
          }
        }
      } else {
        msg(`You already doing ${current_job} job`);
      }
    });

    job_el.appendChild(childnode);
  });
  function dojob(element){
    doing_job = true;
    current_job = element.Name;
    current_job_salary = element.Salary;
    per_month_income += element.Salary;
    msg(`You are now doing ${element.Name} job`);
    Current_Salary_el.innerHTML = `$${current_job_salary} / Month`;
    current_job = element.Name;
    Employment_Status_el.innerHTML = `${current_job}`;
    let ename = element.Name
    
    if (!resume_includes(current_job)) {
      resume.push([ename,0])
    }
      
    
  }
}

function check_exp(name_of_job,exp){
  let i
  resume.forEach(e => {
    if (e[0] == name_of_job) {
      i = resume.indexOf(e)
      console.log(e)
    }
  });
  console.log(i)
    if (resume[i][1] >= Number(exp)) {
      return true
    }else{
      return false
    }
    

}

function resume_includes(element){
  let i = 0 
  resume.forEach(e => {
    if (e[0] == element) {
      i+=1
    }
  });
  if (i==1) {
    return true
  }else{
    return false
  }
}

function quit_job() {
  if (doing_job) {
    msg(`You quited ${current_job} job`);
    doing_job = false;
    current_job = "none";
    per_month_income -= current_job_salary;
    current_job_salary = 0;
    Current_Salary_el.innerHTML = `$${current_job_salary} / Month`;
    Employment_Status_el.innerHTML = `${current_job}`;
  } else {
    msg(`You are not doing a job`);
  }
}
