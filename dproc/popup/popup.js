
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.from === "content" && request.to === "popup") {
        document.getElementById("message").innerHTML = "Բացված էջ կա";
    }
});
window.addEventListener("load", function () {
    fSendMessageToTabs(message);
});

async function fSendMessageToTabs(message) {
    chrome.tabs.query({active: true, currentWindow: true}, async function (tabs) {
        console.log(tabs);
        try {
            await chrome.tabs.sendMessage(tabs[0].id, {from: "popup", to: "content", message: "how are you"} , /*function (response) {}*/);
        }catch (e) {

        }
    });
}
