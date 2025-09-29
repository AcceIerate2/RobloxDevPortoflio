type projectData = {
    Id: string,
    PlaceId: string,
    Description: string,
    Tags: [string],
    Dates: {
        Start: string,
        End: string
    },
    IsGame: boolean,
    GameLink: string,
    GithubLink: string,
    Content: {"Main": [string?, string?], "Extras": [string?, string?, string?]}
}

import elements from "./elements.js";
import data from "./elements.js";
const buttons = data._buttons

for (const [_key, element] of Object.entries(buttons) as [string, HTMLButtonElement][]) {
    const action = element.dataset.btnType

    if (action == null) {
        console.log(`Could not get btnType [data and supposed to return a string] from ${_key}`)
        continue
    }
    
    element.addEventListener("click", async() => {
        try {
            const module = await import(`./actions/${action}.js`)
            if (module.default) {
                module.default(element)
            }
        } catch(errorMessage) {
            console.log(`Action file for ${action} not found.`, errorMessage)
        }
    })
}
 
// loads all the work yay
const load_Project_Card = elements.load_Project_Card 
const rawWorkData = await fetch("./myWork.json")
const workData = await rawWorkData.json()

for (const [skillType, work] of Object.entries(workData) as [string, Object][]) {   
    const container = document.getElementById(skillType) as HTMLDivElement
    const workHolder = container?.querySelector(".workHolder") as HTMLDivElement
    const projectTemplate = workHolder?.querySelector(skillType)
    for (const [projectName, projectData] of Object.entries(work) as [string, projectData][]) {
        load_Project_Card(
            workHolder,
            projectName, 
            projectData.Id, 
            projectData.PlaceId,
            projectData.Description, 
            projectData.Tags, 
            projectData.IsGame, 
            projectData.GameLink, 
            projectData.GithubLink, 
            projectData.Dates,
            projectData.Content
        )
    }
}