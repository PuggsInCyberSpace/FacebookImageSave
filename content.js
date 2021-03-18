window.onclick = () => {
    //console.log("On Click");
    setup();
}

window.onmouseover = () => {
    //console.log("On MouseOver");
    setup();
}

window.onfocus = () => {
    //console.log("On Focus");
    setup();
}

var running = false;
var enabled = false;

function setup() {
    try {
        if (running == true || enabled == false) return;
        running = true;
        const images = document.getElementsByTagName("img");

        for (var i = 0; i < images.length; ++i) {
            var image = images[i];
            var src = image.getAttribute("src");
            var data = image.getAttribute("data-visualcompletion");

            if (typeof src == 'undefined' || src == "") src = image.currentSrc;

            if (src.indexOf("_o.jpg") > 0 && data === "media-vc-image") {
                //console.log("sending " + src);
                chrome.runtime.sendMessage({source: src});
            }
        }
        running = false;
    } catch(e) {
        console.log("Error " + e);
        running = false;
    //    console.log(chrome.runtime.lastError);
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Action: " + request.action);
    console.log("Enabled: " + request.enabled);

    if (request.action == 'enabled') {
        enabled = request.enabled;
    }
    console.log("Status: " + enabled);
    sendResponse({status: enabled});
});
/*
//content script
var clickedEl = null;

document.addEventListener("contextmenu", function(event){
    clickedEl = event.target;
}, true);

*/