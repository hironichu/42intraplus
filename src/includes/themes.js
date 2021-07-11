let link;
let head;
let theme;
let status; 
let login; 
let user; 
let r = 10; 
let g = 40; 
let b = 115;
let id_css = 'intratheme';
let g_disableAll = false;
let iframeObserver;

const   _suburl = (check, sub) => {
    let uri = window.location.host.split('.')[0];
    if ((check && sub !== "") && uri === sub) {
        return true;
    }
    switch (uri) {
        case "api":
            return false;
        case "companies":
            return false;
        default:
            return true;
    }
} 
const   _addblur = () => {
    $('.page').css('-webkit-filter','blur(5px)');
    $('.page').css('filter','blur(5px)');
    $('.main-navbar').css('-webkit-filter','blur(5px)');
    $('.main-navbar').css('filter','blur(5px)');
};
const   _removeblur = () => {
    $('.page').css('-webkit-filter','');
    $('.page').css('filter','');
    $('.main-navbar').css('-webkit-filter',')');
    $('.main-navbar').css('filter','');
};
/**
 *  
 */
const load_toolbox = () => {
    window.scrollTo(0, 0);
    _addblur();
    $('body').css('overflow','hidden');
    $('.tb42-modal').attr('class', `tb42-modal show_modal`);
    $('.tb42-backdrop').fadeIn();
    $('[data-tbaction="close"]').click(() =>{
        _removeblur();
        $('body').css('overflow','');
        $('.tb42-modal').attr('class', `tb42-modal`);
        $('.tb42-backdrop').fadeOut();
        window.location.replace("#");
    });
    $('.tb42-backdrop').click(() => {
        $('[data-tbaction="close"]').click();
        window.location.replace("#");
    });
};
/**
 * @name ApplySection
 * @description Apply the theme content to the Dom
 * @param {*} content 
 */
const   applySections = (content) => {
    let styleElement = document.getElementById("tb42theme");
    
    if (styleElement) {
        return;
    }
    styleElement = document.createElement("style");
    styleElement.setAttribute("id", "tb42theme");
    styleElement.setAttribute("class", "tb42theme");
    styleElement.setAttribute("type", "text/css");
    styleElement.appendChild(document.createTextNode(content));
    addStyleElement(styleElement, document);
}
/**
 * 
 * @name   ApplyStyles
 * @description Check and send the style for the theme.
 * @param {string} styleHash 
 */
const   applyStyles = (styleHash) => {
    if (!styleHash) { // Chrome is starting up
        requestStyles();
        return;
    }
    if  (!_suburl()) {
        console.log("Blocked because of not finished");
        return;
    }
    applySections(styleHash);
}
/**
 *  Load DarkTheme
 * @param {*} current 
 */

