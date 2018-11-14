export default function formatSkillsData(skills, projects) {
  for (let i = 0; i < skills.length; i++) {
    skills[i].link = encodeURI(`/skills/${ skills[i].title }`);
    skills[i].popularity = 0;
    for (let j = 0; j < projects.length; j++) {
      skills[i].popularity +=projects[j].technologies.some(technology => technology.title === skills[i].title) ? 1 : 0;
    }
  }
}
