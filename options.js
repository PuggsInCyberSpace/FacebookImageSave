var enabled;
function doButton(chk) {
    try {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "enabled", enabled: chk}, function(response){
                if (typeof response != 'undefined') enable = response.status;
            });
        });
    } catch (e) {
        
    }
}

function doStatus(chk) {
    try {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "status", enabled: chk}, function(response){
                if (typeof response != 'undefined') enabled = response.status;
                const but = document.getElementById("FBenable");
                if (typeof but != 'undefined' && but != null) {
                    if (enabled) {
                        but.checked = enabled;
                    }
                }
            });
        });
    } catch (e) {
        
    }
}

window.onload = () => {
    doStatus(enabled);
    const but = document.getElementById("FBenable");
    if (typeof but != 'undefined' && but != null) {
        but.addEventListener("click", function(ev){ doButton(document.getElementById("FBenable").checked)});
    }
}