const DarkTheme = (current) => {
    let nodes_l;
    let r = 50;
    let g = 60;
    let b = 100;
    $(".profile-item .profile-image").css("box-shadow", (current == true )? "0px 0px 15px 2px rgb(147, 255, 4)": "rgb(220, 20, 0) 0px 0 10px 0px");
    $("#user-locations").bind("DOMNodeInserted DOMNodeRemoved",(a) => {
        r = 19,
        g = 44,
        b = 64;
        let val = [];
        let value = a.target;
        if (a.target.localName === 'g') {
            let th = parseInt(value.dataset.originalTitle.split("h")[0]);
            let tm = parseInt(value.dataset.originalTitle.split("h")[1]);
            nodes_ = $(value.childNodes[0]);
            val = checker(th,tm, r,g,b);
            nodes_.attr('fill', `rgb(${val[0]}, ${val[1]}, ${val[2]})`).css({'fill':`rgb(${val[0]}, ${val[1]}, ${val[2]})`,'stroke':'#2c2c34','stroke-width':'0.5px'});
            $(value.childNodes[1]).css('fill','white');
        }
    });
    $("#skill-chart").bind("DOMNodeInserted DOMNodeRemoved",(a) => (a.target.localName === "tspan" || a.target.localName === "text") ? $(a.target).css({'color':`#fff`,"fill":`#fff`}) : null);
    setTimeout(() => {
        $("#skill-chart .highcharts-series-group").find("path").each((k, v) => $(v).attr('fill',`#5bc0de`).attr('stroke',`#5bc0de`).attr('stroke-width', '1.5'));
        $("#skill-chart .highcharts-markers.highcharts-series-0.highcharts-tracker").find("path").each((k, v) => $(v).attr('fill',`#5bc0de`).attr('stroke',`#5bc0de`).attr('stroke-width', '2'));
        $(".project-desc-item .row div .highcharts-container svg rect").each((k, v) => $(v).attr('fill',`#263238`));
        $(".project-desc-item .row div .highcharts-container svg .highcharts-title text").each((k, v) => $(v).attr('fill',`white`).attr('color',`white`));
        $(".project-desc-item .row div .highcharts-container .highcharts-yaxis-title").each((k, v) => $(v).attr('style',`color: white; fill: white;`));
        $(".project-desc-item .highcharts-legend-item text").each((k, v) => $(v).attr('style',`color: white;font-size: 12px;font-weight: bold;cursor: pointer;font: 10px "Noto Sans", sans-serif;fill: white;`));
        $(".project-desc-item .row div .highcharts-container svg .highcharts-title tspan").each((k, v) => $(v).attr('style',`color:white;font-size:18px;font:16px "Noto Sans", sans-serif;fill:white;width:285px;`));
        $(".project-desc-item .highcharts-tracker text").each((k, v) => $(v).attr('style',`font-size: 11px;font-weight: bold;color: white;text-shadow: none;fill: white;text-rendering: geometricPrecision;`));
        $(".user-infos-sub .coalition-span").each((k, v) => $(v).attr('style',`color:#5bc0de;`));
    }, (250));
};

/**
 * 
 * @param {boolean} current 
 */
const   DefaultTheme = (current) => {
    $(".profile-item .profile-image").css("box-shadow", (current == true )? "0px 0px 15px 2px rgb(147, 255, 4)": "rgb(220, 20, 0) 0px 0 10px 0px");
};
/**
 * 
 * @param {int} month 
 * @param {int} year 
 */
const daysInMonth  = (month, year) => new Date(year, month, 0).getDate();
/**
 * 
 */
const UnloadTheme = () => {
    $("#"+theme+"Theme").remove();
    location.reload();
};
/**
 * 
 * @param {string} name 
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
/**
 * 
 * @param {string} theme 
 * @param {boolean} current 
 */
const LoadTheme = (theme, current) => {
    //
    if  (!_suburl()) {
        console.log("Blocked because of not finished");
    }
    else {
        if (theme !== ""){
            if (theme === "dark"){
                DarkTheme(current);
            }
            else if (theme === "default"){
                DefaultTheme(current);
            }
            else{
                console.info("No theme available");
            }
        }
        else{
            DefaultTheme(current);
        }
    }
};


/**
 * @name    ToolboxHandler
 * @param {array} toolbox 
 */
const   toolbox_handler = (toolbox) => $($(toolbox)[0].children[2]).click(() => load_toolbox());
/**
 * @name addStyleElement
 * @description Add the style element to the dom before loading the html
 * @param {DOM} styleElement 
 * @param {DOM} doc 
 */
const   addStyleElement = (styleElement, doc) => {
    if (!doc.documentElement || doc.getElementById(styleElement.id)) {
        return;
    }
    doc.documentElement.appendChild(doc.importNode(styleElement, true)).disabled = g_disableAll;
}
/**
 * @name initObserver
 * @description Initialize the Observer for the DOM
 */
const   initObserver = () => {
    iframeObserver = new MutationObserver((mutations) => setTimeout(process.bind(null, mutations), 0));
    iframeObserver.start = ()  => iframeObserver.observe(document, {childList: true, subtree: true});
}
/**
 * @name RequestStyle
 * @description Send the request for the style
 */
const requestStyles = () => {
    
    var request = {method: "getStyles", matchUrl: location.href, enabled: true, asHash: true};
	chrome.runtime.sendMessage(request, applyStyles);
}
initObserver();
requestStyles()
