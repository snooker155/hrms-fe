export default function createDepartmentsArray(employees, projects) {
  let departments = new Set();
  for (let i = 0; i < employees.length; i++) {
    departments.add(employees[i].department.title);
  }

  departments = [ ...departments ];
  for (let i = 0; i < departments.length; i++) {
    departments[i] = {
      title: departments[i],
      link: `/departments/${ departments[i].title }`
    };
    departments[i].employees = [ ...employees.filter(employee => employee.department.title === departments[i].title) ];
    departments[i].projects = [ ...projects.filter(project => project.department.title === departments[i].title) ];
  }

  return departments;
}
