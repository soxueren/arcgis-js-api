// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.

define(["require","exports","../../../core/libs/gl-matrix/mat4","../GeometryUtils","./BackgroundRenderer","./LineRenderer","./FillRenderer","./SymbolRenderer","./TileInfoRenderer","./FadeRecorder"],function(e,t,r,i,o,a,s,n,d,h){var _=function(){function e(e,t,r){void 0===r&&(r=!0),this._extrudeRotateVector=new Float32Array([0,0,1]),this._extrudeScaleVector=new Float32Array([1,1,1]),this._state={rotation:0,width:0,height:0},this._cachedWidth=0,this._cachedHeight=0,this._cachedRotation=0,this._pixelRatio=1,this._SpriteMosaic=e,this._glyphMosaic=t,this._ignoreSpeed=!r,this._backgroundRenderer=new o,this._lineRenderer=new a,this._fillRenderer=new s,this._symbolRenderer=new n,this._tileInfoRenderer=new d,this._fadeRecorder=new h.FadeRecorder(300),this._extrudeMatrix=new Float32Array(16),this._extrudeNoRotationMatrix=new Float32Array(16),this._backgroundColor=new Float32Array([1,0,0,1])}return e.prototype.setStateParams=function(e,t,o){this._pixelRatio=t,this._fadeRecorder.recordLevel(o),this._state=e,(this._state.width!==this._cachedWidth||this._state.height!==this._cachedHeight||this._state.rotation!==this._cachedRotation)&&(this._extrudeScaleVector[0]=2/e.width,this._extrudeScaleVector[1]=-2/e.height,r.identity(this._extrudeMatrix),r.rotate(this._extrudeMatrix,this._extrudeMatrix,-e.rotation*i.C_DEG_TO_RAD,this._extrudeRotateVector),r.scale(this._extrudeMatrix,this._extrudeMatrix,this._extrudeScaleVector),r.transpose(this._extrudeMatrix,this._extrudeMatrix),r.identity(this._extrudeNoRotationMatrix),r.scale(this._extrudeNoRotationMatrix,this._extrudeNoRotationMatrix,this._extrudeScaleVector),r.transpose(this._extrudeNoRotationMatrix,this._extrudeNoRotationMatrix),this._cachedWidth=this._state.width,this._cachedHeight=this._state.height,this._cachedRotation=this._state.rotation)},e.prototype.drawClippingMasks=function(e,t){if(0!==t.length){e.setDepthWriteEnabled(!1),e.setDepthTestEnabled(!1),e.setStencilTestEnabled(!0),e.setBlendingEnabled(!1),e.setColorMask(!1,!1,!1,!1),e.setStencilOp(7680,7680,7681),e.setClearStencil(0);var r=e.gl;e.clear(r.STENCIL_BUFFER_BIT);for(var i=0,o=t;i<o.length;i++){var a=o[i];a.attached&&a.visible&&(e.setStencilFunctionSeparate(1032,519,a.stencilData.reference,a.stencilData.mask),e.setStencilWriteMask(a.stencilData.mask),this._backgroundRenderer.renderSolidColor(e,{u_matrix:a.tileTransform.transform,u_normalized_origin:a.tileTransform.displayCoord,u_coord_range:a.coordRange,u_depth:0,u_color:this._backgroundColor}))}e.setColorMask(!0,!0,!0,!0),e.setBlendingEnabled(!0),e.setStencilWriteMask(255)}},e.prototype.renderDebug=function(e,t){var r=t.key;this._backgroundColor.set([r.col%2,r.row%2,r.col%2===0&&r.row%2===0?1:0,.5]),this._backgroundRenderer.renderSolidColor(e,{u_matrix:t.tileTransform.transform,u_normalized_origin:t.tileTransform.displayCoord,u_coord_range:t.coordRange,u_depth:0,u_color:this._backgroundColor})},e.prototype.renderBucket=function(e,t,r,i,o,a,s,n){switch(t.type){case 0:2!==o&&this._renderBackground(e,r,o,a,s,n);break;case 1:2!==o&&this._renderFill(e,t,r,o,a,s,n);break;case 2:1===o&&this._renderLine(e,t,r,a,s,n);break;case 3:2===o&&this._renderSymbol(e,t,r,i,a,s,n)}},e.prototype.renderTileInfo=function(e,t){this._tileInfoRenderer.render(e,t)},e.prototype.needsRedraw=function(){return this._fadeRecorder.needsRedraw()},e.prototype._renderBackground=function(e,t,r,i,o,a){this._backgroundRenderer.render(e,t,r,i,o,this._SpriteMosaic,this._SpriteMosaic.pixelRatio,a)},e.prototype._renderLine=function(e,t,r,i,o,a){this._lineRenderer.render(e,t,r,this._state,i,o,this._SpriteMosaic,this._extrudeMatrix,this._SpriteMosaic.pixelRatio,a)},e.prototype._renderFill=function(e,t,r,i,o,a,s){this._fillRenderer.render(e,t,r,this._state.rotation,i,o,a,this._SpriteMosaic,this._extrudeMatrix,this._SpriteMosaic.pixelRatio,s)},e.prototype._renderSymbol=function(e,t,r,i,o,a,s){var n=!0;i===o.key.level&&(n=!1),e.setStencilTestEnabled(n),this._symbolRenderer.render(e,t,r,this._state.rotation,this._fadeRecorder.getFadeValues(this._ignoreSpeed),o,a,this._SpriteMosaic,this._glyphMosaic,this._extrudeMatrix,this._extrudeNoRotationMatrix,this._SpriteMosaic.pixelRatio,s)},e}();return _});