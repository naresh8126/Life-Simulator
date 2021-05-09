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
    addjob(json_jobs["Entry Level Jobs"], elj);
    addjob(json_jobs["Low Level Jobs"], llj);
    addjob(json_jobs["MId Level Jobs"], mlj);
    addjob(json_jobs["High Level Jobs"], hlj);
    addjob(json_jobs["Top Level Jobs"], tlj);
    addjob(json_jobs["Special Jobs"], sj);
    addjob(json_jobs["Criminal Level Jobs"], clj);
  });

function addjob(job, job_el) {
  job.forEach((element) => {
    childnode = document.createElement("li");
    childnode.innerHTML = `${element.Name} - ${element.Salary} / month`;
    childnode.classList.add("btn1");
    childnode.addEventListener("click", () => {
      if (full_time_study) {
        msg(`you are doing full time study cant't do a job`);
      } else {
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
                if (get_exp(element.Requirements) >= element.Experience) {
                  dojob(element)
                  
                } else {
                  msg(`This job require ${element.Experience} months Experience of ${element.Requirements} and you have ${get_exp(element.Requirements)} months Experience`);
                }
              } else {
                msg(`This job requirements is ${element.Experience} month experience of ${element.Requirements}`);
              }
            } else {
              if (current_degrees.includes(element.Degree)) {
                if (resume_includes(element.Requirements)) {
                  if (get_exp(element.Requirements) >= element.Experience) {
                    dojob(element)
                    
                  } else {
                    msg(`This job require ${element.Experience} of ${element.Requirements} and you have ${get_exp(element.Requirements)}`);
                  }
                } else {
                  msg(`This job requirements is ${element.Requirements} experience and ${element.Degree} degree`);
                }
              } else {
                msg(`This job requirements is ${element.Experience} month experience of ${element.Requirements} and ${element.Degree}`);
              }
            }
          }
        } else {
          msg(`You are already doing a ${current_job} job`);
        }
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

function get_exp(name_of_job){
  let i
  resume.forEach(e => {
    if (e[0] == name_of_job) {
      i = resume.indexOf(e)
    }
  });
  try {
    return resume[i][1]
  } catch (error) {
    return 0
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
