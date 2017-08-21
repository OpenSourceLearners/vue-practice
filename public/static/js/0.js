webpackJsonp([0],Array(121).concat([
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_home_vue__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_home_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_e4ec756a_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_home_vue__ = __webpack_require__(165);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(139)
}
var normalizeComponent = __webpack_require__(126)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e4ec756a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_home_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_e4ec756a_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_home_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\views\\home\\home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e4ec756a", Component.options)
  } else {
    hotAPI.reload("data-v-e4ec756a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */
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

var listToStyles = __webpack_require__(127)

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
/* 126 */
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
/* 127 */
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
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkEmail = exports.checkUsername = exports.register = exports.logout = exports.checkLogin = undefined;

var _promise = __webpack_require__(50);

var _promise2 = _interopRequireDefault(_promise);

var _http = __webpack_require__(49);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = "/public/index/";
//登录验证
function checkLogin(user) {
    /*
        由于vue最低ie要求时9，所以没有判断异步传输对象
    */
    // var xhr = new XMLHttpRequest(); //创建ajax传输对象
    // xhr.onreadystatechange = function(){
    //     if(xhr.status == 200 && xhr.responseText){
    //         var data = JSON.parse(xhr.responseText);
    //         for(var i = 0; i < data.length; i++){
    //             if(username == data[i].username && password == data[i].password){
    //                 callback(true);
    //                 return ;
    //             }
    //             callback(false);
    //         }
    //     }
    // }
    // xhr.open('GET', './dist/data/user.json', false);
    // xhr.send(null);
    // if(xhr.status == 200 && xhr.responseText){
    //     var data = JSON.parse(xhr.responseText);
    //     for(var i = 0; i < data.length; i++){
    //         if(){

    //         }
    //     }
    // }else{
    //     callback(false);
    // }
    // var flag = false;
    // var token = 'afdsfdsfds';
    // if(username == 'admin' && password == 'admin'){
    //     flag = true;
    // }
    // sessionStorage.setItem('username', username)
    // sessionStorage.setItem('accessToken', token);
    // callback(flag);
    return new _promise2.default(function (resolve, reject) {
        _http2.default.post(url + 'login/login', { username: user.username, password: user.password }).then(function (data) {
            sessionStorage.setItem('username', user.username);
            sessionStorage.setItem('accessToken', data.token);
            resolve(data);
        }).catch(function (error) {
            reject(error);
        });
    });
}

function logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessToken');
    _http2.default.post(url + 'login/outlogin').then(function (data) {}).catch(function (error) {});
}

function register(user) {
    return new _promise2.default(function (resolve, reject) {
        // checkEmail(user.email)
        // .then((data) => {
        //     checkUsername(user.username)
        //     .then((data) => {
        //         http.post(url + 'register/login', {username: user.username, password: user.password})
        //         .then((data) => {
        //             resolve(data);
        //         })
        //         .catch((error) => {
        //             reject(error)
        //         });
        //     })
        //     .catch((error) => {
        //         reject(error)
        //     });
        // })
        // .catch((error) => {
        //     reject(error)
        // });
        checkEmail(user.email).then(function (data) {
            return checkUsername(user.username);
        }).then(function (data) {
            return _http2.default.post(url + 'register/register', { username: user.username, password: user.password, email: user.email });
        }).then(function (data) {
            return resolve(data);
        }).catch(function (error) {
            return reject(error);
        });
    });
}

function checkEmail(email) {
    return _http2.default.post(url + 'register/verifyEmail', { email: email });
}

function checkUsername(username) {
    return _http2.default.post(url + 'register/verifyUserName', { username: username });
}
exports.checkLogin = checkLogin;
exports.logout = logout;
exports.register = register;
exports.checkUsername = checkUsername;
exports.checkEmail = checkEmail;

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_myModal_vue__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_myModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_myModal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_4104e24a_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_myModal_vue__ = __webpack_require__(133);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(130)
}
var normalizeComponent = __webpack_require__(126)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_myModal_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_4104e24a_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_myModal_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\myModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4104e24a", Component.options)
  } else {
    hotAPI.reload("data-v-4104e24a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(131);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(125)("32b692f4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4104e24a\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./myModal.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4104e24a\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./myModal.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(48)(undefined);
// imports


// module
exports.push([module.i, "\n.modal-bg{\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 1000;\n    background: #000;\n    opacity: 0.4;\n}\n.modal-box{\n    width: 14rem;\n    position: fixed;\n    left: 50%;\n    top: 25%;\n    margin-left: -7rem;\n    z-index: 1001;\n    background: #fff;\n}\n.modal-title{\n    line-height: 0.8rem;\n    height: 0.8rem;\n    padding: 1rem 0 0.5rem 0;\n    font-size: 0.8rem;\n    font-weight: bold;\n    text-align: center;\n}\n.modal-content{\n    font-size: 0.8rem;\n    line-height: 1.6rem;\n    min-height: 2rem;\n    padding: 0 1rem 0.5rem 1rem;\n    border-bottom: 1px solid #ccc;\n    text-align: center;\n}\n.btn-group{\n    height: 2.5rem;\n    display: flex;\n}\n.modal-btn{\n    font-size: 0.8rem;\n    text-align: center;\n    height: 2.5rem;\n    line-height: 2.5rem;\n    flex: 1;\n    border-right: 1px solid #ccc;\n}\n.btn-group .modal-btn:last-child{\n     border-right: none;\n}\n", ""]);

// exports


/***/ }),
/* 132 */
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

