export default function formatEmployeesData(employees, projects) {
  for (let i = 0; i < employees.length; i++) {
    employees[i].gender = (employees[i].gender === 'male') ? 'men' : 'women';
    employees[i].department = { title: employees[i].department, link: encodeURI(`/departments/${ employees[i].department }`) };
    employees[i].link = encodeURI(`/employees/${ employees[i].id }`);
    employees[i].projects = employees[i].projects.map(id => {
      for (let i = 0; i < projects.length; i++) {
        if (id === projects[i].id) {
          return { id: projects[i].id, title: projects[i].title, link: encodeURI(`/projects/${ projects[i].id }`) };
        }
      }
    });
    employees[i].skills = employees[i].skills.map(skill => ({ title: skill.title, link: encodeURI(`/skills/${ skill.title }`)}));
  }
}
