// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/app/class/Components.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Components = /** @class */function () {
  function Components() {}
  Components.prototype.createElement = function (type, options) {
    return Object.assign(document.createElement("".concat(type)), __assign({}, options));
  };
  Components.prototype.appendChild = function (element, targets) {
    targets.forEach(function (target) {
      element.appendChild(target);
    });
  };
  Components.prototype.deleteElement = function () {};
  return Components;
}();
exports.default = Components;
},{}],"src/app/components/molecules/Tooltip.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Components_1 = __importDefault(require("../../class/Components"));
var Tooltip = /** @class */function (_super) {
  __extends(Tooltip, _super);
  function Tooltip(label, position, target, mode) {
    var _this = _super.call(this) || this;
    _this.label = label;
    _this.position = position;
    _this.target = target;
    _this.intervalId = 0;
    _this.mode = mode || "dark";
    _this.element = _this.createTooltipElement();
    _this.eventListener();
    return _this;
  }
  Tooltip.prototype.calcPosition = function () {
    return {
      margin: 16,
      targetops: {
        height: this.target.offsetHeight,
        width: this.target.offsetWidth,
        left: this.target.getBoundingClientRect().x,
        top: this.target.getBoundingClientRect().y,
        right: window.innerWidth - this.target.getBoundingClientRect().x - this.target.getBoundingClientRect().width,
        bottom: window.innerWidth - this.target.getBoundingClientRect().y - this.target.getBoundingClientRect().width
      },
      tooltipsops: {
        height: this.element.offsetHeight,
        width: this.element.offsetWidth
      }
    };
  };
  Tooltip.prototype.setPosition = function (options) {
    if (this.position !== "right") {
      return;
    }
    if (options.targetops.right < options.tooltipsops.width) {
      //basculer à droite
      return;
    }
    console.log(options);
    this.element.style.left = "".concat(options.targetops.left + options.targetops.width + options.margin, "px");
    this.element.style.top = "".concat(options.targetops.top - options.tooltipsops.height / 2, "px");
    // this.element.style.top = `${options.targetops.top - options.margin - options.tooltipsops.height}px`;
    // this.element.style.left = `${options.targetops.left - (options.tooltipsops.width - options.targetops.width) / 2}px`;
  };

  Tooltip.prototype.eventListener = function () {
    this.target.addEventListener("mouseenter", this.onMouseOver.bind(this));
    this.target.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  };
  Tooltip.prototype.onMouseOver = function (e) {
    var _this = this;
    e.preventDefault();
    document.body.append(this.element);
    var position = this.calcPosition();
    this.setPosition(position);
    this.intervalId = window.setTimeout(function () {
      _this.show();
    }, 2000);
  };
  Tooltip.prototype.onMouseLeave = function (e) {
    e.preventDefault();
    this.hide();
    this.destroy();
    window.clearInterval(this.intervalId);
  };
  Tooltip.prototype.createTooltipElement = function () {
    var element = this.createElement("div", {
      className: "tooltip"
    });
    element.setAttribute("position", this.position);
    element.setAttribute("label", this.label);
    var content = this.createElement("span", {
      className: "tooltip-content"
    });
    var label = this.createElement("span", {
      className: "tooltip-label",
      textContent: this.label
    });
    this.appendChild(content, [label]);
    var arrow = this.createElement("div", {
      className: "tooltip-arrow"
    });
    this.appendChild(element, [content, arrow]);
    return element;
  };
  Tooltip.prototype.show = function () {
    if (this.mode === "dark") {
      this.element.classList.add("tooltip-visible-dark");
    } else {
      this.element.classList.add("tooltip-visible-white");
    }
  };
  Tooltip.prototype.hide = function () {
    this.element.className = "tooltip";
  };
  Tooltip.prototype.destroy = function () {
    document.body.removeChild(this.element);
  };
  return Tooltip;
}(Components_1.default);
exports.default = Tooltip;
},{"../../class/Components":"src/app/class/Components.ts"}],"src/app/components/molecules/Tools.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tools = void 0;
var Components_1 = __importDefault(require("../../class/Components"));
var Tools = /** @class */function (_super) {
  __extends(Tools, _super);
  function Tools(task) {
    var _this = _super.call(this) || this;
    _this.TASK = task;
    _this.ELEMENT = _this.createElement("div", {
      className: "task-actions",
      id: "task-actions"
    });
    _this.ACTIONS = [{
      type: "edit",
      icon: "<i class='ri-pencil-line'></i>",
      cb: _this.edit
    }, {
      type: "archive",
      icon: "<i class='ri-archive-line'></i>",
      cb: _this.archive
    }, {
      type: "delete",
      icon: "<i class='ri-delete-bin-6-line'></i>",
      cb: _this.delete
    }];
    _this.definedElement();
    return _this;
  }
  Tools.prototype.definedElement = function () {
    var _this = this;
    console.log(this.TASK);
    var buttons = [];
    var _loop_1 = function _loop_1(i) {
      var button = this_1.createElement("button", {
        className: "task-action",
        id: "task-action",
        type: "button",
        action: this_1.ACTIONS[i].type,
        innerHTML: this_1.ACTIONS[i].icon,
        onclick: function onclick() {
          _this.ACTIONS[i].cb();
        }
      });
      buttons.push(button);
    };
    var this_1 = this;
    for (var i = 0; i < this.ACTIONS.length; i++) {
      _loop_1(i);
    }
    this.appendChild(this.ELEMENT, buttons);
  };
  Tools.prototype.hide = function () {};
  Tools.prototype.delete = function () {
    console.log("delete");
    console.log(this.TASK);
  };
  Tools.prototype.archive = function () {
    console.log("archive");
  };
  Tools.prototype.edit = function () {
    console.log("edit");
  };
  Tools.prototype.show = function () {};
  return Tools;
}(Components_1.default);
exports.Tools = Tools;
},{"../../class/Components":"src/app/class/Components.ts"}],"src/app/components/atoms/Text.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Components_1 = __importDefault(require("../../class/Components"));
var Text = /** @class */function (_super) {
  __extends(Text, _super);
  function Text(options) {
    var _this = _super.call(this) || this;
    _this.TYPE = options.type;
    _this.VALUE = options.value;
    _this.CLASSNAME = options.className;
    _this.ELEMENT = Object.assign(document.createElement("".concat(_this.TYPE)), {
      className: _this.CLASSNAME,
      textContent: _this.VALUE
    });
    return _this;
  }
  return Text;
}(Components_1.default);
exports.default = Text;
},{"../../class/Components":"src/app/class/Components.ts"}],"src/app/helpers/DateHandler.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateString = void 0;
var DateString = /** @class */function () {
  function DateString() {
    this.dateString = "";
    this.start = Date.now();
    this.elapsed = 0;
    this.time = {
      second: this.elapsed,
      minute: 0,
      hour: 0,
      day: 0,
      week: 0,
      month: 0,
      year: 0
    };
    this.timeFormated();
  }
  DateString.prototype.timeFormated = function () {
    var _this = this;
    setInterval(function () {
      _this.elapsed = Math.floor((Date.now() - _this.start) / 1000);
      _this.time.second = _this.elapsed;
      _this.time.minute = _this.time.second / 60;
      _this.time.hour = _this.time.minute / 60;
      _this.time.day = _this.time.hour / 24;
      _this.time.week = _this.time.day / 7;
      _this.time.month = _this.time.week / 4;
      _this.time.year = _this.time.month / 12;
      if (_this.time.second <= 60) {
        _this.dateString = "".concat(_this.time.second, "s ago");
      } else if (_this.time.second >= 60) {
        _this.dateString = "".concat(Math.floor(_this.time.minute), "min ago");
      } else if (_this.time.minute >= 60) {
        _this.dateString = "".concat(Math.floor(_this.time.hour), "hour ago");
      } else if (_this.time.hour >= 24) {
        _this.dateString = "".concat(Math.floor(_this.time.day), "day ago");
      } else if (_this.time.day >= 7) {
        _this.dateString = "".concat(Math.floor(_this.time.week), "week ago");
      } else if (_this.time.week >= 4) {
        _this.dateString = "".concat(Math.floor(_this.time.month), "month ago");
      } else if (_this.time.month >= 12) {
        _this.dateString = "".concat(Math.floor(_this.time.year), "year ago");
      }
    }, 1000);
  };
  return DateString;
}();
exports.DateString = DateString;
},{}],"src/app/components/molecules/Task.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = void 0;
var Tools_1 = require("./Tools");
var Components_1 = __importDefault(require("../../class/Components"));
var Text_1 = __importDefault(require("../atoms/Text"));
var DateHandler_1 = require("../../helpers/DateHandler");
var Task = /** @class */function (_super) {
  __extends(Task, _super);
  function Task(id, title, description, checked, badges) {
    var _this = _super.call(this) || this;
    _this.id = id;
    _this.title = title;
    _this.description = description;
    _this.checked = checked;
    _this.badges = badges;
    _this.time = new DateHandler_1.DateString();
    _this.tools = new Tools_1.Tools(_this);
    _this.element = _this.createHtmlElement();
    _this.init();
    _this.render();
    _this.eventListener();
    return _this;
  }
  Task.prototype.init = function () {};
  Task.prototype.render = function () {
    var app = document.getElementById("app");
    if (!app) return;
    this.appendChild(this.element, [this.tools.ELEMENT]);
    app.appendChild(this.element);
  };
  Task.prototype.createHtmlElement = function () {
    var _this = this;
    var element = Object.assign(document.createElement("li"), {
      className: "task",
      id: "task",
      taskId: this.id,
      checked: this.checked
    });
    //Header
    var taskHeader = Object.assign(document.createElement("div"), {
      className: "task-header",
      id: "task-header"
    });
    var taskHeaderBox = Object.assign(document.createElement("span"), {
      className: "task-checkbox",
      id: "task-checkbox"
    });
    var taskHeaderContent = Object.assign(document.createElement("div"), {
      className: "task-content",
      id: "task-content"
    });
    var title = new Text_1.default({
      value: this.title,
      type: "h3",
      className: "task-title"
    }).ELEMENT;
    var description = new Text_1.default({
      value: this.description,
      type: "p",
      className: "task-description"
    }).ELEMENT;
    var taskHeaderMoveIcon = Object.assign(document.createElement("span"), {
      className: "task-move",
      id: "task-move",
      innerHTML: "<i class='ri-apps-2-fill'></i>"
    });
    this.appendChild(taskHeaderContent, [title, description]);
    this.appendChild(taskHeader, [taskHeaderBox, taskHeaderContent, taskHeaderMoveIcon]);
    this.appendChild(element, [taskHeader]);
    //DIVIDER
    var divider = Object.assign(document.createElement("hr"), {});
    this.appendChild(element, [divider]);
    //FOOTER
    var footer = Object.assign(document.createElement("div"), {
      className: "task-footer"
    });
    var badges = Object.assign(document.createElement("div"), {
      className: "task-badges"
    });
    this.badges.forEach(function (text) {
      var b = Object.assign(document.createElement("span"), {
        className: "task-badge",
        textContent: text
      });
      _this.appendChild(badges, [b]);
    });
    var time = Object.assign(document.createElement("span"), {
      className: "task-timer",
      id: "task-timer",
      textContent: "0s ago"
    });
    window.setInterval(function () {
      time.textContent = _this.time.dateString;
    }, 1000);
    this.appendChild(footer, [badges, time]);
    this.appendChild(element, [footer]);
    return element;
  };
  Task.prototype.delete = function () {};
  Task.prototype.archive = function () {};
  Task.prototype.edit = function () {};
  Task.prototype.onChecked = function (e) {
    e.preventDefault();
    console.log("click");
  };
  Task.prototype.eventListener = function () {
    this.element.addEventListener("click", this.onChecked.bind(this));
  };
  return Task;
}(Components_1.default);
exports.Task = Task;
},{"./Tools":"src/app/components/molecules/Tools.ts","../../class/Components":"src/app/class/Components.ts","../atoms/Text":"src/app/components/atoms/Text.ts","../../helpers/DateHandler":"src/app/helpers/DateHandler.ts"}],"src/app/components/organisims/documents/TaskDocument.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskDocument = void 0;
var Components_1 = __importDefault(require("../../../class/Components"));
var Task_1 = require("../../molecules/Task");
var Text_1 = __importDefault(require("../../atoms/Text"));
var TaskDocument = /** @class */function (_super) {
  __extends(TaskDocument, _super);
  function TaskDocument(id, title, description, tasks) {
    var _this = _super.call(this) || this;
    _this.id = id;
    _this.title = title;
    _this.description = description;
    _this.date = Date.now();
    _this.tasks = tasks;
    console.log(_this.tasks);
    _this.list = _this.createElement("ul", {});
    _this.element = _this.uiHandler();
    _this.render();
    return _this;
  }
  TaskDocument.prototype.render = function () {
    var app = document.querySelector(".page-document");
    if (!app) return;
    app.innerHTML = "";
    app.appendChild(this.element);
  };
  TaskDocument.prototype.uiHandler = function () {
    var _this = this;
    var root = this.createElement("div", {
      className: "task-document",
      id: "task-document"
    });
    var content = this.createElement("div", {
      className: "task-document-content"
    });
    var contenttext = this.createElement("div", {
      className: "task-document-content-desc"
    });
    var title = new Text_1.default({
      value: this.title,
      type: "h3",
      className: "task-document-title"
    }).ELEMENT;
    var description = new Text_1.default({
      value: this.description,
      type: "p",
      className: "task-document-description"
    }).ELEMENT;
    var dateAdd = new Text_1.default({
      value: String(this.date),
      type: "p",
      className: "task-document-dateAdded"
    }).ELEMENT;
    this.appendChild(contenttext, [title, dateAdd]);
    this.appendChild(content, [contenttext, description]);
    this.list = this.createElement("ul", {
      className: "task-document-list",
      id: "task-document-list"
    });
    this.tasks.forEach(function (task) {
      _this.addTask(task.title, task.description, task.badges);
    });
    this.appendChild(root, [content, this.list]);
    return root;
  };
  TaskDocument.prototype.addTask = function (title, description, badges) {
    var id = "task-id-qsdqd";
    var task = new Task_1.Task(id, title, description, false, badges);
    this.list.appendChild(task.element);
  };
  TaskDocument.prototype.edit = function (title, description) {
    if (title === "" || description === "") return;
    this.title = title;
    this.description = description;
  };
  TaskDocument.prototype.clean = function () {
    this.tasks = [];
  };
  TaskDocument.prototype.delete = function () {
    console.log("delete");
  };
  return TaskDocument;
}(Components_1.default);
exports.TaskDocument = TaskDocument;
},{"../../../class/Components":"src/app/class/Components.ts","../../molecules/Task":"src/app/components/molecules/Task.ts","../../atoms/Text":"src/app/components/atoms/Text.ts"}],"src/app/components/organisims/documents/Documents.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var TaskDocument_1 = require("../documents/TaskDocument");
var Documents = /** @class */function () {
  function Documents() {}
  Documents.openDocument = function (id, type, datas) {
    var documentData = this.getDocument(id, datas);
    switch (type) {
      case "tasksDocuments":
        var doc = new TaskDocument_1.TaskDocument(documentData.id, documentData.title, documentData.description, documentData.task);
    }
  };
  Documents.getDocumentDatas = function (type) {
    return __awaiter(this, void 0, void 0, function () {
      var data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, window.documentDatas.getDatas(type)];
          case 1:
            data = _a.sent();
            return [2 /*return*/, data];
        }
      });
    });
  };
  Documents.getDocument = function (id, datas) {
    var data = {};
    datas.forEach(function (d) {
      if (d.id === id) {
        data = d;
      }
    });
    return data;
  };
  return Documents;
}();
exports.default = Documents;
},{"../documents/TaskDocument":"src/app/components/organisims/documents/TaskDocument.ts"}],"src/app/components/atoms/Button.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var Components_1 = __importDefault(require("../../class/Components"));
var Button = /** @class */function (_super) {
  __extends(Button, _super);
  //Button size [small, medium, large]
  //Button type [primary, secondary, ...]
  function Button(label, type, size, cb, icon) {
    var _this = _super.call(this) || this;
    _this.label = label;
    _this.type = type;
    _this.size = size;
    _this.icon = icon;
    _this.cb = cb;
    _this.element = _this.createButtonElement();
    return _this;
  }
  Button.prototype.createButtonElement = function () {
    var _this = this;
    var element = this.createElement("button", {
      className: "button button-".concat(this.type, " button-").concat(this.size),
      type: "button",
      onclick: function onclick() {
        _this.cb();
      }
    });
    var label = this.createElement("span", {
      className: "button-label",
      textContent: this.label
    });
    this.appendChild(element, [label]);
    if (this.icon) {
      var icon = this.createElement("i", {
        className: "button-icon"
      });
      icon.classList.add(this.icon.value);
      this.appendChild(element, [icon]);
    }
    return element;
  };
  return Button;
}(Components_1.default);
exports.Button = Button;
},{"../../class/Components":"src/app/class/Components.ts"}],"src/app/components/molecules/Search.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = void 0;
var Components_1 = __importDefault(require("../../class/Components"));
var Search = /** @class */function (_super) {
  __extends(Search, _super);
  function Search(datas) {
    var _this = _super.call(this) || this;
    _this.datas = datas;
    _this.element = _this.createSearchElement();
    return _this;
  }
  Search.prototype.createSearchElement = function () {
    var element = this.createElement("div", {
      className: "search"
    });
    var input = this.createElement("input", {
      className: "search-input",
      type: "seach",
      name: "document-seach",
      placeholder: "Search something..."
    });
    var icon = this.createElement("i", {
      className: "search-icon"
    });
    icon.classList.add("ri-search-2-line");
    this.appendChild(element, [input, icon]);
    return element;
  };
  return Search;
}(Components_1.default);
exports.Search = Search;
},{"../../class/Components":"src/app/class/Components.ts"}],"src/app/components/organisims/list/List.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Components_1 = __importDefault(require("../../../class/Components"));
var Button_1 = require("../../atoms/Button");
var Text_1 = __importDefault(require("../../atoms/Text"));
var Search_1 = require("../../molecules/Search");
var Documents_1 = __importDefault(require("../documents/Documents"));
var List = /** @class */function (_super) {
  __extends(List, _super);
  function List(type, datas) {
    var _this = _super.call(this) || this;
    _this.datas = datas;
    _this.type = type;
    _this.element = _this.createListElement();
    return _this;
  }
  List.prototype.createListElement = function () {
    var _this = this;
    var element = this.createElement("div", {
      className: "page-list"
    });
    var search = new Search_1.Search([]);
    var content = this.createElement("ul", {
      className: "page-list-content"
    });
    this.datas.forEach(function (item) {
      var i = {
        title: item.title,
        description: item.description,
        createAt: item.createAt
      };
      var id = item.id;
      var itemElement = _this.createElement("li", {
        className: "page-list-content-item",
        onclick: function onclick(e) {
          e.preventDefault();
          var doc = Documents_1.default.openDocument(id, _this.type, _this.datas);
        }
      });
      itemElement.setAttribute("document-id", id);
      var itemTitle = new Text_1.default({
        value: i.title,
        type: "h3",
        className: "page-list-content-item-title"
      });
      var itemDate = new Text_1.default({
        value: i.createAt,
        type: "p",
        className: "page-list-content-item-date"
      });
      var itemDescription = new Text_1.default({
        value: i.description,
        type: "p",
        className: "page-list-content-item-description"
      });
      var itemHead = _this.createElement("div", {
        className: "page-list-content-item-content"
      });
      _this.appendChild(itemHead, [itemTitle.ELEMENT, itemDate.ELEMENT]);
      _this.appendChild(itemElement, [itemHead, itemDescription.ELEMENT]);
      _this.appendChild(content, [itemElement]);
    });
    var container = this.createElement("div", {
      className: "page-list-container"
    });
    var cta = this.createElement("div", {
      className: "page-list-cta"
    });
    var button = new Button_1.Button("Add document", "primary", "md", function () {
      console.log("create new document by type");
    });
    this.appendChild(container, [content]);
    this.appendChild(cta, [button.element]);
    this.appendChild(element, [search.element, container, cta]);
    return element;
  };
  List.prototype.find = function () {};
  List.prototype.add = function () {};
  List.prototype.remove = function () {};
  List.prototype.edit = function () {};
  return List;
}(Components_1.default);
exports.default = List;
},{"../../../class/Components":"src/app/class/Components.ts","../../atoms/Button":"src/app/components/atoms/Button.ts","../../atoms/Text":"src/app/components/atoms/Text.ts","../../molecules/Search":"src/app/components/molecules/Search.ts","../documents/Documents":"src/app/components/organisims/documents/Documents.ts"}],"src/app/components/pages/Page.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = void 0;
var Components_1 = __importDefault(require("../../class/Components"));
var Documents_1 = __importDefault(require("../organisims/documents/Documents"));
var List_1 = __importDefault(require("../organisims/list/List"));
var Page = /** @class */function (_super) {
  __extends(Page, _super);
  function Page(type) {
    var _this = _super.call(this) || this;
    _this.type = type;
    _this.element = _this.createPageElement();
    return _this;
  }
  Page.prototype.createPageElement = function () {
    var _this = this;
    var element = this.createElement("div", {
      className: "page"
    });
    element.setAttribute("pageType", this.type);
    var pageDocument = this.createElement("section", {
      className: "page-document"
    });
    var root = document.querySelector("#app");
    var oldPage = root === null || root === void 0 ? void 0 : root.querySelector(".page");
    this.createList().then(function (list) {
      if (oldPage) {
        root === null || root === void 0 ? void 0 : root.removeChild(oldPage);
      }
      _this.appendChild(element, [list.element, pageDocument]);
      root === null || root === void 0 ? void 0 : root.appendChild(element);
    });
    return element;
  };
  Page.prototype.createList = function () {
    return __awaiter(this, void 0, void 0, function () {
      var datas, list;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.pageHandler(this.type);
            return [4 /*yield*/, Documents_1.default.getDocumentDatas(this.type)];
          case 1:
            datas = _a.sent();
            list = new List_1.default(this.type, datas);
            this.list = list;
            return [2 /*return*/, list];
        }
      });
    });
  };
  Page.prototype.pageHandler = function (type) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (type === "settings") {
          this.modalHandler();
          return [2 /*return*/];
        }

        return [2 /*return*/];
      });
    });
  };

  Page.prototype.modalHandler = function () {
    console.log("open setting modal");
  };
  return Page;
}(Components_1.default);
exports.Page = Page;
},{"../../class/Components":"src/app/class/Components.ts","../organisims/documents/Documents":"src/app/components/organisims/documents/Documents.ts","../organisims/list/List":"src/app/components/organisims/list/List.ts"}],"src/app/components/organisims/sidebar/Menu.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItems = exports.Menu = void 0;
var Components_1 = __importDefault(require("../../../class/Components"));
var Page_1 = require("../../pages/Page");
var Menu = /** @class */function (_super) {
  __extends(Menu, _super);
  function Menu() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Menu.prototype.createMenu = function (menu) {
    var element = _super.prototype.createElement.call(this, "div", {
      className: "menu"
    });
    var list = _super.prototype.createElement.call(this, "ul", {
      className: "menu-list"
    });
    var label = _super.prototype.createElement.call(this, "h4", {
      className: "menu-list-label",
      textContent: menu.label
    });
    var items = [];
    menu.items.forEach(function (item) {
      items.push(new MenuItems(item, cb).element);
      function cb(type) {
        return __awaiter(this, void 0, void 0, function () {
          var page;
          return __generator(this, function (_a) {
            if (type === "settings") {
              //settings modal handler
              console.log("setting handler");
              return [2 /*return*/];
            }

            page = new Page_1.Page(type);
            return [2 /*return*/];
          });
        });
      }
    });

    this.appendChild(list, items);
    this.appendChild(element, [label, list]);
    return element;
  };
  return Menu;
}(Components_1.default);
exports.Menu = Menu;
var MenuItems = /** @class */function (_super) {
  __extends(MenuItems, _super);
  function MenuItems(options, cb) {
    var _this = _super.call(this) || this;
    _this.label = options.label;
    _this.icon = options.icon;
    _this.path = options.path;
    _this.element = _this.createItemsElement();
    _this.cb = cb;
    return _this;
  }
  MenuItems.prototype.onClick = function (e) {
    e.preventDefault();
    this.cb(this.path);
  };
  MenuItems.prototype.createItemsElement = function () {
    var element = this.createElement("li", {
      className: "menu-list-item",
      onclick: this.onClick.bind(this)
    });
    element.setAttribute("path", this.path);
    var icon = this.createElement("span", {
      className: "menu-list-item-icon",
      innerHTML: "<i class=\"".concat(this.icon, "\"></i>")
    });
    var label = this.createElement("span", {
      className: "menu-list-item-label",
      textContent: this.label
    });
    this.appendChild(element, [icon, label]);
    return element;
  };
  return MenuItems;
}(Components_1.default);
exports.MenuItems = MenuItems;
},{"../../../class/Components":"src/app/class/Components.ts","../../pages/Page":"src/app/components/pages/Page.ts"}],"src/app/components/organisims/sidebar/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
exports.config = {
  menus: [{
    label: "Application",
    items: [{
      label: "Notes",
      icon: "ri-sticky-note-line",
      path: "notesDocuments"
    }, {
      label: "Project & Tasks",
      icon: "ri-task-line",
      path: "tasksDocuments"
    }, {
      label: "Ai documents",
      icon: "ri-openai-line",
      path: "aiDocuments"
    }, {
      label: "Settings",
      icon: "ri-settings-4-line",
      path: "settings"
    }]
  }]
};
},{}],"src/app/components/organisims/sidebar/Sidebar.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideBar = void 0;
var Components_1 = __importDefault(require("../../../class/Components"));
var Menu_1 = require("./Menu");
var config_1 = require("./config");
var SideBar = /** @class */function (_super) {
  __extends(SideBar, _super);
  function SideBar() {
    var _this = _super.call(this) || this;
    _this.element = _this.createSidebarElement();
    return _this;
  }
  SideBar.prototype.createSidebarElement = function () {
    var element = this.createElement("div", {
      className: "sidebar"
    });
    var toggler = this.createElement("button", {
      className: "sidebar-toggler",
      innerHTML: "<i class='ri-side-bar-fill'></i>",
      onclick: this.togglerSidebar
    });
    toggler.setAttribute("tooltip", "true");
    toggler.setAttribute("tooltip-position", "right");
    toggler.setAttribute("tooltip-label", "Close sidebar");
    toggler.setAttribute("tooltip-color", "white");
    var navigation = this.createElement("div", {
      className: "sidebar-menu"
    });
    var menus = [];
    config_1.config.menus.forEach(function (menu) {
      var m = new Menu_1.Menu().createMenu(menu);
      menus.push(m);
    });
    this.appendChild(navigation, menus);
    this.appendChild(element, [toggler, navigation]);
    return element;
  };
  SideBar.prototype.togglerSidebar = function (e) {
    e.preventDefault();
    console.log(e.currentTarget);
  };
  return SideBar;
}(Components_1.default);
exports.SideBar = SideBar;
},{"../../../class/Components":"src/app/class/Components.ts","./Menu":"src/app/components/organisims/sidebar/Menu.ts","./config":"src/app/components/organisims/sidebar/config.ts"}],"src/app/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Tooltip_1 = __importDefault(require("./components/molecules/Tooltip"));
var Sidebar_1 = require("./components/organisims/sidebar/Sidebar");
var App = /** @class */function () {
  function App() {
    this.root = document.getElementById("app");
    if (!this.root) return;
    this.renderComponents();
  }
  App.prototype.renderComponents = function () {
    this.renderSidebar();
    this.initTooltip();
  };
  App.prototype.renderSidebar = function () {
    var _a;
    var sidebar = new Sidebar_1.SideBar().element;
    (_a = this.root) === null || _a === void 0 ? void 0 : _a.append(sidebar);
  };
  App.prototype.initTooltip = function () {
    var targets = Array.from(document.querySelectorAll("[tooltip]"));
    var params;
    targets.forEach(function (target) {
      if (!target.getAttribute("tooltip-label") && !target.getAttribute("tooltip-position")) return;
      params = {
        label: String(target.getAttribute("tooltip-label")),
        position: String(target.getAttribute("tooltip-position")),
        color: String(target.getAttribute("tooltip-color"))
      };
      new Tooltip_1.default(params.label, params.position, target, params.color);
    });
  };
  return App;
}();
new App();
},{"./components/molecules/Tooltip":"src/app/components/molecules/Tooltip.ts","./components/organisims/sidebar/Sidebar":"src/app/components/organisims/sidebar/Sidebar.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57428" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app/index.ts"], null)
//# sourceMappingURL=/app.1cf66387.js.map