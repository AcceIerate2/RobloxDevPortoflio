interface Buttons {
    playBtn: HTMLButtonElement;
    codingSection: HTMLButtonElement;
    buildSection: HTMLButtonElement;
}
interface Containers {
    playMenu: HTMLDivElement;
}
interface Text {
    menuSelectionHeader: HTMLParagraphElement;
}
declare function load_Project_Card(container: HTMLDivElement, title: string, universeId: string, startPlaceId: string, description: string, tags: Object, isGame: boolean, gameUrl: string, githubUrl: string, dates: {
    ["Start"]: string;
    ["End"]: string;
}, content: {
    ["Main"]: [string?, string?];
    ["Extras"]: [string?, string?, string?];
}): Promise<void>;
declare const _default: {
    _buttons: Buttons;
    _containers: Containers;
    _text: Text;
    load_Project_Card: typeof load_Project_Card;
};
export default _default;
//# sourceMappingURL=elements.d.ts.map