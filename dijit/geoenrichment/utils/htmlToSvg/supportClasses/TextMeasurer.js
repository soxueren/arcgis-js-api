// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.

define(["dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","./EncodeUtil"],function(e,n,i,t){var r={createTempNode:function(n,t){var r=e.create("div",{style:n.style.getTextStyle()},document.body);return i.set(r,{position:"absolute",left:"300px",top:t?"0px":"100px",display:"inline-block",width:t?n.style.cw+"px":"",color:t?"white":"yello"}),r}},o={getParagraphs:function(e,n){function i(e){return e.trim().replace(/ {2,}/g," ")}var t=n.style.getTextStyle("whiteSpace"),r="pre-wrap"===t||"pre"===t||"pre-line"==t;r||(e=e.replace(new RegExp(String.fromCharCode(10),"g")," "));var o="pre-wrap"===t||"pre"===t;o||(e=i(e));var a=r?e.split(String.fromCharCode(10)):[e];return a.length>1&&!o&&(a=a.map(i)),a}},a={measureWidth:function(e,n){return n.innerHTML=e,i.get(n,"width")}},l={getLinesForWords:function(e,i,t,r){function o(){var e=t.innerHTML;t.innerHTML="";var n=e.split("");return l.getLinesForWords(n,i,t,{checkBreaking:!1,separator:""}).lines}function s(e){var n=e.split("");return l.getLinesForWords(n,i,t,{checkBreaking:!1,separator:"",clearLinesNodeBeforeMeasure:!r.isBreakAll}).lines}var g,d,h=0;r.checkBreaking&&(t.innerHTML="a",d=n.position(t).h);var p=0,c="";r.clearLinesNodeBeforeMeasure&&(t.innerHTML=""),e.some(function(e){if(g){var l;r.checkBreaking&&(l=t.innerHTML),t.innerHTML+=r.separator+e;var u=n.position(t).h;if(p>0&&u>p){g.push({text:c,w:a.measureWidth(c,i),lineHeight:h});var f;if(r.checkBreaking&&(u-p>1.2*d||r.isBreakAll)){t.innerHTML=c+r.separator;var x=s(e);t.innerHTML=l+r.separator+e,x.length>1&&(f=!0,x.forEach(function(e,n){if(n<x.length-1)if(0===n&&r.isBreakAll){var t=g[g.length-1];t.text+=r.separator+e.text,t.w=a.measureWidth(t.text,i)}else g.push(e);else h=e.lineHeight,c=e.text}),p=u)}f||(c=e,h=u-p,p=u)}else c+=r.separator+e,0===p&&(p=n.position(t).h,h=p)}else if(g=[],r.clearLinesNodeBeforeMeasure?t.innerHTML=e:t.innerHTML+=e,c=e,p=n.position(t).h,h=p,r.checkBreaking&&p>1.2*d){var L=o();L.length>1&&L.forEach(function(e,n){n<L.length-1?g.push(e):(h=e.lineHeight,c=e.text)})}}),g.push({text:c,w:a.measureWidth(c,i),lineHeight:h});var u=n.position(t).w;return{lines:g,textWidth:u,lineHeight:h}}},s={getLinesForParagraph:function(e,n,i,t){var r=e.split(" "),o="break-word"===n.style.getTextStyle("overflowWrap"),a="break-all"===n.style.getTextStyle("wordBreak");return l.getLinesForWords(r,i,t,{checkBreaking:o||a,isBreakAll:a,clearLinesNodeBeforeMeasure:!0,separator:" "})}},g={getSpanFlowOffsets:function(t,r){function o(e){return e.parentNode?"DIV"==e.parentNode.nodeName?e.parentNode:o(e.parentNode):void 0}var a=o(t),l=i.get(a,"textAlign"),s=t.innerHTML;i.set(a,"textAlign","left");var g=n.position(t);t.innerHTML="a";var d=n.position(t);t.innerHTML=s,i.set(a,"textAlign",l);var h=0,p=0;if(h="center"==r.style.textAlign?0:d.x-g.x,"right"==r.style.textAlign){var c=e.create("span",{innerHTML:"|"},t,"after"),u=n.position(t),f=n.position(c);p=u.x+u.w-f.x,e.destroy(c)}return{start:h,end:p}}},d={_node:null,_originalInnerHTML:null,_originalNextSiblingDisplay:null,_nextSiblingHiddenFlag:null,setNode:function(e){this._node=e,this._originalInnerHTML=null,this._originalNextSiblingDisplay=null,this._nextSiblingHiddenFlag=null},doPresets:function(){this._originalInnerHTML=this._node.innerHTML,this.hideNextSibling()},undoPresets:function(){this.showNextSibling(),this._node.innerHTML=this._originalInnerHTML},hideNextSibling:function(){if(!this._nextSiblingHiddenFlag){var e=this._node;this._originalNextSiblingDisplay=e.nextSibling&&e.nextSibling.style&&e.nextSibling.style.display,e.nextSibling&&e.nextSibling.style&&(e.nextSibling.style.display="none"),this._nextSiblingHiddenFlag=!0}},showNextSibling:function(){if(this._nextSiblingHiddenFlag){var e=this._node;e.nextSibling&&e.nextSibling.style&&(e.nextSibling.style.display=this._originalNextSiblingDisplay||""),this._nextSiblingHiddenFlag=!1}}},h={getLines:function(i,a,l){if(i.innerHTML&&i.innerHTML.trim()){d.setNode(i),d.doPresets();var g,h=a.isSpanLike?i:r.createTempNode(a,!0),p=r.createTempNode(a),c=o.getParagraphs(i.innerHTML,a),u=[];if(c.forEach(function(e){var n=s.getLinesForParagraph(e,a,p,h);g=n.textWidth,u=u.concat(n.lines)}),u.forEach(function(e){e.text=t.encodeXML(e.text)}),a.isSpanLike){h.innerHTML=d._originalInnerHTML;var f=n.position(h).h;d.showNextSibling();var x=n.position(h).h;if(x>f){var L=(x-f)/2;u[u.length-1].lineHeight+=L}d.hideNextSibling()}return d.undoPresets(),e.destroy(p),!a.isSpanLike&&e.destroy(h),{lines:u,textWidth:g}}},getSpanFlowOffsets:function(e,n){return g.getSpanFlowOffsets(e,n)}};return h});