export default function (guiButton) {
    const url = guiButton.dataset.url;
    if (url == null) {
        console.log(`Button "${guiButton.id || guiButton.className || 'unknown'}" does not have url in its dataset.`);
        return;
    }
    try {
        window.open(url, "_blank");
    }
    catch (errorMessage) {
        console.log(errorMessage);
    }
}
//# sourceMappingURL=openNewTab.js.map