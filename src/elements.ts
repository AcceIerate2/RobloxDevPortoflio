import openNewTab from "./actions/openNewTab.js"
import request from "./utility/request.js"
import formatNumber from "./utility/formatNumber.js"

interface Buttons {
    playBtn: HTMLButtonElement,
    codingSection: HTMLButtonElement,
    buildSection: HTMLButtonElement
}

interface Containers {
    playMenu: HTMLDivElement
}

interface Text {
    menuSelectionHeader: HTMLParagraphElement
}

const _buttons: Buttons = {
    ["playBtn"] : document.getElementById("playBtn") as HTMLButtonElement,
    ["codingSection"] : document.getElementById("codingSection") as HTMLButtonElement,
    ["buildSection"] : document.getElementById("buildSection") as HTMLButtonElement,
}

const _containers: Containers = {
    ["playMenu"]: document.getElementById("playMenu") as HTMLDivElement
}

const _text: Text = {
  ["menuSelectionHeader"]: document.getElementById("modeSelectionText") as HTMLParagraphElement  
}

const template = document.querySelector<HTMLTemplateElement>(".projectTemplate")
async function load_Project_Card(
    container: HTMLDivElement,
    title: string, 
    universeId: string, 
    startPlaceId: string,
    description: string, 
    tags: Object, 
    isGame: boolean, 
    gameUrl: string, 
    githubUrl: string, 
    dates: {["Start"]: string, ["End"]: string},
    content: {["Main"]: [string?, string?], ["Extras"]: [string?, string?, string?]}
)
    {
    const projectCard = template?.content.cloneNode(true) as DocumentFragment

    // project title

    const titleElement = projectCard.querySelector(".projectName") as HTMLParagraphElement
    if (!titleElement) { return }
    titleElement.textContent = title

    // project description

    const descriptionElement = projectCard.querySelector(".projectDesc") as HTMLParagraphElement
    if (!descriptionElement) { return }
    descriptionElement.textContent = description
     
    // contribution tags
    const tagTemplate = projectCard.querySelector<HTMLTemplateElement>(".tagTemplate")
    const contribRoles = projectCard.querySelector<HTMLDivElement>(".contribRoles") as HTMLDivElement
    
    for (const [_index, tagName] of Object.entries(tags)) {
        const tagContainer = tagTemplate?.content.cloneNode(true) as DocumentFragment
        const tagSpawnElement = tagContainer.querySelector(".contribBadge") as HTMLSpanElement
        tagSpawnElement.textContent = tagName
        contribRoles.appendChild(tagContainer)
    } 

    // project start date and end date
    const startDate = dates.Start
    const completionDate = dates.End

    const dateParagraph = projectCard.querySelector<HTMLDivElement>(".projectDates") as HTMLDivElement
    dateParagraph.textContent = `${startDate} — ${completionDate}`

    // -- links --
    // github url
    const githubAnchor = projectCard.querySelector<HTMLAnchorElement>(".btn-github") as HTMLAnchorElement
    if (githubAnchor != null) {
        if (githubUrl == null) {
            githubAnchor.style.visibility = "hidden";
        } else {
            githubAnchor.href = githubUrl ?? "" 
        }
    }

    // roblox url
    const robloxAnchor = projectCard.querySelector<HTMLAnchorElement>(".btn-roblox") as HTMLAnchorElement
    const playBtn = projectCard.querySelector<HTMLButtonElement>(".playLarge") as HTMLButtonElement

    if (gameUrl == null || isGame != true) {
        robloxAnchor.style.visibility = "hidden";
        playBtn.style.visibility = "hidden";
    } else {
        robloxAnchor.href = gameUrl ?? ""
        playBtn.dataset.url = `roblox://experiences/start?placeId=${startPlaceId}`

        playBtn.addEventListener("click", function(ev: PointerEvent) {
            openNewTab(playBtn)
        })
    }
     
    // content (images & videos)
    const mainVideoElement = projectCard.querySelector<HTMLVideoElement>("#mainVideo") as HTMLVideoElement  
    const mainImageElement = projectCard.querySelector<HTMLImageElement>("#mainImage") as HTMLImageElement
    const extraMediaDiv = projectCard.querySelector<HTMLDivElement>(".extraMedia") as HTMLDivElement
    const extraMediaTemplate = extraMediaDiv.querySelector<HTMLTemplateElement>("template") as HTMLTemplateElement
    // main
    const mainContent = content["Main"]
    const fileLocation = mainContent[0]
    const fileType = mainContent[1]
    if (typeof fileLocation == "string" && typeof fileType == "string") {
        if (fileType == "Video") {
            const mainSourceElement = mainVideoElement.querySelector("source") as HTMLSourceElement
            mainSourceElement.src = fileLocation
            mainImageElement.style.display = "none"
            mainVideoElement.style.display = "block"
        } else if (fileType == "Image") {
            mainImageElement.src = fileLocation
            mainVideoElement.style.display = "none"
            mainImageElement.style.display = "block"
        } else {
            console.log("fileType is not 'video' or 'image'... contact @Accelerate2_ (aka me) on twitter or @acceierate on discord to fix it pls")
        }
    }
    // extra
    const extraContent = content["Extras"]
    for (const [_index, fileLocation] of Object.entries(extraContent)) {
        if (typeof fileLocation != "string") {continue}
        const newExtraThumb = extraMediaTemplate?.content.cloneNode(true) as DocumentFragment
        const newExtraThumbImgElement = newExtraThumb.querySelector<HTMLImageElement>(".extraThumb") as HTMLImageElement
        newExtraThumbImgElement.src = fileLocation
        extraMediaDiv.appendChild(newExtraThumb)
    }

    async function updateGameStats(visitsElement: HTMLParagraphElement, ccuElement: HTMLParagraphElement) {
        if (visitsElement == null || ccuElement == null) {
            console.log("VisitsElement or ccuElement does not exist... or might have been passed as a nil...")
            return
        }

        const roblox_CCU_Visits_Data = await request(universeId)
        var ccu = roblox_CCU_Visits_Data["ccu"]
        const visits = roblox_CCU_Visits_Data["visits"]
        
        visitsElement.textContent = (formatNumber(visits) ?? visitsElement.textContent)
        ccuElement.textContent = (formatNumber(ccu) ?? ccuElement.textContent)

        console.log(`Updated stats for game: ${title}. UniverseId: ${universeId}.`)
    }

    // apis/live counters
    if (isGame == true) {
        const visitsElement = projectCard.querySelector<HTMLParagraphElement>("#visitsLabel") as HTMLParagraphElement
        const ccuElement = projectCard.querySelector<HTMLParagraphElement>("#ccuLabel") as HTMLParagraphElement
        await updateGameStats(visitsElement, ccuElement)
        
        const baseDelay = 10000;

        function getDelay() {
            return baseDelay + (Math.random() * 4000 - 2000);
        }

        var isUpdating = false
        const interval = setInterval(async function() {

            if (visitsElement && ccuElement) {
                
                if (isUpdating == true) {
                    return
                }   

                isUpdating = true
                
                try {
                    await updateGameStats(visitsElement, ccuElement)
                } catch (errorMessage) {
                    console.warn("Error updating stats:", errorMessage);
                } finally {
                    isUpdating = false
                }

            } else {

                console.log(document.body.contains(projectCard), projectCard.contains(visitsElement), projectCard.contains(ccuElement))

                console.log("clearing interval... projectCard or VisitsElement or ccuElement is nil")
                clearInterval(interval)

            }

        }, getDelay() as number)}

    // finalizing 
    container.appendChild(projectCard)
}

export default {_buttons, _containers, _text, load_Project_Card}