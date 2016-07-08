// Copyright (c) 2016 Alberto Cubeddu @ Creditorwatch.com.au

var chromeUtility = (function() {

    function goToSpecialUrl(newURL) {
        chrome.tabs.query({active: true}, function(currentTab){
            chrome.tabs.create({ url: newURL }, function (tab){
                setTimeout(function(){
                    chrome.tabs.update(currentTab[0].id, {active: true});
                    chrome.tabs.remove(tab.id);
                },500);
            });
        });
    }

    function goToUrl(newURL) {
        chrome.tabs.create({ url: newURL });
    }

    function searchCw(info, tab) {
        if (info.selectionText) {
            var newURL = "https://www.creditorwatch.com.au/search/comprehensive/"+info.selectionText;
            newURL = newURL.replace(/\s+/g, '');
            chrome.tabs.create({ url: newURL });
        }
    }

    return {
        goToSpecialUrl : goToSpecialUrl,
        goToUrl : goToUrl,
        searchCw : searchCw
    }

}());


chrome.contextMenus.create({"title": 'Search on Creditorwatch', "contexts":["selection"], "onclick": chromeUtility.searchCw});

chrome.contextMenus.create({"title": "Go to the website", "contexts":["page"] ,
    "onclick": function (){
        chromeUtility.goToUrl("https://www.creditorwatch.com.au");
    }
});

chrome.contextMenus.create({"title": "TIP: Select text and click right button", "contexts":["page"] });
chrome.contextMenus.create({"type":"separator"});

chrome.contextMenus.create({"title": "Call Creditorwatch", "contexts":["page"],
    "onclick": function(){
        chromeUtility.goToSpecialUrl("tel://00610450597995");
    }
});

chrome.contextMenus.create({"title": "Send an email to Creditorwatch", "contexts":["page"],
    "onclick": function() {
        chromeUtility.goToSpecialUrl("mailto:admin@creditorwatch.com.au");
    }
});
