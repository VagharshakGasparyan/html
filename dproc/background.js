chrome.runtime.onInstalled.addListener(async ({reason}) => {
    // chrome.action.setBadgeText({
    //     text: "OFF",
    // });
    // console.log(1234567);
    // if (reason === 'install') {
    //     chrome.tabs.create({
    //         url: "https://hayt.emis.am/home/get_schools?marzField=6&regionField=21&searchSchoolField=3"
    //     });
    // }
    // await chrome.tabs.create({
    //     url: "https://hayt.emis.am/home/get_schools?marzField=6&regionField=21&searchSchoolField=3"
    // });


});
chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {

        if(request.from === "popup" && request.to === "background" && ("message" in request) && request.message === "open_tab"){

            chrome.tabs.query({active: true, currentWindow: true}, async function (tabs) {
                if(tabs.length > 0 && tabs[0].url.startsWith("https://hayt.emis.am")){

                }else{
                    await chrome.tabs.create({
                        url: "https://hayt.emis.am/home/get_schools?marzField=6&regionField=21&searchSchoolField=3"
                    });
                }
            });

        }
    }
);