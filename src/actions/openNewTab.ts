export default function(guiButton: HTMLButtonElement) {
    console.log("aaaaaaaaa")
    const url = guiButton.dataset.url
    if (url == null) {
        console.log(`Button "${guiButton.id || guiButton.className || 'unknown'}" does not have url in its dataset.`)
        return
    }

    try {
        window.open(url, "_blank")
    } catch(errorMessage) {
        console.log(errorMessage)
    }
}