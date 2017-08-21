webpackJsonp([1],{

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_login_vue__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_login_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_5253a5a5_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_login_vue__ = __webpack_require__(171);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(166)
}
var normalizeComponent = __webpack_require__(126)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5253a5a5"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_login_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_5253a5a5_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_login_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\views\\login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5253a5a5", Component.options)
  } else {
    hotAPI.reload("data-v-5253a5a5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 125:
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

/***/ 126:
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

/***/ 127:
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

/***/ 128:
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
    // return new Promise((resolve, reject) => {
    //     http.post(url + 'login/login', {username: user.username, password: user.password})
    //     .then((data) => {
    //         sessionStorage.setItem('username', user.username);
    //         sessionStorage.setItem('accessToken', data.token);
    //         resolve(data);
    //     })
    //     .catch((error) => {
    //         reject(error)
    //     });
    // });
    return new _promise2.default(function (resolve, reject) {
        if (!localStorage.getItem(user.username)) {
            reject({ msg: '用户不存在！' });
        } else if (localStorage.getItem(user.username) != user.password) {
            reject({ msg: '密码错误！' });
        } else {
            sessionStorage.setItem('username', user.username);
            resolve({ msg: '登录成功！' });
        }
    });
}

function logout() {
    sessionStorage.removeItem('username');
    // sessionStorage.removeItem('accessToken');
    // http.post(url + 'login/outlogin')
    // .then((data) => {
    // })
    // .catch((error) => {
    // });
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
        checkUsername(user.username).then(function (data) {
            // return http.post(url + 'register/register', {username: user.username, password: user.password, email: user.email});
            return new _promise2.default(function (resolve, reject) {
                try {
                    localStorage.setItem(user.username, user.password);
                    resolve({ msg: '注册成功！' });
                } catch (e) {
                    reject({ msg: e.message });
                }
            });
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
    // return http.post(url + 'register/verifyUserName', {username: username});
    return new _promise2.default(function (resolve, reject) {
        if (localStorage.getItem(username)) {
            reject({
                msg: '该用户已注册！'
            });
        } else {
            resolve();
        }
    });
}
exports.checkLogin = checkLogin;
exports.logout = logout;
exports.register = register;
exports.checkUsername = checkUsername;
exports.checkEmail = checkEmail;

/***/ }),

/***/ 129:
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

/***/ 130:
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

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(48)(undefined);
// imports


// module
exports.push([module.i, "\n.modal-bg{\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 1000;\n    background: #000;\n    opacity: 0.4;\n}\n.modal-box{\n    width: 14rem;\n    position: fixed;\n    left: 50%;\n    top: 25%;\n    margin-left: -7rem;\n    z-index: 1001;\n    background: #fff;\n}\n.modal-title{\n    line-height: 0.8rem;\n    height: 0.8rem;\n    padding: 1rem 0 0.5rem 0;\n    font-size: 0.8rem;\n    font-weight: bold;\n    text-align: center;\n}\n.modal-content{\n    font-size: 0.8rem;\n    line-height: 1.6rem;\n    min-height: 2rem;\n    padding: 0 1rem 0.5rem 1rem;\n    border-bottom: 1px solid #ccc;\n    text-align: center;\n}\n.btn-group{\n    height: 2.5rem;\n    display: flex;\n}\n.modal-btn{\n    font-size: 0.8rem;\n    text-align: center;\n    height: 2.5rem;\n    line-height: 2.5rem;\n    flex: 1;\n    border-right: 1px solid #ccc;\n}\n.btn-group .modal-btn:last-child{\n     border-right: none;\n}\n", ""]);

// exports


/***/ }),

/***/ 132:
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

