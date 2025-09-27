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

export default {_buttons, _containers, _text}