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

    const manager = employees.find((employee) => employee.id === employees[i].manager);
    if (manager) {
      employees[i].manager = {
        id: employees[i].manager,
        name: manager.name,
        surname: manager.surname,
        link: manager.link || manager
      };
    } else {
      employees[i].manager = { id: 0 };

      employees[i].subordinates = [ ];
      for (let j = 0; j < employees.length; j++) {
        const managerId = employees[j].manager.id || employees[j].manager;
        if (managerId === employees[i].id) {
          employees[i].subordinates.push(Object.assign(employees[j]));
        }
      }
    }

    employees[i].skills = employees[i].skills.map(skill => ({ ...skill, link: encodeURI(`/skills/${ skill.title }`)}));
  }
}
