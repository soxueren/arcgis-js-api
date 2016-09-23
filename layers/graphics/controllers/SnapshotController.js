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
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.

define(["dojo/_base/lang","dojo/promise/all","dojo/Deferred","../../support/GraphicsManager","../../../Graphic","../../../core/Accessoire","../../../core/AccessoirePromise","../../../core/Evented","../../../core/Collection","../../../core/HandleRegistry","../../../geometry/support/scaleUtils"],function(e,t,r,s,i,a,n,l,u,h,o){var c=a.createSubclass([n,l],{declaredClass:"esri.layers.graphics.controllers.SnapshotController",classMetadata:{properties:{isQueryInProgress:{dependsOn:["_queryDfd"]},graphics:{type:u.ofType(i)},extent:{},hasFeatures:{},hasAllFeatures:{}}},constructor:function(){this._queryError=this._queryError.bind(this),this._queryCanceller=this._queryCanceller.bind(this),this._collectionChanged=this._collectionChanged.bind(this),this.refresh=this.refresh.bind(this),this._handles=new h},initialize:function(){this.addResolvingPromise(t([this.layer,this.layerView])),this.then(this._startup.bind(this))},destroy:function(){this.cancelQuery(),this._gManager&&(this._gManager.destroy(),this._gManager=null),this._handles.destroy(),this._handles=null},graphics:null,_graphicsSetter:function(e,t){return t===e?t:(this._handles.remove("graphics"),e&&(this._collectionChanged({added:e.toArray()}),this._handles.add(e.on("change",this._collectionChanged),"graphics")),e)},hasAllFeatures:!1,hasFeatures:!1,isQueryInProgress:!1,_isQueryInProgressGetter:function(){return!(!this._queryDfd||this._queryDfd.isFulfilled())},layer:null,layerView:null,maxPageSize:null,pageSize:null,paginationEnabled:!1,_cancelErrorMsg:"SnapshotController: query cancelled",_currentPageDfd:null,_featureResolution:{value:1,scale:3780},_gManager:null,_handles:null,_maxFeatures:{point:16e3,multipoint:8e3,polyline:4e3,polygon:4e3,multipatch:4e3},_queryDfd:null,_source:null,refresh:function(){this.isResolved()&&this._queryFeatures()},cancelQuery:function(){this.isQueryInProgress&&(this._queryDfd.cancel(new Error(this._cancelErrorMsg)),this._queryDfd=null)},_startup:function(){var e=this.layer,t=e.advancedQueryCapabilities;this.paginationEnabled=!(!t||!t.supportsPagination),this._source=e.source,this.pageSize=null==this.maxPageSize?e.maxRecordCount:Math.min(e.maxRecordCount,this.maxPageSize),this._resolutionParams=this._getResolutionParams(),this._gManager=new s({graphics:this.graphics,objectIdField:e.objectIdField}),this._setupStateWatchers(),this._queryFeatures()},_getResolutionParams:function(){var e,t=this.layer,r=t.supportsCoordinatesQuantization;if(!t.editable&&("polyline"===t.geometryType||"polygon"===t.geometryType)){var s=o.getUnitValue(this.layerView.view.spatialReference);if(null==s);else{var i=this._featureResolution.scale,a=this._featureResolution.value/s;i=t.maxScale?t.maxScale:t.minScale?Math.min(i,t.minScale):Math.min(i,o.getScale(this.layerView.view,t.fullExtent)),e=a/this._featureResolution.scale*i}}return e?{maxAllowableOffset:r?null:e,quantizationParameters:r?{mode:"view",originPosition:"upperLeft",tolerance:e,extent:t.fullExtent}:null}:null},_setupStateWatchers:function(){this._handles.add([this.watch("extent",this.refresh),this.layer.watch("definitionExpression",this.refresh)])},_createQueryParams:function(){var t=this.layer,r=this.layerView,s=t.createQuery();return s.outSpatialReference=r.view.spatialReference,s.geometry=this.extent,e.mixin(s,this._resolutionParams),this.paginationEnabled&&(s.start=0,s.num=this.pageSize),s},_queryFeatures:function(){this.cancelQuery(),this.hasAllFeatures=this.hasFeatures=!1,this._queryDfd=new r(this._queryCanceller),this._gManager.beginUpdate(),this.emit("query-start"),this._executeQuery(this._createQueryParams())},_executeQuery:function(e){this._currentPageDfd=this._source.queryFeatures(e).then(this._processFeatureSet.bind(this,e),this._queryError)},_processFeatureSet:function(e,t){var r=t.exceededTransferLimit,s=t.features,i=this.layer.geometryType.toLowerCase().replace(/^esriGeometry/i,""),a=this._maxFeatures[i]||0,n=s?s.length:0,l=this._gManager.graphics.length+n,u=l>=a;if(u){var h=l-a;h&&s.splice(n-h,h)}var o=r&&this.paginationEnabled&&!u?this._queryNextPage(e):!1;return s&&this._gManager.add(s),this.hasFeatures=!0,o||(this._gManager.endUpdate(),this.hasAllFeatures=!r,this._queryDfd.resolve(),this._queryDfd=null,this.emit("query-end",{success:!0})),t},_queryNextPage:function(e){return e.start+=this.pageSize,this._executeQuery(e),!0},_queryError:function(e){e&&"cancel"===e.dojoType&&!this.hasFeatures?this._gManager.revertUpdate():this._gManager.endUpdate(),this._queryDfd.reject(e),this._queryDfd=null,this.emit("query-end",{success:!1})},_queryCanceller:function(e){var t=this._currentPageDfd;t&&!t.isFulfilled()&&t.cancel(e)},_collectionChanged:function(e){var t,r,s;if(s=e.added)for(t=0;r=s[t];t++)r.layer=this.layer;if(s=e.removed)for(t=0;r=s[t];t++)r.layer=null}});return c});