/***/ 133:
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

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(167);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(125)("18e5d373", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5253a5a5\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./login.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.5@css-loader/index.js!../../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5253a5a5\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(48)(undefined);
// imports


// module
exports.push([module.i, "\n.login-box[data-v-5253a5a5]{\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    background: #efefef;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n}\n.head-area[data-v-5253a5a5]{\n    flex: 3;\n    height: 60%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.head-portrait[data-v-5253a5a5]{\n    width: 5rem;\n    height: 6rem;\n    /* border: 4px solid #3c3c94; */\n    box-sizing: border-box;\n    /* border-radius: 2.5rem; */\n    background-repeat: no-repeat;\n    background-size:cover;\n    background-position: center center;\n}\n/* .title{\n} */\n.form-area[data-v-5253a5a5]{\n    flex: 5;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n.form-box[data-v-5253a5a5]{\n    width: 320px;\n    padding: 0.5rem 0;\n    display: flex;\n}\n.input-normal[data-v-5253a5a5]{\n    font-size: 1rem;\n    width: 13rem;\n    line-height: 2rem;\n    padding: 0px 0.5rem;\n    border: none;\n    border-bottom: 2px solid #3c3c94;\n    background: transparent;\n    display: inline-flex;\n    float:left;\n}\n.bottom-normal[data-v-5253a5a5]{\n    color: #fff;\n    width: 14rem;\n    height: 2rem;\n    line-height: 2rem;\n    border: none;\n    background: #3c3c94;\n}\n.flex-center[data-v-5253a5a5]{\n    justify-content: center;\n}\n.btn-group[data-v-5253a5a5]{\n    display: block;\n    padding: 0;\n    width: 14rem;\n    height: 2rem;\n    border: 1px solid #3c3c94;\n    overflow: hidden;\n    margin-top: 1rem;\n}\n.btn-box[data-v-5253a5a5]{\n    width: 29rem;\n}\n.register[data-v-5253a5a5]{\n    width: 14rem;\n    height: 2rem;\n    margin-top: 1rem;\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n}\n.register-btn[data-v-5253a5a5]{\n    font-size: 1rem;\n    line-height: 1rem;\n    display: inline-block;\n    color: #3c3c94;\n}\n.arrow[data-v-5253a5a5]{\n    padding-left: 0.5rem;\n}\n.arrow[data-v-5253a5a5]:after {\n    content: \" \";\n    display: inline-block;\n    height: 0.4rem;\n    width: 0.4rem;\n    border-width: 2px 2px 0 0;\n    border-color: #3c3c94;\n    border-style: solid;\n    transform: rotate(45deg);\n}\n.clear-btn[data-v-5253a5a5]{\n    background: transparent;\n    border: none;\n    height: 1rem;\n    display: flex;\n}\ninput[data-v-5253a5a5]:-webkit-autofill {\n    -webkit-box-shadow: 0 0 0px 1000px #efefef inset !important;\n    -webkit-text-fill-color: none!important;\n}\n", ""]);

// exports


/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = __webpack_require__(128);

var _myModal = __webpack_require__(129);

var _myModal2 = _interopRequireDefault(_myModal);

var _login = __webpack_require__(169);

var _login2 = _interopRequireDefault(_login);

var _register = __webpack_require__(170);

var _register2 = _interopRequireDefault(_register);

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: 'login',
    components: {
        'my-modal': _myModal2.default
    },
    props: {},
    data: function data() {
        return {
            //用户信息
            user: {
                username: '',
                password: ''
            },

            // 模态框信息
            modal: {
                title: '',
                content: '',
                type: 1,
                show: false
            },
            loginImg: _login2.default,
            registerImg: _register2.default
        };
    },

    computed: {},
    watch: {},
    methods: {
        //登录
        login: function login() {
            var _this = this;

            if (this.user.username == '' || this.user.password == '') {
                this.showModal({
                    title: '提示',
                    content: '用户名和密码不能为空'
                });
                return;
            }
            // checkLogin(this.user.username, this.user.password, (res) => {
            //     if(res){
            //         this.$router.push({path: '/home'});
            //     }else{
            //         this.showModal({
            //             title: '提示',
            //             content: '登录失败',
            //         });
            //     }
            // });
            (0, _user.checkLogin)(this.user).then(function () {
                _this.$router.push({ path: '/home' });
            }).catch(function (error) {
                _this.showModal({
                    title: '提示',
                    content: error.msg
                });
            });
        },

        //注册
        register: function register() {},

        //显示模态框
        showModal: function showModal(config) {
            for (var i in config) {
                if (this.modal[i] != undefined) {
                    this.modal[i] = config[i];
                }
            }
            this.modal.show = true;
        },
        toRegister: function toRegister() {
            this.$router.push({
                path: '/register'
            });
        }
    },
    created: function created() {},
    destroyed: function destroyed() {},
    mounted: function mounted() {}
};

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "login.png?29c851d8f1cdbea67ef7029a04c88f44";

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "register.jpg?52d5d32ae199ca2613fd24de8f6f28d2";

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-box"
  }, [_c('div', {
    staticClass: "head-area"
  }, [_c('div', {
    staticClass: "head-portrait",
    style: ('background-image: url(' + _vm.loginImg + ')')
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-area"
  }, [_c('div', {
    staticClass: "form-box flex-center"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user.username),
      expression: "user.username"
    }],
    staticClass: "input-normal",
    attrs: {
      "type": "text",
      "placeholder": "请输入用户名",
      "id": "username"
    },
    domProps: {
      "value": (_vm.user.username)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user.username = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-box flex-center"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user.password),
      expression: "user.password"
    }],
    staticClass: "input-normal",
    attrs: {
      "type": "password",
      "placeholder": "请输入密码",
      "id": "password"
    },
    domProps: {
      "value": (_vm.user.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user.password = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-box flex-center"
  }, [_c('button', {
    staticClass: "bottom-normal",
    on: {
      "click": _vm.login
    }
  }, [_vm._v("登录")])]), _vm._v(" "), _c('div', {
    staticClass: "register"
  }, [_c('button', {
    staticClass: "clear-btn",
    on: {
      "click": _vm.toRegister
    }
  }, [_c('span', {
    staticClass: "register-btn"
  }, [_vm._v("Sign in")]), _vm._v(" "), _c('span', {
    staticClass: "arrow"
  })])])]), _vm._v(" "), _c('my-modal', {
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5253a5a5", esExports)
  }
}

/***/ })

});