
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
                msg(`Per month income does not enough`);
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
                msg(`You dont have enough cash`);
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
                msg(`Per month income does not enough`)
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
                
                msg(`You dont have enough cash`)
              }
            }
          } else {
            msg(`course requirements did not match ${element.requirements}`)
          }
        } else {
          
          msg(`you are  already in education`)
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