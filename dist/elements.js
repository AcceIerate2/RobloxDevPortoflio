import openNewTab from "./actions/openNewTab.js";
import request from "./utility/request.js";
import formatNumber from "./utility/formatNumber.js";
const _buttons = {
    ["playBtn"]: document.getElementById("playBtn"),
    ["codingSection"]: document.getElementById("codingSection"),
    ["buildSection"]: document.getElementById("buildSection"),
};
const _containers = {
    ["playMenu"]: document.getElementById("playMenu")
};
const _text = {
    ["menuSelectionHeader"]: document.getElementById("modeSelectionText")
};
const template = document.querySelector(".projectTemplate");
async function load_Project_Card(container, title, universeId, startPlaceId, description, tags, isGame, gameUrl, githubUrl, dates, content) {
    const projectCard = template?.content.cloneNode(true);
    // project title
    const titleElement = projectCard.querySelector(".projectName");
    if (!titleElement) {
        return;
    }
    titleElement.textContent = title;
    // project description
    const descriptionElement = projectCard.querySelector(".projectDesc");
    if (!descriptionElement) {
        return;
    }
    descriptionElement.textContent = description;
    // contribution tags
    const tagTemplate = projectCard.querySelector(".tagTemplate");
    const contribRoles = projectCard.querySelector(".contribRoles");
    for (const [_index, tagName] of Object.entries(tags)) {
        const tagContainer = tagTemplate?.content.cloneNode(true);
        const tagSpawnElement = tagContainer.querySelector(".contribBadge");
        tagSpawnElement.textContent = tagName;
        contribRoles.appendChild(tagContainer);
    }
    // project start date and end date
    const startDate = dates.Start;
    const completionDate = dates.End;
    const dateParagraph = projectCard.querySelector(".projectDates");
    dateParagraph.textContent = `${startDate} — ${completionDate}`;
    // -- links --
    // github url
    const githubAnchor = projectCard.querySelector(".btn-github");
    if (githubAnchor != null) {
        if (githubUrl == null) {
            githubAnchor.style.visibility = "hidden";
        }
        else {
            githubAnchor.href = githubUrl ?? "";
        }
    }
    // roblox url
    const robloxAnchor = projectCard.querySelector(".btn-roblox");
    const playBtn = projectCard.querySelector(".playLarge");
    if (gameUrl == null || isGame != true) {
        robloxAnchor.style.visibility = "hidden";
        playBtn.style.visibility = "hidden";
    }
    else {
        robloxAnchor.href = gameUrl ?? "";
        playBtn.dataset.url = `roblox://experiences/start?placeId=${startPlaceId}`;
        playBtn.addEventListener("click", function (ev) {
            openNewTab(playBtn);
        });
    }
    // content (images & videos)
    const mainVideoElement = projectCard.querySelector("#mainVideo");
    const mainImageElement = projectCard.querySelector("#mainImage");
    const extraMediaDiv = projectCard.querySelector(".extraMedia");
    const extraMediaTemplate = extraMediaDiv.querySelector("template");
    // main
    const mainContent = content["Main"];
    const fileLocation = mainContent[0];
    const fileType = mainContent[1];
    if (typeof fileLocation == "string" && typeof fileType == "string") {
        if (fileType == "Video") {
            const mainSourceElement = mainVideoElement.querySelector("source");
            mainSourceElement.src = fileLocation;
            mainImageElement.style.display = "none";
            mainVideoElement.style.display = "block";
        }
        else if (fileType == "Image") {
            mainImageElement.src = fileLocation;
            mainVideoElement.style.display = "none";
            mainImageElement.style.display = "block";
        }
        else {
            console.log("fileType is not 'video' or 'image'... contact @Accelerate2_ (aka me) on twitter or @acceierate on discord to fix it pls");
        }
    }
    // extra
    const extraContent = content["Extras"];
    for (const [_index, fileLocation] of Object.entries(extraContent)) {
        if (typeof fileLocation != "string") {
            continue;
        }
        const newExtraThumb = extraMediaTemplate?.content.cloneNode(true);
        const newExtraThumbImgElement = newExtraThumb.querySelector(".extraThumb");
        newExtraThumbImgElement.src = fileLocation;
        extraMediaDiv.appendChild(newExtraThumb);
    }
    // apis/live counters
    if (isGame == true) {
        const roblox_CCU_Visits_Data = await request(universeId);
        var ccu = roblox_CCU_Visits_Data["ccu"];
        const visits = roblox_CCU_Visits_Data["visits"];
        const visitsElement = projectCard.querySelector("#visitsLabel");
        visitsElement.textContent = formatNumber(visits);
        const ccuElement = projectCard.querySelector("#ccuLabel");
        ccuElement.textContent = formatNumber(ccu);
    }
    // finalizing 
    container.appendChild(projectCard);
}
export default { _buttons, _containers, _text, load_Project_Card };
//# sourceMappingURL=elements.js.map