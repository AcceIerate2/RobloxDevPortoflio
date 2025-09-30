import data from "../elements.js"

export default function(guiButton: HTMLButtonElement) {
    const playMenu = data._containers.playMenu
    const menuSelectionLabel = data._text.menuSelectionHeader
    const playBtn = document.getElementById("playBtn") as HTMLButtonElement

    const containers = {
        codeContainer: document.getElementById("codeContainer") as HTMLDivElement,
        buildContainer: document.getElementById("buildContainer") as HTMLDivElement,
        homeContainer: document.getElementById("homeContainer") as HTMLDivElement
    }

    const containerName = guiButton.dataset.containername as string
    console.log(containerName)

    for (const containerDiv of Object.values(containers)) {
        if (containerDiv) {
            containerDiv.classList.remove("on")
            containerDiv.classList.add("off")
        }
    }

    if (containerName === "codeContainer" || containerName === "buildContainer") {
        const selected = containers[containerName as keyof typeof containers]
        if (selected) {
            selected.classList.add("on")
            selected.classList.remove("off")
        }

        playMenu.classList.add("show")
        menuSelectionLabel.classList.add("show")
        playBtn.classList.add("pop")
    } else {
        containers.homeContainer.classList.add("on")
        containers.homeContainer.classList.remove("off")

        playMenu.classList.remove("show")
        menuSelectionLabel.classList.remove("show")
        playBtn.classList.remove("pop")
    }
}
