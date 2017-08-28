webpackJsonp([5],{

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_chatRoom_vue__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_chatRoom_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_chatRoom_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_43ba2bcb_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_chatRoom_vue__ = __webpack_require__(217);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(214)
}
var normalizeComponent = __webpack_require__(128)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-43ba2bcb"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_chatRoom_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_43ba2bcb_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_chatRoom_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\views\\chatRoom\\chatRoom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] chatRoom.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-43ba2bcb", Component.options)
  } else {
    hotAPI.reload("data-v-43ba2bcb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(129)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 128:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 129:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(215);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(127)("b2a05664", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-43ba2bcb\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./chatRoom.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-43ba2bcb\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./chatRoom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(48)(undefined);
// imports


// module
exports.push([module.i, "\n.room-box[data-v-43ba2bcb]{\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n.room-head[data-v-43ba2bcb]{\n    height: 2.6rem;\n    display: flex;\n    flex-direction: row;\n}\n.room-content[data-v-43ba2bcb]{\n    flex: 1;\n    border-top: 1px solid #efefef;\n    border-bottom: 1px solid #efefef;\n    background: #fafafa;\n}\n.room-footer[data-v-43ba2bcb]{\n    height: 2.6rem;\n    display: flex;\n    flex-direction: row;\n}\n.arrow-box[data-v-43ba2bcb]{\n    flex: 1;\n    display: flex;\n    align-items: center;\n}\n.arrow[data-v-43ba2bcb]{\n    margin-top: 0.4rem;\n    margin-left: 1rem;\n}\n.arrow[data-v-43ba2bcb]:after {\n    content: \" \";\n    display: inline-block;\n    height: 0.6rem;\n    width: 0.6rem;\n    border-width: 2px 0 0 2px;\n    border-color: #3c3c94;\n    border-style: solid;\n    transform: rotate(-45deg);\n}\n.friend-name[data-v-43ba2bcb]{\n    flex: 1;\n    line-height: 2.6rem;\n    text-align: center;\n    font-weight: bold;\n    font-size: 1rem;\n}\n.others[data-v-43ba2bcb]{\n    flex: 1;\n}\n.chat-record[data-v-43ba2bcb]{\n    display: flex;\n    min-height: 3rem;\n}\n.head-portrait[data-v-43ba2bcb]{\n    width: 2.6rem;\n    height: 2.6rem;\n    border-radius: 1.3rem;\n    margin: 0.5rem 0.5rem 0;\n}\n.chat-message-box[data-v-43ba2bcb]{\n    flex: 1;\n    margin: 0.5rem 0 0;\n    padding-left: 3.1rem;\n    text-align: right;\n}\n.chat-message-box-2[data-v-43ba2bcb]{\n    flex: 1;\n    margin: 0.5rem 0.5rem 0;\n    padding-right: 3.1rem;\n    text-align: left;\n}\n.chat-message[data-v-43ba2bcb]{\n    padding: 0.6rem 0.8rem;\n    margin-top: 0.1rem;\n    border-radius: 0.5rem 0 0.5rem 0.5rem;\n    font-size: 0.8rem;\n    line-height: 1rem;\n    display: inline-block;\n    background: #80f8ff;\n    border: 1px solid #efefef;\n    display: inline-block;\n    text-align: left;\n}\n.chat-message-2[data-v-43ba2bcb]{\n    border-radius: 0 0.5rem 0.5rem 0.5rem;\n    background: #fff;\n    border: 1px solid #efefef;\n}\n.msg-input[data-v-43ba2bcb]{\n    font-size: 1rem;\n    padding: 0 0.5rem;\n    flex: 1;\n    border: none;\n}\n.send-btn[data-v-43ba2bcb]{\n    color: #333;\n    font-weight: bold;\n    width: 4rem;\n    border: none;\n}\n", ""]);

// exports


/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'chatRoom',
    components: {},
    props: {},
    data: function data() {
        return {
            Uid: 1,
            friendName: '张三',
            senderColor: '#efefef',
            recipientColor: '#26ebec',
            chatRecordList: [{
                sender: 1,
                recipient: 2,
                date: '22:40',
                message: '哈啊哈哈啊哈哈啊哈啊哈',
                readStatus: false
            }, {
                sender: 2,
                recipient: 1,
                date: '22:40',
                message: '哈啊哈',
                readStatus: false
            }, {
                sender: 1,
                recipient: 2,
                date: '22:40',
                message: '哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈啊哈',
                readStatus: false
            }, {
                sender: 2,
                recipient: 1,
                date: '22:40',
                message: '哈啊哈',
                readStatus: false
            }, {
                sender: 1,
                recipient: 2,
                date: '22:40',
                message: '哈啊哈哈啊哈哈啊哈哈啊哈啊哈',
                readStatus: false
            }, {
                sender: 2,
                recipient: 1,
                date: '22:40',
                message: '哈啊哈',
                readStatus: false
            }]
        };
    },

    computed: {},
    watch: {},
    methods: {},
    created: function created() {},
    destroyed: function destroyed() {},
    mounted: function mounted() {}
};

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('main', {
    staticClass: "room-box"
  }, [_c('header', {
    staticClass: "room-head"
  }, [_vm._m(0), _vm._v(" "), _c('p', {
    staticClass: "friend-name"
  }, [_vm._v(_vm._s(_vm.friendName))]), _vm._v(" "), _c('p', {
    staticClass: "others"
  })]), _vm._v(" "), _c('article', {
    staticClass: "room-content"
  }, _vm._l((_vm.chatRecordList), function(item, index) {
    return _c('dl', {
      key: index,
      staticClass: "chat-record"
    }, [(item.sender == _vm.Uid) ? [_c('dt', {
      staticClass: "chat-message-box"
    }, [_c('p', {
      staticClass: "chat-message"
    }, [_vm._v(_vm._s(item.message))])]), _vm._v(" "), _c('dd', {
      staticClass: "head-portrait",
      style: ({
        'background': _vm.senderColor
      })
    })] : [_c('dt', {
      staticClass: "head-portrait",
      style: ({
        'background': _vm.recipientColor
      })
    }), _vm._v(" "), _c('dt', {
      staticClass: "chat-message-box-2"
    }, [_c('p', {
      staticClass: "chat-message chat-message-2"
    }, [_vm._v(_vm._s(item.message))])])]], 2)
  })), _vm._v(" "), _vm._m(1)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "arrow-box"
  }, [_c('span', {
    staticClass: "arrow"
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('footer', {
    staticClass: "room-footer"
  }, [_c('input', {
    staticClass: "msg-input",
    attrs: {
      "type": "text",
      "value": ""
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "send-btn"
  }, [_vm._v("发送")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-43ba2bcb", esExports)
  }
}

/***/ })

});