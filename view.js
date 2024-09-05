
async function fetchYamlResume(url){
    try {
        const response = await fetch(url, {method: "GET"})
        // console.log(response);

        const resumeJson = await response.text().then(jsyaml.load); // Convert YAML to JSON
        
        // console.log(resumeJson);
        return(resumeJson);
     } catch (error) {
            console.error("Error loading YAML file", error);
        }
        
};

async function renderResume(data){
    // Profile section 
    // document.getElementById('avatar').src = data.sidebar.avatar;
    document.getElementById('name').innerText = data.sidebar.name;
    document.getElementById('tagline').innerText = data.sidebar.tagline;

    // Education - Populating DOM by iterating over array
    let educationHTML = '';
    for (let i=0; i < data.education.info.length; i++){
      let school = data.education.info[i];
      let detailsMd = marked.parse(school.details);

      educationHTML += `
        <div class="item">
          <h4 class="degree">${school.degree}</h4>
          <h5 class="meta">${school.university}</h5>
          <div class="timeeducation">${school.time}</div>
          <div class="details">${detailsMd}</div>
        </div>`;
      }
    document.getElementById('education-section').innerHTML = educationHTML;
    
    // Experience - Populating DOM by using array.forEach
    let experiencesHTML = '';
    data.experiences.info.forEach(experience => {
      let detailsMd = marked.parse(experience.details);
      experiencesHTML += `
        <div class="item">
          <div class="meta">
            <div class="upper-row">
              <h3 class="job-title">${experience.role}</h3>
              <div class="time">${experience.time}</div>
            </div>
            <div class="company">${experience.company}</div>
          </div>
          <div class="details"> ${detailsMd}</div>
        </div>`;
    });
    document.getElementById('experiences').innerHTML = experiencesHTML;

    // Skills - Populating DOM by using array.map 
    let skillsHTML = data.skills.toolset.map (skill => `
        <div class="item">
          <h3 class="level-title">${skill.name}</h3>
          <div class="level-bar">
            <div class="level-bar-inner" style="width: ${skill.level}%"></div>
          </div>
        </div>`).join(''); //.join() joins the the html together without seperators ∴ no commas
    document.getElementById('skills-section').innerHTML = skillsHTML;        
};

async function renderPage(){
      const ready = await fetchYamlResume(`https://raw.githubusercontent.com/iterating/cv-tech/main/_data/data.yml`)
      renderResume(ready);
};

renderPage(); 

