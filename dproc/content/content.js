// console.log("---===|||************************|||===---");
window.addEventListener('load', function () {
    if (window.location.hostname === "hayt.emis.am") {
        // chrome.runtime.sendMessage({from: "content", to: "popup", message: window.location.pathname});
    }
    let names = ['child_soc', 'parent_soc', 'parent_firstname', 'parent_lastname', 'parent_email'];
    let vars = ['2624180257', '6502820115', 'Մետաքսյա', 'Հակոբյան', '93453690'];
    names.forEach(function (n, i) {
        let tag = document.querySelector("[name='" + n + "']");
        if(tag){
            tag.value = vars[i];
        }
    });
});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if(request.from === "popup" && request.to === "content"){
            //console.log(window.location.hostname, '---', window.location.pathname);
            if (window.location.hostname === "hayt.emis.am") {
                chrome.runtime.sendMessage({from: "content", to: "popup", message: window.location.pathname});
            }
        }

    }
);