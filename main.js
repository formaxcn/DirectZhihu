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