// console.log("---===|||************************|||===---");
window.addEventListener('load', async function () {
    if (window.location.hostname === "hayt.emis.am") {
        try {
            await chrome.runtime.sendMessage({from: "content", to: "popup", message: "loaded", location: window.location.pathname});
        }catch (e) {

        }

        let names = ['child_soc', 'parent_soc', 'parent_firstname', 'parent_lastname', 'parent_email'];
        let vars = ['2624180257', '6502820115', 'Մետաքսյա', 'Հակոբյան', '93453690'];
        names.forEach(function (n, i) {
            let tag = document.querySelector("[name='" + n + "']");
            if(tag){
                tag.value = vars[i];
            }
        });
    }

});

chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        if(request.from === "popup" && request.to === "content"){
            //console.log(window.location.hostname, '---', window.location.pathname);
            if (window.location.hostname === "hayt.emis.am") {
                await chrome.runtime.sendMessage({from: "content", to: "popup", message: window.location.pathname});
                if(("message" in request) && request.message === "re_update"){
                    fReUpdate();
                }
            }
        }

    }
);

function fReUpdate() {
    if(window.location.pathname.startsWith("/home/get_schools")){
        document.querySelectorAll("#scroll.scrollbar .force-overflow.schools_container>[data-id]").forEach(function (el) {
            let st = el.querySelector(".school_title");
            if(st && st.innerHTML.includes("թիվ 3 հմ")){
                let sbm = el.querySelector("a.submit_button");
                if(sbm){
                    sbm.click();
                }
            }
        });
    }else if(window.location.pathname.startsWith("/home/addRequest/")){
        window.location = "https://hayt.emis.am/home/get_schools?marzField=6&regionField=21&searchSchoolField=3";
    }else{
        window.location = "https://hayt.emis.am/home/get_schools?marzField=6&regionField=21&searchSchoolField=3";
    }
    // window.location.reload();
}