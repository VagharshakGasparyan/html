
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.from === "content" && request.to === "popup") {
        document.getElementById("message").innerHTML = "Բացված էջ կա";
        if("message" in request && request.message === "loaded" && "location" in request){
            if(request.location.startsWith("/home/get_schools")){
                fSendMessageToTabs({from: "popup", to: "content", message: "re_update"});
            }
        }
    }
});
window.addEventListener("load", function () {
    document.getElementById("btn1").addEventListener("click", function () {
        fSendMessageToTabs({from: "popup", to: "content", message: "re_update"});
    });
    fSendMessageToTabs({from: "popup", to: "content", message: "open_tab"});
    fSendMessageToBackground();
});

async function fSendMessageToTabs(message) {
    chrome.tabs.query({active: true, currentWindow: true}, async function (tabs) {
        console.log(tabs);
        try {
            await chrome.tabs.sendMessage(tabs[0].id, message, /*function (response) {}*/);
        }catch (e) {

        }
    });
}

async function fSendMessageToBackground(){
    try {
        await chrome.runtime.sendMessage({from: "popup", to: "background", message: "open_tab"});
    }catch (e) {

    }
}
