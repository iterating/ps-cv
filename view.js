
async function fetchYamlResume(url){
    try {
        const response = await fetch(url)
        const resumeJson = await response.text().then(jsyaml.load); // Convert YAML to JSON
        console.log(resumeJson);
        return(resumeJson);
     } catch (error) {
            console.error("Error loading YAML file", error);
        }
        
    }
 async function renderResume(data){
        // Profile section 
        // document.getElementById('avatar').src = data.sidebar.avatar;
        document.getElementById('name').innerText = data.sidebar.name;
        document.getElementById('tagline').innerText = data.sidebar.tagline;

        // Education
        let educationHTML = '';
        data.education.info.forEach(school => {
          educationHTML += `
            <div class="item">
              <h4 class="degree">${school.degree}</h4>
              <h5 class="meta">${school.university}</h5>
              <div class="timeeducation">${school.time}</div>
              <div class="details">${school.details}</div>
            </div>`;
        });
        document.getElementById('education-section').innerHTML = educationHTML;
        
        // Experience 
        let experiencesHTML = '';
        data.experiences.info.forEach(experience => {
          experiencesHTML += `
            <div class="item">
              <div class="meta">
                <div class="upper-row">
                  <h3 class="job-title">${experience.role}</h3>
                  <div class="time">${experience.time}</div>
                </div>
                <div class="company">${experience.company}</div>
              </div>
              <div class="details"> ${experience.details}</div>
            </div>`;
        });
        document.getElementById('experiences').innerHTML = experiencesHTML;

        // Skills
        let skillsHTML = '';
        data.skills.toolset.forEach(skill => {
          skillsHTML += `
            <div class="item">
              <h3 class="level-title">${skill.name}</h3>
              <div class="level-bar">
                <div class="level-bar-inner" style="width: ${skill.level}%"></div>
              </div>
            </div>`;
        });
        document.getElementById('skills-section').innerHTML = skillsHTML;        
      }
     
async function renderPage(){
      const ready = await fetchYamlResume(`resume.yml`)
      renderResume(ready);
    };
renderPage(); 
