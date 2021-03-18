chrome.runtime.onInstalled.addListener(()=> {
    /*
    try {
        chrome.contextMenus.create({
            id: "fbs123456",
            title: 'Save All Images',
            contexts: ["image"]
        });
        chrome.contextMenus.onClicked.addListener(mycallback());
} catch(e) {
        console.log(e);
    }
 */
    console.log("Installed Facebook Image Save...");
});

chrome.runtime.onMessage.addListener(function(msg) {
    //console.log("The Message is " + msg);
    doDownload(msg.source);
    //sendResponse({status: true});
})

var downloaded = new Array();

function doDownload(src) {
    
    var imageURL = src;
    if (imageURL.lastIndexOf("/") > 0) {
        var filename = imageURL.substr(imageURL.lastIndexOf("/") + 1);
        if (filename.indexOf("?") > 0) filename = filename.substr(0, filename.indexOf("?"));
        var filePath = "images/" + filename;

        if (!downloaded.includes(filename)) {
            chrome.downloads.download({
                url: imageURL,
                filename: filePath
            }, function(number) {
                //alert(number);
                if (typeof number == 'undefined') {
                    alert("failed to download image " + filename);
                } else {
                    downloaded.push(filename);
                }
            });
        } else {
            console.log("Already downloaded this file " + filename);
        }
    }
}

/*
var elt;

function mycallback() {
    return function(info, tab) {
        chrome.tabs.sendMessage(tab.id, "getClickedEl", {frameId: info.frameId}, data => {
            doDownload(data.imgURL, data.doc);
        });
    }
}

function getClickHandler() {
    return function(info, tab) {

        alert(tab.id);
        const theTab = chrome.windows.get(tab.windowid, function() {});
        const theInfo = info;
      // The srcUrl property is only available for image elements.
      //chrome.downloads.download()
  
  //var url = "http://exif.regex.info/?imgurl=" + info.srcUrl;
  
      // Create a new tabto the info page.
  
  //chrome.tabs.create({ url: url, });
    };
  };
  

*/