exports.default = {
    name: 'myModal',
    components: {},
    props: {
        title: {
            type: String,
            default: '通知'
        },
        content: {
            type: String,
            default: ''
        },
        type: {
            type: Number,
            default: 1
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            show: this.value
        };
    },

    computed: {},
    watch: {
        value: function value(newVal, oldVal) {
            this.show = this.value;
        },
        show: function show(newVal, oldVal) {
            this.$emit('input', newVal);
        }
    },
    methods: {
        inform: function inform(status) {
            this.show = false;
            if (this.type == 2) {
                //通知父组件
                this.$emit('results', status);
            }
        }
    },
    created: function created() {},
    destroyed: function destroyed() {},
    mounted: function mounted() {}
};

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', [_c('div', {
    staticClass: "modal-box"
  }, [_c('div', {
    staticClass: "modal-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    staticClass: "modal-content"
  }, [_vm._v(_vm._s(_vm.content))]), _vm._v(" "), _c('div', {
    staticClass: "btn-group"
  }, [(_vm.type == 1) ? [_c('div', {
    staticClass: "modal-btn",
    on: {
      "click": _vm.inform
    }
  }, [_vm._v("确定")])] : (_vm.type == 2) ? [_c('div', {
    staticClass: "modal-btn",
    on: {
      "click": function($event) {
        _vm.inform(false)
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "modal-btn",
    on: {
      "click": function($event) {
        _vm.inform(true)
      }
    }
  }, [_vm._v("确定")])] : _vm._e()], 2)]), _vm._v(" "), _c('div', {
    staticClass: "modal-bg"
  })]) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4104e24a", esExports)
  }
}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(146);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(140);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(125)("f7d2dfce", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e4ec756a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./home.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e4ec756a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(48)(undefined);
// imports


// module
exports.push([module.i, "\n.main[data-v-e4ec756a]{\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n.content[data-v-e4ec756a]{\n    flex: 1;\n    overflow: hidden;\n}\n", ""]);

// exports


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _menu = __webpack_require__(142);

var _menu2 = _interopRequireDefault(_menu);

var _head = __webpack_require__(155);

var _head2 = _interopRequireDefault(_head);

var _footer = __webpack_require__(160);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'home',
    components: {
        'my-menu': _menu2.default,
        'my-head': _head2.default,
        'my-footer': _footer2.default
    },
    props: {},
    data: function data() {
        return {
            page: 0,
            ws: undefined
        };
    },

    computed: {},
    watch: {},
    methods: {},
    created: function created() {
        var _this = this;

        if (WebSocket) {
            this.ws = new WebSocket('ws://127.0.0.1:1234');
            this.ws.onopen = function () {
                alert("连接成功");
                _this.ws.send('tom');
                alert("给服务端发送一个字符串：tom");
            };
            this.ws.onmessage = function (e) {
                alert("收到服务端的消息：" + e.data);
            };
        } else {
            alert('您得浏览器不支持WebSocket');
        }
        // setTimeos
        // ws = new WebSocket("ws://127.0.0.1:1234");
        // ws.onopen = function() {
        //     alert("连接成功");
        //     ws.send('tom');
        //     alert("给服务端发送一个字符串：tom");
        // };
        // ws.onmessage = function(e) {
        //     alert("收到服务端的消息：" + e.data);
        // };
    },
    destroyed: function destroyed() {},
    mounted: function mounted() {}
}; //
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

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_menu_vue__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_menu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_menu_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_e864f28c_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_menu_vue__ = __webpack_require__(154);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(143)
}
var normalizeComponent = __webpack_require__(126)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e864f28c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_menu_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_e864f28c_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_menu_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\views\\home\\sub\\menu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e864f28c", Component.options)
  } else {
    hotAPI.reload("data-v-e864f28c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(144);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(125)("22ad8d3e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e864f28c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./menu.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e864f28c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./menu.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(48)(undefined);
// imports


// module
exports.push([module.i, "\n.menu[data-v-e864f28c]{\n    color: #fff;\n    font-size: 1rem;\n    width: 70%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 1001;\n    display: flex;\n    background: #3c3c94;\n    flex-direction: column;\n    box-shadow: 0 0 4px #666;\n}\n.menu-item[data-v-e864f28c]{\n    color: #fff;\n    font-size: 1rem;\n    line-height: 2.5rem;\n    display: flex;\n    justify-content: space-between;\n    padding: 0 0.5rem;\n}\n.arrow[data-v-e864f28c]{\n    padding-right: 0.5rem;\n}\n.arrow[data-v-e864f28c]:after {\n    content: \" \";\n    display: inline-block;\n    height: 6px;\n    width: 6px;\n    border-width: 2px 2px 0 0;\n    border-color: #fff;\n    border-style: solid;\n    transform: rotate(45deg);\n}\n.bg-modal[data-v-e864f28c]{\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    z-index: 1000;\n    opacity: 1;\n}\n.user-msg[data-v-e864f28c]{\n    font-weight: bold;\n    height: 5rem;\n    padding: 1rem 0.5rem 0;\n    font-size: 1rem;\n}\n/* 滑动样式 */\n.slide-fade-enter-active[data-v-e864f28c] {\n    transition: transform .3s ease;\n}\n.slide-fade-leave-active[data-v-e864f28c] {\n    transition: transform .5s ease;\n}\n.slide-fade-enter[data-v-e864f28c], .slide-fade-leave-to[data-v-e864f28c] {\n    transform: translateX(-100%);\n}\n.hide-fade-enter-active[data-v-e864f28c] {\n    transition: opacity .3s ease;\n}\n.hide-fade-leave-active[data-v-e864f28c] {\n    transition: opacity .5s ease;\n}\n.hide-fade-enter[data-v-e864f28c], .hide-fade-leave-to[data-v-e864f28c] {\n     opacity: 0;\n}\n.menu-bottom[data-v-e864f28c]{\n    width: 100%;\n    height: 3rem;\n    position:absolute;\n    bottom: 0;\n    box-sizing:border-box;\n    display: flex;\n    justify-content: flex-end;\n}\n.menu-btn-item[data-v-e864f28c]{\n    width: 50%;\n    text-align: center;\n    line-height: 3rem;\n}\n", ""]);

// exports


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(134);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(25);

var _user = __webpack_require__(128);

__webpack_require__(152);

var _myModal = __webpack_require__(129);

var _myModal2 = _interopRequireDefault(_myModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    name: 'menu',
    components: {
        'my-modal': _myModal2.default
    },
    props: {},
    data: function data() {
        return {
            //菜单列表
            navList: [{
                name: '首页',
                path: '/home'
            }, {
                name: '主页',
                path: ''
            }, {
                name: '主页',
                path: ''
            }, {
                name: '我的信息',
                path: ''
            }],
            //移动属性
            move: {
                startX: 0,
                lastX: 0,
                left: 0
            },
            // 模态框信息
            modal: {
                title: '',
                content: '',
                type: 1,
                show: false
            }
        };
    },

    computed: (0, _extends3.default)({}, (0, _vuex.mapState)(['menuShowState']), {
        username: function username() {
            return sessionStorage.getItem('username');
        }
    }),
    watch: {},
    methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['hideMenu', 'showMenu']), {
        logout: function logout() {
            (0, _user.logout)();
            this.hideMenu();
            this.$router.push({
                path: '/login'
            });
        },

        //显示模态框
        showModal: function showModal(config) {
            for (var i in config) {
                if (this.modal[i] != undefined) {
                    this.modal[i] = config[i];
                }
            }
            this.modal.show = true;
        }
    }),
    created: function created() {},
    destroyed: function destroyed() {},
    mounted: function mounted() {}
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(147), __esModule: true };

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
module.exports = __webpack_require__(3).Object.assign;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(8);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(149) });


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(51);
var gOPS = __webpack_require__(150);
var pIE = __webpack_require__(151);
var toObject = __webpack_require__(53);
var IObject = __webpack_require__(52);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(26)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 150 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 151 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(153);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(54)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/_css-loader@0.28.5@css-loader/index.js!./menu.css", function() {
			var newContent = require("!!../../../../node_modules/_css-loader@0.28.5@css-loader/index.js!./menu.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(48)(undefined);
// imports


// module
exports.push([module.i, "@media only screen and (min-width: 768px){\r\n    .menu{\r\n        position: static;\r\n        width: 20%;\r\n    }\r\n}", ""]);

// exports


/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('transition', {
    attrs: {
      "name": "slide-fade"
    }
  }, [_c('nav', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.menuShowState),
      expression: "menuShowState"
    }],
    staticClass: "menu"
  }, [_c('div', {
    staticClass: "user-msg"
  }, [_vm._v("\n                " + _vm._s(_vm.username) + "\n            ")]), _vm._v(" "), _vm._l((_vm.navList), function(item, index) {
    return _c('router-link', {
      key: index,
      attrs: {
        "to": item.path
      }
    }, [_c('div', {
      staticClass: "menu-item"
    }, [_c('div', {
      staticClass: "title"
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('div', {
      staticClass: "arrow"
    })])])
  }), _vm._v(" "), _c('div', {
    staticClass: "menu-bottom"
  }, [_c('p', {
    staticClass: "menu-btn-item",
    on: {
      "click": _vm.logout
    }
  }, [_vm._v("退出登录")])])], 2)]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "hide-fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.menuShowState),
      expression: "menuShowState"
    }],
    staticClass: "bg-modal",
    on: {
      "click": _vm.hideMenu
    }
  })]), _vm._v(" "), _c('my-modal', {
    attrs: {
      "title": _vm.modal.title,
      "content": _vm.modal.content,
      "type": _vm.modal.type
    },
    model: {
      value: (_vm.modal.show),
      callback: function($$v) {
        _vm.modal.show = $$v
      },
      expression: "modal.show"
    }
  })], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-e864f28c", esExports)
  }
}

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_head_vue__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_head_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_head_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_6d4916bb_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_head_vue__ = __webpack_require__(159);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(156)
}
var normalizeComponent = __webpack_require__(126)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6d4916bb"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_head_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_6d4916bb_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_head_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\views\\home\\sub\\head.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] head.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d4916bb", Component.options)
  } else {
    hotAPI.reload("data-v-6d4916bb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(157);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(125)("429dd84d", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6d4916bb\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./head.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6d4916bb\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./head.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(48)(undefined);
// imports


// module
exports.push([module.i, "\n.header[data-v-6d4916bb]{\n    width: 100%;\n    height: 2.6rem;\n    background: #fff;\n    display: flex;\n    justify-content: space-between;\n}\n.header-menu-btn[data-v-6d4916bb]{\n    width: 3rem;\n    height: 1.6rem;\n    padding: 0.5rem 0;\n    display: flex;\n    flex-direction: column;\n    justify-content:space-around;\n    align-items: center;\n}\n.header-menu-btn-line[data-v-6d4916bb]{\n    width: 50%;\n    height: 0.2rem;\n    background: #3c3c94;\n}\n.arrow[data-v-6d4916bb]{\n    padding-top: 1rem;\n    padding-right: 1rem;\n}\n.arrow[data-v-6d4916bb]:after {\n    content: \" \";\n    display: inline-block;\n    height: 0.6rem;\n    width: 0.6rem;\n    border-width: 2px 2px 0 0;\n    border-color: #3c3c94;\n    border-style: solid;\n    transform: rotate(45deg);\n}\n", ""]);

// exports


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(134);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'head',
    components: {},
    props: {},
    data: function data() {
        return {};
    },

    computed: {},
    watch: {},
    methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['showMenu'])),
    created: function created() {},
    destroyed: function destroyed() {},
    mounted: function mounted() {}
}; //
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

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "header"
  }, [_c('div', {
    staticClass: "header-menu-btn",
    on: {
      "click": _vm.showMenu
    }
  }, [_c('p', {
    staticClass: "header-menu-btn-line"
  }), _vm._v(" "), _c('p', {
    staticClass: "header-menu-btn-line"
  }), _vm._v(" "), _c('p', {
    staticClass: "header-menu-btn-line"
  })]), _vm._v(" "), _c('div', {
    staticClass: "arrow"
  })])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6d4916bb", esExports)
  }
}

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_footer_vue__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_footer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_footer_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_7bae2436_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_footer_vue__ = __webpack_require__(164);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(161)
}
var normalizeComponent = __webpack_require__(126)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_footer_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_7bae2436_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_footer_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\views\\home\\sub\\footer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] footer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7bae2436", Component.options)
  } else {
    hotAPI.reload("data-v-7bae2436", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(162);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(125)("44dc9e79", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7bae2436\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./footer.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7bae2436\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./footer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(48)(undefined);
// imports


// module
exports.push([module.i, "\n.footer-box{\n    height: 2.6rem;\n    display: flex;\n}\n.footer-menu-item{\n    flex: 1;\n    font-size: 1rem;\n    font-weight: bold;\n    text-align: center;\n    color: rgba(60, 60, 148, 0.4);\n    line-height: 2.6rem;\n    cursor: pointer;\n}\n.footer-menu-item-selected{\n    color: rgba(60, 60, 148, 1);\n}\n", ""]);

// exports


/***/ }),
/* 163 */
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

exports.default = {
    name: 'footer',
    components: {},
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    data: function data() {
        return {
            index: this.value
        };
    },

    computed: {},
    watch: {
        value: function value(newVal, oldVal) {
            this.index = newVal;
        },
        index: function index(newVal, oldVal) {
            this.$emit('input', newVal);
        }
    },
    methods: {},
    created: function created() {},
    destroyed: function destroyed() {},
    mounted: function mounted() {}
};

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('footer', {
    staticClass: "footer-box"
  }, [_c('p', {
    staticClass: "footer-menu-item",
    class: {
      'footer-menu-item-selected': _vm.index == 0
    },
    on: {
      "click": function($event) {
        _vm.index = 0
      }
    }
  }, [_vm._v("Chat")]), _vm._v(" "), _c('p', {
    staticClass: "footer-menu-item",
    class: {
      'footer-menu-item-selected': _vm.index == 1
    },
    on: {
      "click": function($event) {
        _vm.index = 1
      }
    }
  }, [_vm._v("Friends")]), _vm._v(" "), _c('p', {
    staticClass: "footer-menu-item",
    class: {
      'footer-menu-item-selected': _vm.index == 2
    },
    on: {
      "click": function($event) {
        _vm.index = 2
      }
    }
  }, [_vm._v("My")])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7bae2436", esExports)
  }
}

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home-box"
  }, [_c('my-menu', {
    staticClass: "menu-box"
  }), _vm._v(" "), _c('article', {
    staticClass: "main"
  }, [_c('my-head', {
    staticClass: "head"
  }), _vm._v(" "), _c('router-view', {
    staticClass: "content",
    model: {
      value: (_vm.page),
      callback: function($$v) {
        _vm.page = $$v
      },
      expression: "page"
    }
  }), _vm._v(" "), _c('my-footer', {
    staticClass: "footer",
    model: {
      value: (_vm.page),
      callback: function($$v) {
        _vm.page = $$v
      },
      expression: "page"
    }
  })], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-e4ec756a", esExports)
  }
}

/***/ })
]));