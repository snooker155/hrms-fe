export default function formatProjectsData(projects, employees) {
  for (let i = 0; i < projects.length; i++) {
    projects[i].link = encodeURI(`/projects/${ projects[i].id }`);
    projects[i].department = { title: projects[i].department, link: encodeURI(`/departments/${ projects[i].department }`)}
    projects[i].employees = [ ];
    for (let j = 0; j < projects[i].technologies.length; j++) {
      projects[i].technologies[j] = {
        ...projects[i].technologies[j],
        link: encodeURI(`/skills/${ projects[i].technologies[j].title }`)
      }
    }

    for (let j = 0; j < employees.length; j++) {
      if (employees[j].projects.some(project => project.id === projects[i].id)) {
        projects[i].employees.push({
          id: employees[j].id,
          link: employees[j].link,
          gender: employees[j].gender
        });

        if (projects[i].manager === employees[j].id) {
          projects[i].manager = {
            id: employees[j].id,
            link: employees[j].link,
            name: employees[j].name,
            surname: employees[j].surname,
            gender: employees[j].gender
          }
        }
      }
    }
  }
}
