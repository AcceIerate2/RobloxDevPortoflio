import data from "../elements.js"
const playMenu = data._containers.playMenu
const menuSelectionLabel = data._text.menuSelectionHeader

export default function(guiButton: HTMLButtonElement) {
    playMenu.classList.toggle("show")
    menuSelectionLabel.classList.toggle("show")
    guiButton.classList.toggle("pop")
}