var url, state = {}, storage = window.localStorage;
// chrome.webNavigation.onCommitted.addListener(restoreState, filter);


const   getCookies = (domain, name, callback) => {
    chrome.cookies.get({"url": domain, "name": name}, (cookie) => {
        if (cookie != null) {
            if(callback) {
                callback(cookie.value);
            }
        }else {
            if (callback) {
                callback(null);
            }
        }
    });
}

const   webNavigationListener = (method, data) => {
	if (data.frameId != 0) {
		return;
	}
	getStyles({matchUrl: data.url, enabled: true, asHash: true}, function(styleHash) {
		if (method) {

			chrome.tabs.sendMessage(data.tabId, {method: method, styles: styleHash}, {frameId: data.frameId});
		}
	});
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch (request.method) {
		case "getStyles":
            var styles = getStyles(request, sendResponse);
            return true;
        case "updateStyles" :
            // var styles = getStyles(request, sendResponse);
            getStyles({matchUrl: sender.url, enabled: true, asHash: true}, function(styleHash) {
                    chrome.tabs.sendMessage(sender.tab.id, {method: request.method, styles: styleHash}, {frameId: sender.frameId});
            });
            return true;
	}
});


const   getStyles = (options, callback) => {
    getCookies("https://*.intra.42.fr", "theme", (id) => {
        if (id === null){
            chrome.cookies.set({url:"https://intra.42.fr","name": "theme",value:"default"});
            id = 'default';
        }
        url = "/styles/"+id+".42theme.min.css";
        storage.setItem('cssfile', chrome.runtime.getURL(url));
        fetch(chrome.runtime.getURL(url))
        .then((response) => {
            promises = response.text();
            promises.then((content) => {
                callback(filterStyles(content));
            });
        });
    });

}

const   filterStyles = (styles) => styles;

const error = (msg) => {
    window.alert('ERROR: ' + msg);
};
chrome.webNavigation.onCommitted.addListener(webNavigationListener.bind(this, "styleApply"));
chrome.webNavigation.onBeforeNavigate.addListener(webNavigationListener.bind(this, null));