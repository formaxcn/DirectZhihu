// ==UserScript==
// @name         DirectZhihu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Formaxcn
// @match        https://www.zhihu.com/
// @grant        none
// ==/UserScript==

// Your code here...
$(document).ready(function(){
    modifyZhihu();
});

function modifyZhihu() {
    function getRealUrl(l) {
        if (l.indexOf("?target=") < 0)
            return null;
        var a = document.createElement('a'); 
        a.href = l;
        seg = a.search.split("?target=");
        return decodeURIComponent( seg[1] );
    }

    /**
     * 直接在载入https://link.zhihu.com/?target=....... 中重定向到真实的目标网址
     * 问题：当目标网址无法访问时，地址栏中的地址信息并未改变到目标网址，可能产生误解
     */
    var real = getRealUrl(location.href);
    if (real) {
        window.location.href = real;
        return;
    };

    document.addEventListener('click', function(e){
        for(a = e.target; a; a = a.parentNode) {
            if(a.localName != 'a') 
                continue;
            real = getRealUrl( a.getAttribute('href') );
            if (real) {
                a.setAttribute( 'href', real );
                a.removeAttribute('onmousedown');
            }
            break;
        }
    }, false);
}