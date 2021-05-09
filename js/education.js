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
    function do_course(element) {
      current_cash -= element.onetimefees;
      per_month_expenses += element.feespermonth;
      per_month_income += element.givespermonth;
      givespermonth = element.givespermonth;
      feespermonth = element.feespermonth;
      in_education = true;
      currently_doing_course = element.name;
      days_left_in_education = (element.duration / 6) * 182;
      msg(`You are applied for ${element.name}`);
    }
    childnode.addEventListener("click", () => {
      if (fulltime) {
        if (doing_job) {
          msg(`You can't do Apprentices when doing a job`);
        } else {
          if (!in_education && !current_degrees.includes(element.name)) {
            if (element.requirements === "") {
              full_time_study = fulltime;
              if (element.feespermonth != 0) {
                if (per_month_income >= element.feespermonth) {
                  do_course(element)
                } else {
                  msg(`Per month income does not enough`);
                }
              }

              if (element.givespermonth != 0) {
                do_course(element)
              }

              if (element.onetimefees != 0) {
                if (current_cash >= element.onetimefees) {
                  do_course(element)
                } else {
                  msg(`You dont have enough cash`);
                }
              }
            } else if (current_degrees.includes(element.requirements)) {
              if (element.feespermonth != 0) {
                if (per_month_income >= element.feespermonth) {
                  do_course(element)
                } else {
                  msg(`Per month income does not enough`);
                }
              }

              if (element.givespermonth != 0) {
                do_course(element)
              }

              if (element.onetimefees != 0) {
                if (current_cash >= element.onetimefees) {
                  do_course(element)
                } else {
                  msg(`You dont have enough cash`);
                }
              }
            } else {
              msg(`course requirements did not match ${element.requirements}`);
            }
          } else {
            msg(`you are  already in education`);
          }
        }
      } else {
        if (!in_education && !current_degrees.includes(element.name)) {
          if (element.requirements === "") {
            full_time_study = fulltime;
            if (element.feespermonth != 0) {
              if (per_month_income >= element.feespermonth) {
                do_course(element)
              } else {
                msg(`Per month income does not enough`);
              }
            }

            if (element.givespermonth != 0) {
              do_course(element)
            }

            if (element.onetimefees != 0) {
              if (current_cash >= element.onetimefees) {
                do_course(element)
              } else {
                msg(`You dont have enough cash`);
              }
            }
          } else if (current_degrees.includes(element.requirements)) {
            if (element.feespermonth != 0) {
              if (per_month_income >= element.feespermonth) {
                do_course(element)
              } else {
                msg(`Per month income does not enough`);
              }
            }

            if (element.givespermonth != 0) {
              do_course(element)
            }

            if (element.onetimefees != 0) {
              if (current_cash >= element.onetimefees) {
                do_course(element)
              } else {
                msg(`You dont have enough cash`);
              }
            }
          } else {
            msg(`course requirements did not match ${element.requirements}`);
          }
        } else {
          msg(`you are  already in education`);
        }
      }
    });

    course_el.appendChild(childnode);
  });
}
function quit_course() {
  if (in_education) {
    in_education = false;
    full_time_study = false;
    days_left_in_education = 0;
    msg(`You quited ${currently_doing_course}`);
    currently_doing_course = "";
    per_month_expenses -= feespermonth;
    per_month_income -= givespermonth;
    feespermonth = 0;
    givespermonth = 0;
  }
}
