import data from "./elements.js";
const buttons = data._buttons

console.log(buttons)

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