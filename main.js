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

var hostname = location.hostname
var pathname = location.pathname
var href = location.href

String.prototype.contains = function(s) {
	return -1 !== this.indexOf(s)
}

String.prototype.startsWith = function(s) {
	return this.slice(0, s.length) == s
}

function blockListeners(element, events) {
	function stopBubbling(event) {
		event.stopPropagation()
	}

	var eventList = events.split(' ')
	if(eventList) {
		var i, event
		for(i = eventList.length - 1; i > -1; i--) {
			event = eventList[i].trim()
			if(event) {
				element.removeEventListener(event, stopBubbling, true)
				element.addEventListener(event, stopBubbling, true)
			}
		}
	}
}

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
     * ֱ��������https://link.zhihu.com/?target=....... ���ض�����ʵ��Ŀ����ַ
     * ���⣺��Ŀ����ַ�޷�����ʱ����ַ���еĵ�ַ��Ϣ��δ�ı䵽Ŀ����ַ�����ܲ������
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