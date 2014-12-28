/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
	  __hasProp = {}.hasOwnProperty;

	$(function() {
	  var Project, draw_tag, projects, radioactive, refresh, serial, serial_cell, split_tags, tag_manager, tag_types, tagman, _;
	  if ($('.projects2').length === 0) {
	    return;
	  }
	  radioactive = __webpack_require__(4);
	  _ = __webpack_require__(2);
	  tag_manager = __webpack_require__(1);
	  __webpack_require__(3)(radioactive, jQuery, window.document);
	  tag_types = {
	    role: {
	      label: 'Role'
	    },
	    type: {
	      label: 'Type'
	    },
	    tech: {
	      label: 'Tech'
	    },
	    activity: {
	      label: 'Activity'
	    },
	    license: {
	      label: 'License'
	    },
	    status: {
	      label: 'Status'
	    },
	    owner: {
	      label: 'Owner/Contributor'
	    }
	  };
	  serial = (function(i) {
	    return function() {
	      return i++;
	    };
	  })(0);
	  split_tags = function(str) {
	    return (str || '').split(',').map(function(x) {
	      return x.trim();
	    }).filter(function(x) {
	      return x !== '';
	    });
	  };
	  serial_cell = radioactive(serial());
	  tagman = void 0;
	  Project = (function() {
	    function Project($e) {
	      this.$e = $e;
	      this._id = 'project' + serial();
	    }

	    Project.prototype.id = function() {
	      return this._id;
	    };

	    Project.prototype.is_visible = function() {
	      return tagman.is_visible(this.id());
	    };

	    Project.prototype.tags = function() {
	      return split_tags(this.$e.data('tags'));
	    };

	    Project.prototype.refresh = function() {
	      if (this.is_visible()) {
	        return this.$e.show();
	      } else {
	        return this.$e.hide();
	      }
	    };

	    return Project;

	  })();
	  projects = $('ul.projects-source > li').toArray().map(function(x) {
	    return new Project($(x));
	  });
	  (function(config) {
	    projects.forEach(function(p) {
	      return config[p.id()] = p.tags();
	    });
	    return tagman = tag_manager(config);
	  })({});
	  refresh = function() {
	    return serial_cell(serial());
	  };
	  radioactive(function() {
	    serial_cell();
	    return projects.forEach(function(p) {
	      return p.refresh();
	    });
	  });
	  draw_tag = function(tag) {
	    var count, disabled, selected, state;
	    selected = function() {
	      serial_cell();
	      return __indexOf.call(tagman.selected_tags(), tag) >= 0;
	    };
	    count = function() {
	      serial_cell();
	      return tagman.count_for_tag(tag);
	    };
	    disabled = function() {
	      return count() === 0;
	    };
	    state = function() {
	      if (selected()) {
	        return 'selected';
	      } else if (disabled()) {
	        return 'disabled';
	      } else {
	        return 'normal';
	      }
	    };
	    return 'li.button.tag-button'._({
	      "class": function() {
	        return 'tag-button-' + state();
	      },
	      _onclick: function() {
	        if (!disabled()) {
	          tagman.toggle_tag(tag);
	          return refresh();
	        }
	      }
	    }, function() {
	      'span'._(tag.split(':')[1]);
	      return 'span.tag-counter'._(function() {
	        if (selected() || disabled()) {
	          return '';
	        } else {
	          return count() + '';
	        }
	      });
	    });
	  };
	  return $('#projects-core-header').append('div'._(function() {
	    'div'._({
	      $width: '15px'
	    }, ' ');
	    return 'ul.tag-list'._(function() {
	      var k, v, _results;
	      _results = [];
	      for (k in tag_types) {
	        if (!__hasProp.call(tag_types, k)) continue;
	        v = tag_types[k];
	        _results.push((function(k, v) {
	          'li h4'._(v.label);
	          return tagman.all_tags().forEach(function(tag) {
	            if (tag.split(':')[0] === k) {
	              return draw_tag(tag);
	            }
	          });
	        })(k, v));
	      }
	      return _results;
	    });
	  }));
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var TagManager, test, _,
	  __hasProp = {}.hasOwnProperty,
	  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	_ = __webpack_require__(2);

	TagManager = (function() {
	  function TagManager(id2tags) {
	    this.id2tags = id2tags;
	    this._tags = {};
	  }

	  TagManager.prototype.selected_tags = function() {
	    var k, v, _ref, _results;
	    _ref = this._tags;
	    _results = [];
	    for (k in _ref) {
	      if (!__hasProp.call(_ref, k)) continue;
	      v = _ref[k];
	      if (v === true) {
	        _results.push(k);
	      }
	    }
	    return _results;
	  };

	  TagManager.prototype.toggle_tag = function(tag) {
	    return this._tags[tag] = this._tags[tag] === true ? false : true;
	  };

	  TagManager.prototype.select_tag = function(tag) {
	    return this._tags[tag] = true;
	  };

	  TagManager.prototype.deselect_tag = function(tag) {
	    return this._tags[tag] = false;
	  };

	  TagManager.prototype.count_for_tag = function(tag) {
	    var count, x;
	    x = this._tags[tag];
	    this._tags[tag] = true;
	    count = this.visible_ids().length;
	    this._tags[tag] = x;
	    return count;
	  };

	  TagManager.prototype.all_tags = function() {
	    var _this = this;
	    return this._all_tags != null ? this._all_tags : this._all_tags = (function() {
	      var id, k, r, t, tags, _i, _len, _ref, _results;
	      r = {};
	      _ref = _this.id2tags;
	      for (id in _ref) {
	        if (!__hasProp.call(_ref, id)) continue;
	        tags = _ref[id];
	        for (_i = 0, _len = tags.length; _i < _len; _i++) {
	          t = tags[_i];
	          r[t] = true;
	        }
	      }
	      _results = [];
	      for (k in r) {
	        if (!__hasProp.call(r, k)) continue;
	        _results.push(k);
	      }
	      return _results;
	    })();
	  };

	  TagManager.prototype.is_visible = function(id) {
	    var st, tags,
	      _this = this;
	    st = this.selected_tags();
	    if (st.length === 0) {
	      return true;
	    }
	    tags = this.id2tags[id] || [];
	    if (!_.every(st, function(x) {
	      return __indexOf.call(_this.id2tags[id], x) >= 0;
	    })) {
	      return false;
	    }
	    return true;
	  };

	  TagManager.prototype.visible_ids = function() {
	    var id, _ref, _results;
	    _ref = this.id2tags;
	    _results = [];
	    for (id in _ref) {
	      if (!__hasProp.call(_ref, id)) continue;
	      if (this.is_visible(id)) {
	        _results.push(id);
	      }
	    }
	    return _results;
	  };

	  return TagManager;

	})();

	module.exports = function(x) {
	  return new TagManager(x);
	};

	test = function() {
	  var tm;
	  tm = new TagManager({
	    aldo: ['person', 'mammal'],
	    mambo: ['dog', 'mammal'],
	    bob: ['person', 'robot']
	  });
	  console.log(tm.all_tags());
	  console.log(tm.visible_ids());
	  tm.select_tag('person');
	  console.log(tm.selected_tags());
	  console.log(tm.visible_ids());
	  console.log(tm.count_for_tag('person'));
	  console.log(tm.count_for_tag('mammal'));
	  tm.select_tag('mammal');
	  return console.log(tm.visible_ids());
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.7.0
	//     http://underscorejs.org
	//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    concat           = ArrayProto.concat,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind;

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.7.0';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var createCallback = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  _.iteratee = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return createCallback(value, context, argCount);
	    if (_.isObject(value)) return _.matches(value);
	    return _.property(value);
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    if (obj == null) return obj;
	    iteratee = createCallback(iteratee, context);
	    var i, length = obj.length;
	    if (length === +length) {
	      for (i = 0; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    if (obj == null) return [];
	    iteratee = _.iteratee(iteratee, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length),
	        currentKey;
	    for (var index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  var reduceError = 'Reduce of empty array with no initial value';

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
	    if (obj == null) obj = [];
	    iteratee = createCallback(iteratee, context, 4);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index = 0, currentKey;
	    if (arguments.length < 3) {
	      if (!length) throw new TypeError(reduceError);
	      memo = obj[keys ? keys[index++] : index++];
	    }
	    for (; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
	    if (obj == null) obj = [];
	    iteratee = createCallback(iteratee, context, 4);
	    var keys = obj.length !== + obj.length && _.keys(obj),
	        index = (keys || obj).length,
	        currentKey;
	    if (arguments.length < 3) {
	      if (!index) throw new TypeError(reduceError);
	      memo = obj[keys ? keys[--index] : --index];
	    }
	    while (index--) {
	      currentKey = keys ? keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var result;
	    predicate = _.iteratee(predicate, context);
	    _.some(obj, function(value, index, list) {
	      if (predicate(value, index, list)) {
	        result = value;
	        return true;
	      }
	    });
	    return result;
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    if (obj == null) return results;
	    predicate = _.iteratee(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    if (obj == null) return true;
	    predicate = _.iteratee(predicate, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index, currentKey;
	    for (index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    if (obj == null) return false;
	    predicate = _.iteratee(predicate, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index, currentKey;
	    for (index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given value (using `===`).
	  // Aliased as `include`.
	  _.contains = _.include = function(obj, target) {
	    if (obj == null) return false;
	    if (obj.length !== +obj.length) obj = _.values(obj);
	    return _.indexOf(obj, target) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      return (isFunc ? method : value[method]).apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matches(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matches(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = obj.length === +obj.length ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = obj.length === +obj.length ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (obj.length !== +obj.length) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = _.iteratee(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = _.iteratee(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = array.length;
	    while (low < high) {
	      var mid = low + high >>> 1;
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (obj.length === +obj.length) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = _.iteratee(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    if (n < 0) return [];
	    return slice.call(array, 0, n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N. The **guard** check allows it to work with
	  // `_.map`.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array. The **guard** check allows it to work with `_.map`.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return slice.call(array, Math.max(array.length - n, 0));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array. The **guard**
	  // check allows it to work with `_.map`.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, output) {
	    if (shallow && _.every(input, _.isArray)) {
	      return concat.apply(output, input);
	    }
	    for (var i = 0, length = input.length; i < length; i++) {
	      var value = input[i];
	      if (!_.isArray(value) && !_.isArguments(value)) {
	        if (!strict) output.push(value);
	      } else if (shallow) {
	        push.apply(output, value);
	      } else {
	        flatten(value, shallow, strict, output);
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false, []);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (array == null) return [];
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = array.length; i < length; i++) {
	      var value = array[i];
	      if (isSorted) {
	        if (!i || seen !== value) result.push(value);
	        seen = value;
	      } else if (iteratee) {
	        var computed = iteratee(value, i, array);
	        if (_.indexOf(seen, computed) < 0) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (_.indexOf(result, value) < 0) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true, []));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    if (array == null) return [];
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = array.length; i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(slice.call(arguments, 1), true, true, []);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function(array) {
	    if (array == null) return [];
	    var length = _.max(arguments, 'length').length;
	    var results = Array(length);
	    for (var i = 0; i < length; i++) {
	      results[i] = _.pluck(arguments, i);
	    }
	    return results;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    if (list == null) return {};
	    var result = {};
	    for (var i = 0, length = list.length; i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = function(array, item, isSorted) {
	    if (array == null) return -1;
	    var i = 0, length = array.length;
	    if (isSorted) {
	      if (typeof isSorted == 'number') {
	        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
	      } else {
	        i = _.sortedIndex(array, item);
	        return array[i] === item ? i : -1;
	      }
	    }
	    for (; i < length; i++) if (array[i] === item) return i;
	    return -1;
	  };

	  _.lastIndexOf = function(array, item, from) {
	    if (array == null) return -1;
	    var idx = array.length;
	    if (typeof from == 'number') {
	      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
	    }
	    while (--idx >= 0) if (array[idx] === item) return idx;
	    return -1;
	  };

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (arguments.length <= 1) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Reusable constructor function for prototype setting.
	  var Ctor = function(){};

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    var args, bound;
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    args = slice.call(arguments, 2);
	    bound = function() {
	      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
	      Ctor.prototype = func.prototype;
	      var self = new Ctor;
	      Ctor.prototype = null;
	      var result = func.apply(self, args.concat(slice.call(arguments)));
	      if (_.isObject(result)) return result;
	      return self;
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    return function() {
	      var position = 0;
	      var args = boundArgs.slice();
	      for (var i = 0, length = args.length; i < length; i++) {
	        if (args[i] === _) args[i] = arguments[position++];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return func.apply(this, args);
	    };
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = hasher ? hasher.apply(this, arguments) : key;
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = function(func) {
	    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
	  };

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        clearTimeout(timeout);
	        timeout = null;
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last > 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed after being called N times.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed before being called N times.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      } else {
	        func = null;
	      }
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Retrieve the names of an object's properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      source = arguments[i];
	      for (prop in source) {
	        if (hasOwnProperty.call(source, prop)) {
	            obj[prop] = source[prop];
	        }
	      }
	    }
	    return obj;
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(obj, iteratee, context) {
	    var result = {}, key;
	    if (obj == null) return result;
	    if (_.isFunction(iteratee)) {
	      iteratee = createCallback(iteratee, context);
	      for (key in obj) {
	        var value = obj[key];
	        if (iteratee(value, key, obj)) result[key] = value;
	      }
	    } else {
	      var keys = concat.apply([], slice.call(arguments, 1));
	      obj = new Object(obj);
	      for (var i = 0, length = keys.length; i < length; i++) {
	        key = keys[i];
	        if (key in obj) result[key] = obj[key];
	      }
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      var source = arguments[i];
	      for (var prop in source) {
	        if (obj[prop] === void 0) obj[prop] = source[prop];
	      }
	    }
	    return obj;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	    if (typeof a != 'object' || typeof b != 'object') return false;
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	    // Objects with different constructors are not equivalent, but `Object`s
	    // from different frames are.
	    var aCtor = a.constructor, bCtor = b.constructor;
	    if (
	      aCtor !== bCtor &&
	      // Handle Object.create(x) cases
	      'constructor' in a && 'constructor' in b &&
	      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	        _.isFunction(bCtor) && bCtor instanceof bCtor)
	    ) {
	      return false;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size, result;
	    // Recursively compare objects and arrays.
	    if (className === '[object Array]') {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      size = a.length;
	      result = size === b.length;
	      if (result) {
	        // Deep compare the contents, ignoring non-numeric properties.
	        while (size--) {
	          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	        }
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      size = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      result = _.keys(b).length === size;
	      if (result) {
	        while (size--) {
	          // Deep compare each member
	          key = keys[size];
	          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	        }
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return result;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b, [], []);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
	    for (var key in obj) if (_.has(obj, key)) return false;
	    return true;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
	  if (true) {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = function(key) {
	    return function(obj) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
	  _.matches = function(attrs) {
	    var pairs = _.pairs(attrs), length = pairs.length;
	    return function(obj) {
	      if (obj == null) return !length;
	      obj = new Object(obj);
	      for (var i = 0; i < length; i++) {
	        var pair = pairs[i], key = pair[0];
	        if (pair[1] !== obj[key] || !(key in obj)) return false;
	      }
	      return true;
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = createCallback(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property) {
	    if (object == null) return void 0;
	    var value = object[property];
	    return _.isFunction(value) ? object[property]() : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(obj) {
	    return this._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result.call(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result.call(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result.call(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
	      return _;
	    }.apply(null, __WEBPACK_AMD_DEFINE_ARRAY__)), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.8.0
	(function() {
	  module.exports = function(radioactive, jQuery, document) {
	    var $, apply_props_on_html_node, apply_query_tag, bidibinder, collector, create_collector, create_ext, create_html, cssc, declare_insert_tag, declare_tag, declare_tag_rec, delay, env, ext_comp_innerhtml, ext_get_component_element, helpers, htmltags, interval, is_func, log_err, merge_css_classes, process_bind, reactive_snapshot, rrun, rsub, rsub_html_elm_content, rsub_now, rthp, tag_args_to_props_and_content, tpp, ut, xtype2class, xtypes;
	    env = __webpack_require__(5);
	    env.radioactive = function() {
	      return radioactive;
	    };
	    env.jQuery = function() {
	      return jQuery;
	    };
	    env.document = function() {
	      return document;
	    };
	    $ = jQuery;
	    htmltags = __webpack_require__(11);
	    create_collector = __webpack_require__(12);
	    ut = __webpack_require__(13);
	    xtypes = __webpack_require__(14);
	    rthp = __webpack_require__(6);
	    cssc = __webpack_require__(7);
	    tpp = __webpack_require__(8);
	    tag_args_to_props_and_content = __webpack_require__(9);
	    bidibinder = __webpack_require__(15);
	    helpers = __webpack_require__(10);
	    interval = ut.interval;
	    delay = ut.delay;
	    rsub = function(v, cb) {
	      if (is_func(v)) {
	        return radioactive.react(v, function(e, r) {
	          log_err(e);
	          return cb(r);
	        });
	      } else {
	        cb(v);
	        return function() {};
	      }
	    };
	    rsub_now = function(v, cb) {
	      var r;
	      r = rrun(v);
	      cb(r.error, r.result);
	      return rsub(v, cb);
	    };
	    rrun = function(f) {
	      var e;
	      try {
	        return {
	          result: radioactive.mute(f)()
	        };
	      } catch (_error) {
	        e = _error;
	        return {
	          error: e
	        };
	      }
	    };
	    log_err = function(e) {
	      ut.err(e);
	      try {
	        return window._last_error = e;
	      } catch (_error) {}
	    };
	    reactive_snapshot = function(v) {
	      if (is_func(v)) {
	        return radioactive.mute(v)();
	      } else {
	        return v;
	      }
	    };
	    is_func = function(v) {
	      return typeof v === 'function';
	    };
	    collector = create_collector();
	    merge_css_classes = function(head_classes, inline_class_decl, classflags) {
	      var merged, mfcs;
	      mfcs = [];
	      if (head_classes.length > 0) {
	        mfcs.push([head_classes, true]);
	      }
	      if (inline_class_decl != null) {
	        mfcs.push([inline_class_decl, true]);
	      }
	      ut.kv(classflags, function(clazz, flag) {
	        return mfcs.push([clazz, flag]);
	      });
	      merged = cssc.mfc(mfcs);
	      merged = merged.sort();
	      return merged.join(' ');
	    };
	    ext_comp_innerhtml = function(comp, cb) {
	      return ut.delay(1, function() {
	        var key, xxx;
	        key = '___innerhtml___';
	        if (comp[key] != null) {
	          return cb(comp[key]);
	        } else {
	          return (xxx = function() {
	            var $elm;
	            try {
	              if (($elm = $(comp.element.dom).find('.x-innerhtml')) != null) {
	                if ($elm[0] != null) {
	                  cb(comp[key] = $elm[0]);
	                  return;
	                }
	              }
	            } catch (_error) {}
	            return ut.delay(100, xxx);
	          })();
	        }
	      });
	    };
	    ext_get_component_element = function(c, cb) {
	      return ut.delay(1, function() {
	        var f;
	        if (c.element != null) {
	          return cb(c.element);
	        }
	        return c.on('initialize', f = function() {
	          cb(c.element);
	          return c.un('initialize', f);
	        });
	      });
	    };
	    apply_props_on_html_node = function($e, props) {
	      var undos;
	      undos = [];
	      props.properties["class"] = (function(c) {
	        return function() {
	          return merge_css_classes([], c, props.classflags);
	        };
	      })(props.properties["class"]);
	      (function(p) {
	        if (p._bind != null) {
	          process_bind($e, p._bind);
	          return delete p._bind;
	        }
	      })(props.properties);
	      (function(p) {
	        if (p._html != null) {
	          undos.push(rsub_now(p._html, function(v) {
	            return $e.html(v);
	          }));
	          return delete p._html;
	        }
	      })(props.properties);
	      if (props.properties._onclick != null) {
	        (function(h) {
	          var _base;
	          if ($e[0].tagName === 'A') {
	            if ((_base = props.properties).href == null) {
	              _base.href = '#';
	            }
	            return props.listeners.click = function(e) {
	              e.preventDefault();
	              return h();
	            };
	          } else {
	            return props.listeners.click = function(e) {
	              return h();
	            };
	          }
	        })(props.properties._onclick);
	        delete props.properties._onclick;
	      }
	      ut.kv(props.listeners, function(event, handler) {
	        $e.on(event, handler);
	        return undos.push(function() {
	          return $e.off(event, handler);
	        });
	      });
	      ut.kv(props.properties, function(prop, value) {
	        $e.prop(prop, reactive_snapshot);
	        return undos.push(rsub_now(value, function(v) {
	          return $e.prop(prop, v);
	        }));
	      });
	      ut.kkv(props.watchers, function(prop, event, handler) {
	        var iv;
	        if (event === '_poll') {
	          iv = setInterval((function() {
	            return handler.handler($e.prop(prop));
	          }), 300);
	          return function() {
	            return clearInterval(iv);
	          };
	        }
	      });
	      ut.kkv(props.watchers, function(prop, event, handler) {
	        var binder, fn, react_stopper;
	        if (event !== '_poll') {
	          if (handler.bidirectional) {
	            binder = bidibinder({
	              get_a: function() {
	                return handler.handler();
	              },
	              set_a: function(v) {
	                return handler.handler(v);
	              },
	              get_b: function() {
	                return $e.prop(prop);
	              },
	              set_b: function(v) {
	                return $e.prop(prop, v);
	              }
	            });
	            react_stopper = radioactive.react(function() {
	              return binder.touch_a();
	            });
	            $e.on(event, fn = function() {
	              return binder.touch_b();
	            });
	            return function() {
	              $e.off(event, fn);
	              return react_stopper();
	            };
	          } else {
	            $e.on(event, fn = function() {
	              return handler.handler($e.prop(prop));
	            });
	            return function() {
	              return $e.off(event, fn);
	            };
	          }
	        }
	      });
	      ut.kv(props.styles, function(prop, value) {
	        $e.css(prop, reactive_snapshot(value));
	        return undos.push(rsub_now(value, function(v) {
	          return $e.css(prop, v);
	        }));
	      });
	      ut.kv(props.queries, function(k, v) {
	        return undos.push(apply_query_tag($e, k, v));
	      });
	      return function() {
	        var u, _i, _len, _results;
	        _results = [];
	        for (_i = 0, _len = undos.length; _i < _len; _i++) {
	          u = undos[_i];
	          _results.push(u());
	        }
	        return _results;
	      };
	    };
	    process_bind = function($e, bind) {
	      var cell, cell_is_origin, mutex, read_only, val_on_e;
	      if (!is_func(bind)) {
	        throw new Error('_bind requires a cell (function)');
	      }
	      read_only = bind.length === 0;
	      cell_is_origin = true;
	      cell = bind;
	      mutex = false;
	      val_on_e = void 0;
	      $e.on('change', function() {
	        val_on_e = $e.val();
	        return cell(val_on_e);
	      });
	      return $e.val();
	    };
	    create_html = function(head, props, content) {
	      var $e, c, node, undos, _i, _len, _ref;
	      undos = [];
	      switch (head.tag) {
	        case 'text':
	          node = document.createTextNode('');
	          switch (typeof content) {
	            case 'function':
	              undos.push(rsub(content, function(v) {
	                return node.data = v;
	              }));
	              break;
	            case 'string':
	              node.data = content;
	              break;
	            case 'number':
	              node.data = content.toString();
	          }
	          return node;
	        default:
	          if (!htmltags(head.tag)) {
	            throw new Error('Unknown HTML tag: ' + head.tag);
	          }
	          $e = $('<' + head.tag + '>');
	          if (head.id != null) {
	            props.properties.id = head.id;
	          }
	          _ref = head.classes;
	          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	            c = _ref[_i];
	            props.classflags[c] = true;
	          }
	          undos.push(apply_props_on_html_node($e, props));
	          if (content != null) {
	            undos.push(rsub_html_elm_content($e, content));
	          }
	          return $e[0];
	      }
	    };
	    create_ext = function(head, props, content) {
	      var c, clazz, component, config, html_func_property, p, pending_subscriptions, pending_watchers, undos, _i, _j, _len, _len1, _ref, _ref1;
	      pending_subscriptions = [];
	      pending_watchers = [];
	      config = {};
	      undos = [];
	      clazz = xtype2class(head.tag.split('-').join('.'));
	      if (head.id != null) {
	        props.properties.id = head.id;
	      }
	      _ref = head.classes;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        c = _ref[_i];
	        props.classflags[c] = true;
	      }
	      props.properties.cls = (function(c) {
	        return function() {
	          return merge_css_classes([], c, props.classflags);
	        };
	      })(props.properties.cls);
	      if (props.listeners != null) {
	        config.listeners = props.listeners;
	      }

	      /*
	      TODO: accept objects with more options
	          tap:
	            fn: -> @hide()
	            single: true
	            scope: @
	       */
	      ut.kkv(props.watchers, function(prop, event, handler) {
	        if (event === '_poll') {
	          return pending_watchers.push(function(comp) {
	            var getter, intv;
	            getter = ut.getter(prop);
	            intv = setInterval((function() {
	              return handler(comp[getter]());
	            }), 300);
	            return function() {
	              return clearInterval(intv);
	            };
	          });
	        }
	      });
	      ut.kkv(props.watchers, function(prop, event, handler) {
	        if (event !== '_poll') {
	          return pending_watchers.push(function(comp) {
	            var fn, getter;
	            getter = ut.getter(prop);
	            comp.on(event, fn = function() {
	              return handler(comp[getter]());
	            });
	            return function() {
	              return comp.un(event, fn);
	            };
	          });
	        }
	      });
	      if (is_func(props.properties.html)) {
	        html_func_property = props.properties.html;
	        props.properties.html = '<div></div>';
	      }
	      ut.kv(props.properties, function(prop, value) {
	        var r;
	        if (!is_func(value)) {
	          return config[prop] = value;
	        } else {
	          r = rrun(value);
	          log_err(r.error);
	          config[prop] = r.result;
	          if (r.monitor != null) {
	            return pending_subscriptions.push(function(comp) {
	              var setter;
	              setter = ut.setter(prop);
	              if (typeof comp[setter] === 'function') {
	                return rsub(value, function(r) {
	                  return comp[setter](r);
	                });
	              } else {
	                return console.warn("Ext Component " + comp.$className + " has no setter for property '" + prop + "' and\n  you are passing a reactive function as value.\n  The value won't be updated even if it changes later on.");
	              }
	            });
	          }
	        }
	      });
	      if (is_func(content)) {
	        (function() {
	          var res;
	          res = rrun(function() {
	            return collector.run(content);
	          });
	          log_err(res.error);
	          config.items = [];
	          if (res.result instanceof Array) {
	            config.items = res.result.slice(0, -1);
	          }
	          if (res.monitor != null) {
	            return pending_subscriptions.push(function(comp) {
	              return rsub((function() {
	                return collector.run(content);
	              }), function(r) {
	                return comp.setItems(r.slice(0, -1));
	              });
	            });
	          }
	        })();
	      }
	      component = Ext().create(clazz, config);
	      if (!ut.obj_empty(props.queries)) {
	        (function() {
	          var undo_func;
	          undo_func = null;
	          undos.push(function() {
	            return typeof undo_func === "function" ? undo_func() : void 0;
	          });
	          return ext_get_component_element(component, function(elm) {
	            return ut.kv(props.queries, function(k, v) {
	              return undo_func = apply_query_tag($(elm.dom), k, v);
	            });
	          });
	        })();
	      }
	      (function() {
	        var undo_func;
	        undo_func = null;
	        undos.push(function() {
	          return typeof undo_func === "function" ? undo_func() : void 0;
	        });
	        return ext_get_component_element(component, function(elm) {
	          return ut.kv(props.styles, function(name, value) {
	            var $elm;
	            $elm = $(elm.dom);
	            return undo_func = rsub(value, function(v) {
	              return $elm.css(name, value);
	            });
	          });
	        });
	      })();
	      if (html_func_property != null) {
	        (function() {
	          var undo_func;
	          undo_func = null;
	          undos.push(function() {
	            return typeof undo_func === "function" ? undo_func() : void 0;
	          });
	          return ext_comp_innerhtml(component, function(elm) {
	            return undo_func = rsub_html_elm_content(elm, html_func_property);
	          });
	        })();
	      }
	      _ref1 = pending_subscriptions.concat(pending_watchers);
	      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	        p = _ref1[_j];
	        undos.push(p(component));
	      }
	      if (collector.defined()) {
	        collector(component);
	      }
	      component.on('destroy', function() {
	        var u, _k, _len2, _results;
	        _results = [];
	        for (_k = 0, _len2 = undos.length; _k < _len2; _k++) {
	          u = undos[_k];
	          _results.push(u());
	        }
	        return _results;
	      });
	      return component;
	    };
	    apply_query_tag = function($elm, query, raw_props) {
	      var undos;
	      undos = [];
	      if (query === '__empty__') {
	        return undos.push(apply_props_on_html_node($elm, tpp(raw_props)));
	      } else {
	        helpers.jquery_find_watch(query, $elm, function(added, removed) {
	          console.log('added', added);
	          return console.log('removed', removed);
	        });
	        return function() {};
	      }
	    };
	    rsub_html_elm_content = function(domnode, content) {
	      var elm, reset_content, set_content;
	      elm = $(domnode);
	      reset_content = function() {
	        if (elm.text() != null) {
	          elm.text('');
	        }
	        return elm.children().remove();
	      };
	      set_content = function(c) {
	        var x, _i, _len, _results;
	        if (!(c instanceof Array)) {
	          return set_content([c]);
	        }
	        reset_content();
	        c = c.concat();
	        if (c.length > 1) {
	          c.pop();
	        }
	        c = ut.collapse_arr(c);
	        if (c.length === 0) {
	          return;
	        }
	        _results = [];
	        for (_i = 0, _len = c.length; _i < _len; _i++) {
	          x = c[_i];
	          _results.push((function(x) {
	            switch (typeof x) {
	              case 'string':
	                return elm.text(x);
	              case 'number':
	                return elm.text(x + '');
	              case 'object':
	                if (helpers.is_dom_node(x)) {
	                  return elm.append(x);
	                } else if (helpers.is_jquery_obj(x)) {
	                  return elm.append(x);
	                } else if (helpers.is_ext_component(x)) {
	                  if (x.getHeight() === null) {
	                    console.warn("When adding an Ext component as child to a DOM node\nYou need to set height manually\n( it won't participate in the framework's layout )");
	                  }
	                  return elm.append(x.element.dom);
	                } else {
	                  return console.error("Don't know how to add this child to a DOMNode ", x);
	                }
	            }
	          })(x));
	        }
	        return _results;
	      };
	      if (is_func(content)) {
	        return rsub((function() {
	          return collector.run(content);
	        }), set_content);
	      } else {
	        return set_content(content);
	      }
	    };
	    String.prototype._ = function() {
	      var do_collect, do_return, ret, str;
	      str = this + '';
	      if (str === '') {
	        str = 'ra:insert';
	      }
	      do_collect = collector.defined();
	      do_return = !collector.defined();
	      if (str.indexOf('<<') === 0) {
	        str = str.substring(2);
	        do_collect = true;
	        do_return = true;
	      } else if (str.indexOf('<') === 0) {
	        str = str.substring(1);
	        do_collect = false;
	        do_return = true;
	      }
	      do_return = true;
	      ret = declare_tag_rec(str, ut.arr(arguments), !do_collect);
	      if (do_return) {
	        if (ret instanceof Array) {
	          return ret[0];
	        } else {
	          return ret;
	        }
	      } else {
	        return void 0;
	      }
	    };
	    declare_insert_tag = function(args) {
	      var e, res, x, _i, _len;
	      if (args.length !== 1) {
	        throw new Error('insert tag takes exactly one argument');
	      }
	      e = args[0];
	      if (!(e instanceof Array)) {
	        e = [e];
	      }
	      for (_i = 0, _len = e.length; _i < _len; _i++) {
	        x = e[_i];
	        collector(res = is_func(x) ? x() : x);
	      }
	      res;
	      return void 0;
	    };
	    declare_tag_rec = function(head, args, dont_collect) {
	      if (dont_collect == null) {
	        dont_collect = false;
	      }
	      if (!(head instanceof Array)) {
	        head = head.split(' ');
	      }
	      return declare_tag(head.shift(), (head.length === 0 ? args : [
	        function() {
	          return declare_tag_rec(head, args);
	        }
	      ]), dont_collect);
	    };
	    declare_tag = function(head_str, args, dont_collect) {
	      var content, head, n, ns, props, ta2pc, _ref;
	      if (dont_collect == null) {
	        dont_collect = false;
	      }
	      ta2pc = tag_args_to_props_and_content;
	      head_str = head_str.trim();
	      head = rthp(head_str);
	      ns = head.ns || 'html';
	      if (ns === 'ra') {
	        switch (head.tag) {
	          case 'each':
	            throw new Error('ra:each not implemented yet');
	            break;
	          case 'insert':
	            return declare_insert_tag(args);
	        }
	      } else {
	        _ref = ta2pc(args), props = _ref.props, content = _ref.content;
	        props = tpp(props);
	        switch (ns) {
	          case 'html':
	            n = create_html(head, props, content);
	            if (collector.defined() && (!dont_collect)) {
	              collector(n);
	            }
	            return n;
	          case 'ext':
	            return create_ext(head, props, content);
	          default:
	            throw new Error('unrecognized namespace ' + ns);
	        }
	      }
	    };
	    xtype2class = function(t) {
	      if (t.indexOf(".") === -1) {
	        return xtypes[t];
	      } else {
	        return t;
	      }
	    };
	    return {
	      "export": function(context) {
	        var tag, tags, _i, _len, _results;
	        tags = 'a p'.split(' ');
	        _results = [];
	        for (_i = 0, _len = tags.length; _i < _len; _i++) {
	          tag = tags[_i];
	          _results.push((function(tag) {
	            return context[tag.toUpperCase()] = function() {
	              return String.prototype._.apply(tag, arguments);
	            };
	          })(tag));
	        }
	        return _results;
	      }
	    };
	  };

	}).call(this);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var Base, BasicEventEmitter, BasicEventEmitterHandler, DEBUG, DEFAULT_LOOP_DELAY, EQUALS, GLOBAL, Iterator, LOOP_ITERATIONS_TO_SURVIVE, Monitor, MonitorListenerProxy, Notifier, NotifierPool, NotifierPoolWithValue, PartialResultMarker, PendingSignal, ReactiveEval, ReactiveEvalResult, ReactiveLoop, StackVal, StopSignal, Token, Try, VERSION, WIKI_URL, build_cell, build_public_api, compare_semver, conditional_build, debug_error, delay, distinct, fork, intercept, is_pending, is_special_error, loop_with_callback, next_tick, poll, promise_xor_callback, radioactive_data, rxjs, serial, syncify, tap, throttle, throttler,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  VERSION = '1.0.0';

	  serial = (function() {
	    var ii;
	    ii = 0;
	    return function() {
	      return ii++;
	    };
	  })();

	  WIKI_URL = 'https://github.com/radioactive/radioactive/wiki';

	  DEBUG = true;

	  DEFAULT_LOOP_DELAY = 10;

	  LOOP_ITERATIONS_TO_SURVIVE = 2;

	  is_special_error = function(e) {
	    return e instanceof PendingSignal || e instanceof StopSignal;
	  };

	  debug_error = function(e) {
	    if (DEBUG && (e != null) && !is_special_error(e)) {
	      return console.log(e);
	    }
	  };

	  next_tick = function(f) {
	    return setTimeout(f, 1);
	  };

	  tap = function(v) {
	    return function(f) {
	      f(v);
	      return v;
	    };
	  };

	  delay = function() {
	    return setTimeout(arguments[1], arguments[0]);
	  };

	  EQUALS = function(a, b) {
	    return a === b;
	  };

	  throttler = function(ms) {
	    var t;
	    t = void 0;
	    return function(f) {
	      if (t != null) {
	        clearTimeout(t);
	      }
	      if (f != null) {
	        return t = setTimeout(f, ms);
	      }
	    };
	  };

	  PendingSignal = (function(_super) {
	    __extends(PendingSignal, _super);

	    function PendingSignal() {
	      PendingSignal.__super__.constructor.call(this, "PendingSignal");
	    }

	    return PendingSignal;

	  })(Error);

	  StopSignal = (function(_super) {
	    __extends(StopSignal, _super);

	    function StopSignal() {
	      StopSignal.__super__.constructor.call(this);
	    }

	    return StopSignal;

	  })(Error);

	  BasicEventEmitter = (function() {
	    function BasicEventEmitter() {
	      this._request_cleanup = false;
	      this._handlers = [];
	    }

	    BasicEventEmitter.prototype.emit = function(type, payload) {
	      this._handlers.forEach((function(_this) {
	        return function(h) {
	          if (h.type === type && 0 === h.fire(payload)) {
	            return _this._request_cleanup = true;
	          }
	        };
	      })(this));
	      return this._cleanup();
	    };

	    BasicEventEmitter.prototype.on = function(type, f) {
	      return this._upsert(type, f, -1);
	    };

	    BasicEventEmitter.prototype.once = function(type, f) {
	      return this._upsert(type, f, 1);
	    };

	    BasicEventEmitter.prototype.off = function(type, f) {
	      return this._upsert(type, f, 0);
	    };

	    BasicEventEmitter.prototype.removeListener = function(type, f) {
	      return this.off(type, f);
	    };

	    BasicEventEmitter.prototype.removeAllListeners = function() {
	      return this._handlers = [];
	    };

	    BasicEventEmitter.prototype._cleanup = function() {
	      var h;
	      if (this._request_cleanup) {
	        this._request_cleanup = false;
	        return this._handlers = (function() {
	          var _i, _len, _ref, _results;
	          _ref = this._handlers;
	          _results = [];
	          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	            h = _ref[_i];
	            if (h.remaining !== 0) {
	              _results.push(h);
	            }
	          }
	          return _results;
	        }).call(this);
	      }
	    };

	    BasicEventEmitter.prototype._find_handler = function(type, f) {
	      var h, _i, _len, _ref;
	      _ref = this._handlers;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        h = _ref[_i];
	        if (h.equals(type, f)) {
	          return h;
	        }
	      }
	      return void 0;
	    };

	    BasicEventEmitter.prototype._upsert = function(type, f, q) {
	      var x;
	      if ((x = this._find_handler(type, f)) != null) {
	        x.update(q);
	      } else {
	        if (q === 0) {
	          return;
	        }
	        this._handlers.push(new BasicEventEmitterHandler(type, f, q));
	      }
	      if (q === 0) {
	        this._request_cleanup = true;
	        return this._cleanup();
	      }
	    };

	    return BasicEventEmitter;

	  })();

	  BasicEventEmitterHandler = (function() {
	    function BasicEventEmitterHandler(type, func, remaining) {
	      this.type = type;
	      this.func = func;
	      this.remaining = remaining != null ? remaining : -1;
	    }

	    BasicEventEmitterHandler.prototype.update = function(q) {
	      if (this.remaining < 0 && q === 1) {
	        return;
	      }
	      return this.remaining = q;
	    };

	    BasicEventEmitterHandler.prototype.fire = function(e) {
	      if (this.remaining !== 0) {
	        this.remaining--;
	        this.func(e);
	      }
	      return this.remaining;
	    };


	    /*
	    equals(type:string, func:CB):boolean;
	    equals(other:Handler):boolean;
	     */

	    BasicEventEmitterHandler.prototype.equals = function(type, func) {
	      if (type instanceof BasicEventEmitterHandler) {
	        func = type.func;
	        type = type.type;
	      }
	      return this.type === type && this.func === func;
	    };

	    return BasicEventEmitterHandler;

	  })();

	  StackVal = (function() {
	    function StackVal() {
	      this.stack = [];
	    }

	    StackVal.prototype.defined = function() {
	      return this.stack.length > 0;
	    };

	    StackVal.prototype.run = function(expr, build) {
	      try {
	        this.stack.push(build());
	        return expr();
	      } finally {
	        this.stack.pop();
	      }
	    };

	    StackVal.prototype.get = function() {
	      if (this.defined()) {
	        return this.stack[this.stack.length - 1];
	      } else {
	        throw new Error("No value found upstack");
	      }
	    };

	    return StackVal;

	  })();

	  Base = (function(_super) {
	    __extends(Base, _super);

	    function Base() {
	      Base.__super__.constructor.call(this);
	    }

	    return Base;

	  })(BasicEventEmitter);

	  Notifier = (function(_super) {
	    __extends(Notifier, _super);

	    function Notifier(monitor) {
	      this.monitor = monitor;
	      Notifier.__super__.constructor.call(this);
	    }

	    Notifier.prototype.fire = function() {
	      return this.monitor.fire(this);
	    };

	    Notifier.prototype.cancel = function() {};

	    Notifier.prototype.is_active = function() {
	      return true;
	    };

	    Notifier.prototype.public_api = function() {
	      var api;
	      api = (function(_this) {
	        return function() {
	          return _this.fire();
	        };
	      })(this);
	      api.once = (function(_this) {
	        return function(h) {
	          return _this.once(h);
	        };
	      })(this);
	      api.off = (function(_this) {
	        return function(h) {
	          return _this.off(h);
	        };
	      })(this);
	      return api;
	    };

	    return Notifier;

	  })(Base);

	  NotifierPool = (function(_super) {
	    __extends(NotifierPool, _super);

	    function NotifierPool() {
	      NotifierPool.__super__.constructor.call(this);
	      this.notifiers = [];
	    }

	    NotifierPool.prototype.allocate = function() {
	      if (ReactiveEval.active()) {
	        return this.notifiers.push(ReactiveEval.notifier());
	      }
	    };

	    NotifierPool.prototype.cancel = function() {
	      return this._each(function(n) {
	        return n.cancel();
	      });
	    };

	    NotifierPool.prototype.fire = function() {
	      return this._each(function(n) {
	        return n.fire();
	      });
	    };

	    NotifierPool.prototype.monitor_cancelled = function() {
	      return this._each(function(n) {
	        return n.monitor_cancelled();
	      });
	    };

	    NotifierPool.prototype.sibling_fired = function() {
	      return this._each(function(n) {
	        return n.sibling_fired();
	      });
	    };

	    NotifierPool.prototype.is_active = function() {
	      var n, _i, _len, _ref;
	      _ref = this.notifiers;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        n = _ref[_i];
	        if (n.is_active()) {
	          return true;
	        }
	      }
	      return false;
	    };

	    NotifierPool.prototype._each = function(f) {
	      var ns;
	      ns = this.notifiers;
	      this.notifiers = [];
	      return ns.forEach(f);
	    };

	    return NotifierPool;

	  })(Base);

	  NotifierPoolWithValue = (function() {
	    function NotifierPoolWithValue() {
	      this.notifiers = new NotifierPool();
	      this.current = Try["null"];
	    }

	    NotifierPoolWithValue.prototype.allocate = function() {};

	    NotifierPoolWithValue.prototype.set = function(e, r) {
	      this.current = Try.resolve(e, r);
	      return this.notifiers.fire();
	    };

	    NotifierPoolWithValue.prototype.get = function() {
	      this.notifiers.allocate();
	      return this.current.get();
	    };

	    return NotifierPoolWithValue;

	  })();

	  Monitor = (function(_super) {
	    __extends(Monitor, _super);

	    function Monitor() {
	      Monitor.__super__.constructor.call(this);
	      this.notifiers = [];
	    }

	    Monitor.prototype.notifier = function() {
	      var n;
	      this.notifiers.push(n = new Notifier(this));
	      return n;
	    };

	    Monitor.prototype.cancel = function() {};

	    Monitor.prototype.fire = function() {
	      return next_tick((function(_this) {
	        return function() {
	          return _this.emit('fire');
	        };
	      })(this));
	    };

	    Monitor.prototype.bubble = function() {
	      var n;
	      if (ReactiveEval.active()) {
	        n = ReactiveEval.notifier();
	        return this.once('fire', function() {
	          return n.fire();
	        });
	      }
	    };

	    Monitor.join = function(monitors) {
	      var cb, len, notifier;
	      if (ReactiveEval.active()) {
	        notifier = ReactiveEval.notifier();
	        len = monitors.length;
	        cb = function() {
	          if (--len === 0) {
	            return notifier.fire();
	          }
	        };
	        return monitors.forEach(function(m) {
	          return m.once('fire', cb);
	        });
	      }
	    };

	    return Monitor;

	  })(Base);

	  MonitorListenerProxy = (function() {
	    function MonitorListenerProxy(handler) {
	      this.handler = handler;
	    }

	    MonitorListenerProxy.prototype.swap = function(m) {
	      var _ref, _ref1;
	      if ((_ref = this.monitor) != null) {
	        _ref.off('fire', this.handler);
	      }
	      this.monitor = m;
	      return (_ref1 = this.monitor) != null ? _ref1.once('fire', this.handler) : void 0;
	    };

	    return MonitorListenerProxy;

	  })();

	  Try = (function() {
	    function Try(error, result) {
	      this.error = error;
	      this.result = result;
	    }

	    Try.prototype.get = function() {
	      if (this.error != null) {
	        throw this.error;
	      }
	      return this.result;
	    };

	    Try.prototype.equals = function(other, comparator) {
	      if (comparator == null) {
	        comparator = void 0;
	      }
	      if (comparator == null) {
	        comparator = function(a, b) {
	          return a === b;
	        };
	      }
	      if (!(other instanceof Try)) {
	        return false;
	      }
	      if ((other.error != null) || (this.error != null)) {
	        return comparator(other.error, this.error);
	      } else {
	        return comparator(other.result, this.result);
	      }
	    };

	    Try.prototype.merge = function() {
	      if (this.error != null) {
	        return this.error;
	      } else {
	        return this.result;
	      }
	    };

	    Try["eval"] = function(expr) {
	      var e;
	      try {
	        return new Try(null, expr());
	      } catch (_error) {
	        e = _error;
	        return new Try(e);
	      }
	    };

	    Try.err = function(v) {
	      return new Try(v, null);
	    };

	    Try.res = function(v) {
	      return new Try(null, v);
	    };

	    Try.resolve = function(e, r) {
	      if (e instanceof Try) {
	        return e;
	      }
	      if (e != null) {
	        return new Try(e, null);
	      } else {
	        return new Try(null, r);
	      }
	    };

	    Try.one = function(x) {
	      if (x instanceof Error) {
	        return new Try(x);
	      } else {
	        return new Try(null, x);
	      }
	    };

	    Try["null"] = new Try(null, null);

	    return Try;

	  })();

	  Token = (function() {
	    function Token() {}

	    Token.prototype.result = null;

	    Token.prototype.partial = false;

	    Token.prototype.monitor = null;

	    return Token;

	  })();

	  Iterator = (function(_super) {
	    __extends(Iterator, _super);

	    Iterator.prototype.expired = true;

	    Iterator.prototype.last_token = null;

	    Iterator.prototype.iteration_count = 0;

	    function Iterator(expr) {
	      this.add_to_stack = __bind(this.add_to_stack, this);
	      this.update_counters = __bind(this.update_counters, this);
	      this.invalidate_service_caches = __bind(this.invalidate_service_caches, this);
	      Iterator.__super__.constructor.call(this);
	      this.expr = this.add_to_stack(this.invalidate_service_caches(this.mark_partials(this.attach_monitors(this.update_counters(this.tokenize(expr))))));
	      this.monitor_listener = new MonitorListenerProxy((function(_this) {
	        return function() {
	          _this.expired = true;
	          return _this.emit('change');
	        };
	      })(this));
	      this.cache = {};
	    }

	    Iterator.prototype.refresh = function() {
	      var t, _ref, _ref1;
	      if (this.expired) {
	        this.expired = false;
	        t = this.expr();
	        this.monitor_listener.swap(t.monitor);
	        this.last_token = t;
	        debug_error((_ref = t.result) != null ? (_ref1 = _ref.result) != null ? _ref1.error : void 0 : void 0);
	        return true;
	      } else {
	        return false;
	      }
	    };

	    Iterator.prototype.current = function() {
	      if (this.pending()) {
	        return Try["null"];
	      } else {
	        return this.last_token.result;
	      }
	    };

	    Iterator.prototype.pending = function() {
	      return this.last_token.result.error instanceof PendingSignal;
	    };

	    Iterator.prototype.expireable = function() {
	      if (this.last_token != null) {
	        return this.last_token.monitor != null;
	      } else {
	        return true;
	      }
	    };

	    Iterator.prototype.close = function() {
	      var _ref, _ref1;
	      if ((_ref = this.last_token) != null) {
	        if ((_ref1 = _ref.monitor) != null) {
	          _ref1.cancel();
	        }
	      }
	      this.monitor_listener.swap(null);
	      return this.cache = {};
	    };

	    Iterator.prototype.tokenize = function(expr) {
	      return function() {
	        return tap(new Token)(function(t) {
	          return t.result = Try["eval"](expr);
	        });
	      };
	    };

	    Iterator.prototype.attach_monitors = function(stream) {
	      return function() {
	        var r;
	        r = ReactiveEval["eval"](stream);
	        return tap(r.result)(function(t) {
	          return t.monitor = r.monitor;
	        });
	      };
	    };

	    Iterator.prototype.mark_partials = function(stream) {
	      return function() {
	        var prm;
	        prm = new PartialResultMarker;
	        return tap(prm.run(stream))(function(t) {
	          return t.partial = prm.marked;
	        });
	      };
	    };

	    Iterator.prototype.invalidate_service_caches = function(stream) {
	      return (function(_this) {
	        return function() {
	          return tap(stream())(function(t) {
	            if (!(t.partial || t.result.error instanceof PendingSignal)) {
	              return _this.cache = {};
	            }
	          });
	        };
	      })(this);
	    };

	    Iterator.prototype.update_counters = function(stream) {
	      return (function(_this) {
	        return function() {
	          return tap(stream())(function() {
	            return _this.iteration_count++;
	          });
	        };
	      })(this);
	    };

	    Iterator.prototype.add_to_stack = function(stream) {
	      return (function(_this) {
	        return function() {
	          return Iterator.stack.run(stream, function() {
	            return _this;
	          });
	        };
	      })(this);
	    };

	    Iterator.stack = new StackVal;

	    Iterator.current_cache = function() {
	      return this.stack.get().cache;
	    };

	    return Iterator;

	  })(Base);

	  ReactiveLoop = (function(_super) {
	    __extends(ReactiveLoop, _super);

	    function ReactiveLoop(expr, opts) {
	      var _base, _base1;
	      this.opts = opts != null ? opts : null;
	      this.stop = __bind(this.stop, this);
	      this._loop = __bind(this._loop, this);
	      ReactiveLoop.__super__.constructor.call(this);
	      if (this.opts == null) {
	        this.opts = {};
	      }
	      if ((_base = this.opts).debounce == null) {
	        _base.debounce = DEFAULT_LOOP_DELAY;
	      }
	      if ((_base1 = this.opts).detached == null) {
	        _base1.detached = true;
	      }
	      this.iter = new Iterator((function(_this) {
	        return function() {
	          return ReactiveLoop.stack.run(expr, function() {
	            return _this;
	          });
	        };
	      })(this));
	      this._attach_to_parent();
	      this._request_loop();
	    }

	    ReactiveLoop.prototype._request_loop = function() {
	      if (this.loop_timeout != null) {
	        clearTimeout(this.loop_timeout);
	      }
	      return this.loop_timeout = setTimeout(this._loop, this.opts.debounce);
	    };

	    ReactiveLoop.prototype._loop = function() {
	      var err;
	      if (this._eol_heuristics()) {
	        this.iter.refresh();
	        err = this.iter.current().error;
	        if (err instanceof StopSignal) {
	          return this.stop();
	        } else {
	          if (err != null) {
	            try {
	              console.log(err);
	            } catch (_error) {}
	          }
	          return this.iter.once("change", (function(_this) {
	            return function() {
	              return _this._request_loop();
	            };
	          })(this));
	        }
	      } else {
	        return this.stop();
	      }
	    };

	    ReactiveLoop.prototype.iteration_count = function() {
	      return this.iter.iteration_count;
	    };

	    ReactiveLoop.prototype.stop = function() {
	      if (this.loop_timeout != null) {
	        clearTimeout(this.loop_timeout);
	      }
	      return this.iter.close();
	    };

	    ReactiveLoop.prototype._eol_heuristics = function() {
	      var iterations_we_have_lived;
	      if (this.parent != null) {
	        iterations_we_have_lived = this.parent.iteration_count() - this.parent_iteration_count;
	        if (iterations_we_have_lived > LOOP_ITERATIONS_TO_SURVIVE) {
	          return false;
	        }
	      }
	      return true;
	    };

	    ReactiveLoop.prototype.parent = void 0;

	    ReactiveLoop.prototype.parent_iteration_count = void 0;

	    ReactiveLoop.prototype._attach_to_parent = function() {
	      if (!this.opts.detached) {
	        if (ReactiveLoop.stack.defined()) {
	          this.parent = ReactiveLoop.stack.get;
	          return this.parent_iteration_count = this.parent.iteration_count();
	        }
	      }
	    };

	    ReactiveLoop.stack = new StackVal;

	    return ReactiveLoop;

	  })(Base);

	  promise_xor_callback = function(async_func, cb) {
	    var cb2, ready, _ref;
	    ready = false;
	    cb2 = function(e, r) {
	      if (!ready) {
	        cb(e, r);
	      }
	      return ready = true;
	    };
	    return (_ref = async_func(cb2)) != null ? typeof _ref.then === "function" ? _ref.then((function(r) {
	      return cb2(void 0, r);
	    }), function(e) {
	      return cb2(e);
	    }) : void 0 : void 0;
	  };

	  syncify = function(opts) {
	    var api, cache, id, instance_scoped_cache_lazy;
	    if (typeof opts === 'function') {
	      opts = {
	        func: opts
	      };
	    }
	    if (opts.global == null) {
	      opts.global = false;
	    }
	    if (opts.ttl == null) {
	      opts.ttl = 0;
	    }
	    if (opts.hasher == null) {
	      opts.hasher = JSON.stringify;
	    }
	    id = serial();
	    instance_scoped_cache_lazy = void 0;
	    cache = function() {
	      var build, instance_scoped, iteration_scoped;
	      build = function() {
	        var cells, get, reset, reset_cell;
	        cells = {};
	        get = function(args) {
	          var key;
	          if (args.length !== opts.func.length - 1) {
	            throw new Error('Wrong number of arguments for syncified function ' + opts.func.toString());
	          }
	          key = opts.hasher(args);
	          return (cells[key] != null ? cells[key] : cells[key] = (function() {
	            var c;
	            c = build_cell(new PendingSignal);
	            c.___args = args;
	            if (opts.ttl !== 0) {
	              c.___timeout = delay(opts.ttl, function() {
	                return reset_cell(key);
	              });
	            }
	            promise_xor_callback((function(cb) {
	              return opts.func.apply(null, args.concat([cb]));
	            }), c);
	            return c;
	          })())();
	        };
	        reset_cell = function(key) {
	          var cell;
	          if ((cell = cells[key]) != null) {
	            delete cells[key];
	            if (cell.___timeout) {
	              clearTimeout(cell.___timeout);
	            }
	            if (cell.monitored()) {
	              return cell({});
	            }
	          }
	        };
	        reset = function(filter) {
	          var cell, k, _results;
	          _results = [];
	          for (k in cells) {
	            if (!__hasProp.call(cells, k)) continue;
	            cell = cells[k];
	            if ((filter == null) || filter(cell.___args)) {
	              _results.push(reset_cell(k));
	            }
	          }
	          return _results;
	        };
	        return {
	          get: get,
	          reset: reset
	        };
	      };
	      iteration_scoped = function() {
	        var _base;
	        return (_base = Iterator.current_cache())[id] != null ? _base[id] : _base[id] = build();
	      };
	      instance_scoped = function() {
	        return instance_scoped_cache_lazy != null ? instance_scoped_cache_lazy : instance_scoped_cache_lazy = build();
	      };
	      if (opts.global) {
	        return instance_scoped();
	      } else {
	        return iteration_scoped();
	      }
	    };
	    api = function() {
	      return cache().get(Array.prototype.slice.apply(arguments));
	    };
	    api.reset = function(filter) {
	      return instance_scoped_cache().reset(filter);
	    };
	    return api;
	  };

	  fork = function() {
	    var api, monitors, pending;
	    pending = 0;
	    monitors = [];
	    api = function(expr) {
	      var res;
	      res = ReactiveEval["eval"](expr);
	      if (res.result.error instanceof PendingSignal) {
	        if (res.monitor == null) {
	          throw new Error('You cannot throw a PendingSignal from a non reactive function - it will never resolve');
	        }
	        pending++;
	        monitors.push(res.monitor);
	        return null;
	      } else {
	        return res.unbox();
	      }
	    };
	    api.join = function() {
	      Monitor.join(monitors);
	      if (pending > 0) {
	        throw new PendingSignal;
	      }
	      return void 0;
	    };
	    return api;
	  };

	  PartialResultMarker = (function() {
	    function PartialResultMarker() {
	      this.mark = __bind(this.mark, this);
	    }

	    PartialResultMarker.prototype.flag = false;

	    PartialResultMarker.prototype.run = function(expr) {
	      return PartialResultMarker.stack.run(expr, (function(_this) {
	        return function() {
	          return _this;
	        };
	      })(this));
	    };

	    PartialResultMarker.prototype.mark = function() {
	      return this.flag = true;
	    };

	    PartialResultMarker.prototype.marked = function() {
	      return this.flag;
	    };

	    PartialResultMarker.stack = new StackVal;

	    PartialResultMarker.mark = function() {
	      return this.stack.get().mark();
	    };

	    return PartialResultMarker;

	  })();

	  ReactiveEval = (function() {
	    function ReactiveEval(expr) {
	      this.expr = expr;
	    }

	    ReactiveEval.prototype.lazy_monitor = function() {
	      return this._monitor != null ? this._monitor : this._monitor = new Monitor;
	    };

	    ReactiveEval.prototype.run = function() {
	      var t;
	      t = Try["eval"](this.expr);
	      return new ReactiveEvalResult(t, this._monitor);
	    };

	    ReactiveEval.prototype.allocate_notifier = function() {
	      return this.lazy_monitor().notifier();
	    };

	    ReactiveEval.stack = [];

	    ReactiveEval.notifier = function() {
	      var _ref;
	      return (_ref = this.stack[this.stack.length - 1]) != null ? _ref.allocate_notifier() : void 0;
	    };

	    ReactiveEval.active = function() {
	      return this.stack.length > 0;
	    };

	    ReactiveEval.mute = function(expr) {
	      return function() {
	        var res, _ref;
	        res = ReactiveEval["eval"](expr);
	        if ((_ref = res.monitor) != null) {
	          _ref.cancel();
	        }
	        if (is_special_error(res.result.error)) {
	          delete res.result.error;
	        }
	        return res.result.get();
	      };
	    };

	    ReactiveEval["eval"] = function(expr) {
	      var r, rev;
	      rev = new ReactiveEval(expr);
	      this.stack.push(rev);
	      r = rev.run();
	      this.stack.pop();
	      return r;
	    };

	    return ReactiveEval;

	  })();

	  ReactiveEvalResult = (function() {
	    function ReactiveEvalResult(result, monitor) {
	      this.result = result;
	      this.monitor = monitor;
	    }

	    ReactiveEvalResult.prototype.unbox = function() {
	      var _ref;
	      if ((_ref = this.monitor) != null) {
	        _ref.bubble();
	      }
	      return this.result.get();
	    };

	    return ReactiveEvalResult;

	  })();

	  build_cell = function(initial_value, opts) {
	    var api, doget, doset, doset_throttled, notifiers, throttle_timeout, value;
	    if (opts == null) {
	      opts = {};
	    }
	    if (opts.comparator == null) {
	      opts.comparator = EQUALS;
	    }
	    if (opts.throttle == null) {
	      opts.throttle = 0;
	    }
	    value = void 0;
	    notifiers = new NotifierPool;
	    throttle_timeout = void 0;
	    doget = function() {
	      notifiers.allocate();
	      return value != null ? value.get() : void 0;
	    };
	    doset_throttled = function(v) {
	      if (opts.throttle === 0) {
	        return doset(v);
	      } else {
	        if (throttle_timeout) {
	          clearTimeout(throttle_timeout);
	          throttle_timeout = void 0;
	        }
	        return throttle_timeout = delay(opts.throttle, function() {
	          return doset(v);
	        });
	      }
	    };
	    doset = function(v) {
	      var new_t;
	      new_t = v instanceof Error ? new Try(v) : new Try(null, v);
	      if (new_t.equals(value, opts.comparator)) {
	        return;
	      }
	      value = new_t;
	      return notifiers.fire();
	    };
	    api = function() {
	      var a;
	      a = arguments;
	      switch (a.length) {
	        case 0:
	          return doget();
	        case 1:
	          return doset_throttled(a[0]);
	        case 2:
	          return doset_throttled(a[0] || a[1]);
	      }
	    };
	    api.monitored = function() {
	      return notifiers.is_active();
	    };
	    if (initial_value != null) {
	      doset(initial_value);
	    }
	    return api;
	  };


	  /*
	    Wraps an expression.
	    After the expression is evaluated.
	    It will remain being re-evaluated in the back until a change is detected
	    When this happens, this function will notify()
	   */

	  poll = function(interval, expr) {
	    var iter, notifier, res, reval;
	    if (typeof interval === 'function') {
	      expr = interval;
	      interval = 300;
	    }
	    reval = function(exp) {
	      var r, _ref;
	      r = ReactiveEval["eval"](exp);
	      if ((_ref = r.monitor) != null) {
	        _ref.cancel();
	      }
	      return r.result;
	    };
	    if (!ReactiveEval.active()) {
	      return expr();
	    } else {
	      notifier = ReactiveEval.notifier();
	      res = reval(expr);
	      (iter = function() {
	        return delay(interval, function() {
	          if (notifier.is_active()) {
	            if (res.equals(reval(expr))) {
	              return iter();
	            } else {
	              return notifier.fire();
	            }
	          }
	        });
	      })();
	      return res.get();
	    }
	  };

	  throttle = function(delay, expr) {
	    var iter, notifier, res, th;
	    if (typeof delay === 'function') {
	      expr = delay;
	      delay = 300;
	    }
	    if (!ReactiveEval.active()) {
	      return expr();
	    }
	    res = ReactiveEval["eval"](expr);
	    if (res.monitor != null) {
	      th = throttler(delay);
	      notifier = ReactiveEval.notifier();
	      res.monitor.once('fire', iter = function() {
	        var r, _ref;
	        th(function() {
	          return notifier.fire();
	        });
	        r = ReactiveEval["eval"](expr);
	        return (_ref = r.monitor) != null ? _ref.once('fire', iter) : void 0;
	      });
	    }
	    return res.result.get();
	  };

	  distinct = function(expr, comparator) {
	    var v;
	    if (comparator == null) {
	      comparator = EQUALS;
	    }
	    v = intercept(expr, function(r) {
	      return !r.equals(v, comparator);
	    });
	    return v.get();
	  };

	  intercept = function(expr, predicate) {
	    var iter, notifier, res;
	    if (!ReactiveEval.active()) {
	      return Try["eval"](expr);
	    }
	    res = ReactiveEval["eval"](expr);
	    if (res.monitor != null) {
	      notifier = ReactiveEval.notifier();
	      res.monitor.once('fire', iter = function() {
	        var r, _ref, _ref1;
	        r = ReactiveEval["eval"](expr);
	        if (predicate(r.result)) {
	          if ((_ref = r.monitor) != null) {
	            _ref.cancel();
	          }
	          return next_tick(function() {
	            return notifier.fire();
	          });
	        } else {
	          return (_ref1 = r.monitor) != null ? _ref1.once('fire', iter) : void 0;
	        }
	      });
	    }
	    return res.result;
	  };

	  radioactive_data = (function() {
	    var firebase_cache, get_firebase, get_html_elm_val, get_json, json_service;
	    json_service = (function() {
	      var cached;
	      cached = void 0;
	      return function() {
	        return cached != null ? cached : cached = (function() {
	          if (typeof jQuery === "undefined" || jQuery === null) {
	            throw new Error('radioactive.data requires jQuery to issue Ajax calls');
	          }
	          return syncify(function(url, cb) {
	            return jQuery.ajax({
	              dataType: "json",
	              url: url,
	              success: function(data) {
	                return cb(null, data);
	              },
	              error: function(x, y, err) {
	                return cb(err);
	              }
	            });
	          });
	        })();
	      };
	    })();
	    get_json = function(url, opts) {
	      return function() {
	        return json_service()(url);
	      };
	    };
	    firebase_cache = {};
	    get_firebase = function(url) {
	      return firebase_cache[url] != null ? firebase_cache[url] : firebase_cache[url] = (function() {
	        var cell, ref;
	        if (typeof Firebase === "undefined" || Firebase === null) {
	          throw new Error('cannot find Firebase client library');
	        }
	        ref = new Firebase(url);
	        cell = build_cell(new PendingSignal);
	        ref.on('value', function(snap) {
	          return cell(snap.val());
	        });
	        return function() {
	          if (arguments.length === 0) {
	            return cell();
	          } else {
	            return ref.update(arguments[1]);
	          }
	        };
	      })();
	    };
	    get_html_elm_val = function($elm) {
	      var c, key;
	      if (typeof jQuery === "undefined" || jQuery === null) {
	        throw new Error('radioactive.data requires jQuery to issue read HTML UI Element values');
	      }
	      $elm.val();
	      key = 'radioactive-cell';
	      if ((c = $elm.data(key)) == null) {
	        $elm.data(key, c = build_cell($elm.val()));
	        switch ($elm[0].tagName) {
	          case 'INPUT':
	            $elm.on('keyup', function() {
	              return c($elm.val());
	            });
	            break;
	          case 'SELECT':
	            $elm.on('change', function() {
	              return c($elm.val());
	            });
	        }
	      }
	      return function() {
	        if (arguments.length === 0) {
	          return c();
	        } else {
	          return $elm.val(arguments[0]);
	        }
	      };
	    };
	    return function() {
	      var a, _ref;
	      a = arguments;
	      switch (typeof a[0]) {
	        case 'string':
	          if ((_ref = a[0][0]) === '.' || _ref === '#') {
	            return get_html_elm_val($(a[0]));
	          } else if (-1 !== a[0].indexOf('firebaseio.com')) {
	            return get_firebase(a[0]);
	          } else {
	            return get_json(a[0], a[1]);
	          }
	          break;
	        case 'object':
	          if ($(a)[0].ownerDocument != null) {
	            return get_html_elm_val($(a[0]));
	          }
	          break;
	        default:
	          throw new Error("Unknown datasource. Check " + WIKI_URL + "/radioactive.data for a list of built-in datasources");
	      }
	    };
	  })();


	  /*
	    Integration with Reactive Extensions for Javascript
	    https://github.com/Reactive-Extensions
	   */

	  rxjs = (function() {
	    var expr_roundtrip, from_rx, obs_roundtrip, resolve_rx_module, rx_module, to_rx;
	    rx_module = void 0;
	    resolve_rx_module = function() {
	      return rx_module != null ? rx_module : rx_module = (function() {
	        var e;
	        return tap((function() {
	          try {
	            return __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	          } catch (_error) {
	            e = _error;
	            return Rx;
	          }
	        })())(function(m) {
	          if (m == null) {
	            throw new Error('Rx-JS not found');
	          }
	        });
	      })();
	    };
	    from_rx = function(rx_observable) {
	      if (typeof rx_observable.subscribe !== 'function') {
	        throw new Error('Not an instance of Rx.Observable');
	      }
	      return rx_observable.__radioactive_expression != null ? rx_observable.__radioactive_expression : rx_observable.__radioactive_expression = (function() {
	        var npv, on_complete, on_err, on_next;
	        npv = new NotifierPoolWithValue;
	        npv.set(new PendingSignal);
	        on_next = function(x) {
	          return npv.set(null, x);
	        };
	        on_err = function(x) {
	          return npv.set(x, null);
	        };
	        on_complete = function() {};
	        rx_observable.subscribe(on_next, on_err, on_complete);
	        return function() {
	          return npv.get();
	        };
	      })();
	    };
	    to_rx = function(expr) {
	      return expr.__rx_observable != null ? expr.__rx_observable : expr.__rx_observable = (function() {
	        return resolve_rx_module().Observable.create(function(observer) {
	          return radioactive.react(expr, function(e, r) {
	            if (e != null) {
	              return observer.onError(e);
	            } else {
	              return observer.onNext(r);
	            }
	          });
	        });
	      })();
	    };
	    expr_roundtrip = function(expr, process_obs) {
	      return from_rx(process_obs(to_rx(expr)));
	    };
	    obs_roundtrip = function(obs, process_expr) {
	      return to_rx(process_expr(from_rx(obs)));
	    };
	    return function(a, b) {
	      switch (typeof a + ' ' + typeof b) {
	        case 'function undefined':
	          return to_rx(a);
	        case 'object undefined':
	          return from_rx(a);
	        case 'function function':
	          return expr_roundtrip(a, b);
	        case 'object function':
	          return obs_roundtrip(a, b);
	      }
	    };
	  })();

	  loop_with_callback = function(expr, cb) {
	    var stop;
	    stop = false;
	    radioactive.react(function() {
	      var e;
	      if (stop) {
	        radioactive.stop();
	      }
	      try {
	        return cb(null, expr());
	      } catch (_error) {
	        e = _error;
	        if (is_special_error(e)) {
	          throw e;
	        }
	        return cb(e);
	      }
	    });
	    return function() {
	      return stop = true;
	    };
	  };

	  is_pending = function(expr) {
	    var e;
	    try {
	      expr();
	      return false;
	    } catch (_error) {
	      e = _error;
	      if (e instanceof PendingSignal) {
	        PartialResultMarker.mark();
	        return true;
	      } else {
	        return false;
	      }
	    }
	  };

	  build_public_api = function() {
	    var internals, radioactive;
	    radioactive = function(a, b) {
	      switch (typeof a + ' ' + typeof b) {
	        case 'function undefined':
	          return radioactive.react(a);
	        case 'function function':
	          return radioactive.react(a, b);
	        default:
	          return build_cell(a);
	      }
	    };
	    radioactive.data = radioactive_data;
	    radioactive.cell = build_cell;
	    radioactive.cell.pending = function() {
	      return build_cell(new PendingSignal);
	    };
	    radioactive.active = function() {
	      return ReactiveEval.active();
	    };
	    radioactive.notifier = function(callback) {
	      var n, _ref;
	      n = (_ref = ReactiveEval.notifier()) != null ? _ref.public_api() : void 0;
	      if (callback != null) {
	        if (n != null) {
	          return callback(n);
	        }
	      } else {
	        return n;
	      }
	    };
	    radioactive.stop = function() {
	      throw new StopSignal;
	    };
	    radioactive.fork = fork;
	    radioactive.mute = function(expr) {
	      return ReactiveEval.mute(expr);
	    };
	    radioactive.poll = poll;
	    radioactive.react = function(a, b) {
	      switch (typeof a + ' ' + typeof b) {
	        case 'function undefined':
	          return new ReactiveLoop(a);
	        case 'function function':
	          return loop_with_callback(a, b);
	      }
	    };
	    radioactive.once = function(expr) {
	      return radioactive.react(function() {
	        expr();
	        return radioactive.stop();
	      });
	    };
	    radioactive.pending = function(expr, defv) {
	      switch (arguments.length) {
	        case 0:
	          throw new PendingSignal;
	          break;
	        case 1:
	          return is_pending(expr);
	        case 2:
	          if (is_pending(expr)) {
	            if (typeof defv === 'function') {
	              return defv();
	            } else {
	              return defv;
	            }
	          } else {
	            return expr();
	          }
	      }
	    };
	    radioactive.syncify = syncify;
	    radioactive.echo = function(delay_ms) {
	      var cells;
	      if (delay_ms == null) {
	        delay_ms = 1000;
	      }
	      cells = {};
	      return function(message) {
	        return (cells[message] != null ? cells[message] : cells[message] = (function() {
	          var c;
	          delay(delay_ms, function() {
	            return c(message);
	          });
	          return c = build_cell(new PendingSignal);
	        })())();
	      };
	    };
	    radioactive.time = function(interval) {
	      if (interval == null) {
	        interval = 1000;
	      }
	      if (interval > 0 && ReactiveEval.active()) {
	        setTimeout(radioactive.notifier(), interval);
	      }
	      return new Date().getTime();
	    };
	    radioactive.PendingSignal = PendingSignal;
	    radioactive.rx = rxjs;
	    radioactive.distinct = distinct;
	    radioactive.throttle = throttle;
	    radioactive.safecatch = function(error) {
	      if (is_special_error(error)) {
	        throw error;
	      }
	    };

	    /*
	      Exported internals ( for unit testing only )
	     */
	    radioactive._internals = internals = {};
	    internals.Monitor = Monitor;
	    internals.Notifier = Notifier;
	    internals.ReactiveEval = ReactiveEval;
	    internals.BasicEventEmitter = BasicEventEmitter;
	    return radioactive;
	  };

	  compare_semver = function(v1, v2) {
	    var arr, i, x, x1, x2, _i, _len;
	    v1 = (function() {
	      var _i, _len, _ref, _results;
	      _ref = v1.split('.');
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        x = _ref[_i];
	        _results.push(Number(x));
	      }
	      return _results;
	    })();
	    v2 = (function() {
	      var _i, _len, _ref, _results;
	      _ref = v2.split('.');
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        x = _ref[_i];
	        _results.push(Number(x));
	      }
	      return _results;
	    })();
	    arr = (function() {
	      var _i, _len, _results;
	      _results = [];
	      for (i = _i = 0, _len = v1.length; _i < _len; i = ++_i) {
	        x1 = v1[i];
	        x2 = v2[i];
	        if (x1 > x2) {
	          _results.push('GT');
	        } else if (x1 < x2) {
	          _results.push('LT');
	        } else {
	          _results.push('EQ');
	        }
	      }
	      return _results;
	    })();
	    for (_i = 0, _len = arr.length; _i < _len; _i++) {
	      x = arr[_i];
	      if (x === 'GT') {
	        return 'GT';
	      }
	      if (x === 'LT') {
	        return 'LT';
	      }
	    }
	    return 'EQ';
	  };

	  GLOBAL = (function() {
	    try {
	      return window;
	    } catch (_error) {
	      return global;
	    }
	  })();

	  (conditional_build = function() {
	    var create, other, other_version;
	    create = false;
	    if ((other = GLOBAL.radioactive) != null) {
	      other_version = other.version || '0.0.0';
	      if (compare_semver(VERSION, other_version) === 'GT') {
	        create = true;
	      }
	    } else {
	      create = true;
	    }
	    if (create) {
	      return GLOBAL.radioactive = GLOBAL.Ra = build_public_api();
	    }
	  })();

	  try {
	    module.exports = GLOBAL.radioactive;
	  } catch (_error) {}

	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.8.0
	(function() {
	  module.exports = {};

	}).call(this);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.8.0
	(function() {
	  var TagHead, htp, main, test;

	  htp = __webpack_require__(16);

	  TagHead = (function() {
	    function TagHead(tag, ns, id, classes) {
	      this.tag = tag;
	      this.ns = ns;
	      this.id = id;
	      this.classes = classes;
	    }

	    TagHead.prototype.toString = function() {
	      var c, clz, id;
	      id = this.id != null ? '#' + this.id : '';
	      clz = ((function() {
	        var _i, _len, _ref, _results;
	        _ref = this.classes || [];
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          c = _ref[_i];
	          _results.push('.' + c);
	        }
	        return _results;
	      }).call(this)).join('');
	      return "" + this.ns + ":" + this.tag + id + clz;
	    };

	    return TagHead;

	  })();

	  module.exports = main = function(tag) {
	    var declared_ns, parts, result;
	    if (tag instanceof TagHead) {
	      return tag;
	    }
	    if (typeof tag !== 'string') {
	      throw new Error('tag must be a string');
	    }
	    if (tag.indexOf(' ') !== -1) {
	      throw new Error('Raw tag parser handles single tags only ( no spaces ) ' + tag);
	    }
	    tag = tag.trim();
	    declared_ns = void 0;
	    parts = tag.split(':');
	    if (parts.length === 2) {
	      declared_ns = parts.shift();
	      if (parts[0].length === 0) {
	        return new TagHead(null, declared_ns);
	      }
	    }
	    result = htp(parts[0], false, false);
	    result.ns = declared_ns;
	    return new TagHead(result.tag, result.ns, result.id, result.classes);
	  };

	  main.TagHead = TagHead;

	  test = function() {
	    console.log(main('#xyz'));
	    console.log(main('ext:'));
	    console.log(main('ext:Ext-Panel'));
	    return console.log(main('foo:a#link.active'));
	  };

	}).call(this);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.8.0

	/*
	returns a ( possibly reactive ) array of strings
	 */

	(function() {
	  var css_classes, css_flag, css_flagged_classes, css_multiple_flagged_classes, test;

	  css_classes = function(v) {
	    var c;
	    if (typeof v === 'function') {
	      return css_classes(v());
	    }
	    if (typeof v === 'string') {
	      return css_classes((function() {
	        var _i, _len, _ref, _results;
	        _ref = v.trim().replace('.', ' ').split(' ');
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          c = _ref[_i];
	          if (c !== '') {
	            _results.push(c);
	          }
	        }
	        return _results;
	      })());
	    }
	    if (!(v instanceof Array)) {
	      throw new Error(' ');
	    }
	    return v;
	  };

	  css_flag = function(v) {
	    if (typeof v === 'function') {
	      return css_flag(v());
	    }
	    return !!v;
	  };

	  css_flagged_classes = function(classes, flag) {
	    if (css_flag(flag)) {
	      return css_classes(classes);
	    } else {
	      return [];
	    }
	  };

	  css_multiple_flagged_classes = function(mfc) {
	    var all, x, _i, _len;
	    if (typeof mfc === 'function') {
	      return css_multiple_flagged_classes(mfc());
	    }
	    all = [];
	    for (_i = 0, _len = mfc.length; _i < _len; _i++) {
	      x = mfc[_i];
	      all = all.concat(css_flagged_classes(x[0], x[1]));
	    }
	    return all;
	  };

	  exports.mfc = css_multiple_flagged_classes;

	  test = function() {
	    var c;
	    c = css_multiple_flagged_classes([
	      ['a', true], [
	        'b e m .ff', function() {
	          return true;
	        }
	      ], ['c', false], [['x', 'y'], true]
	    ]);
	    return console.log(c);
	  };

	}).call(this);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.8.0
	(function() {
	  var basic_validations, parse, partition, test, ut,
	    __hasProp = {}.hasOwnProperty;

	  ut = __webpack_require__(13);


	  /*
	  Generic parsing of properties
	  Returns an object with
	  
	  r =
	    classflags: 
	    styles:
	    listeners:
	    watchers:
	    properties:
	   */

	  partition = function(str, num) {
	    return [str.slice(0, num), str.slice(num, +str.length + 1 || 9e9)];
	  };

	  module.exports = parse = function(props) {
	    var event, first, k, parts, q, r, rest, splitter, v, _base, _name, _ref;
	    r = {
	      classflags: {},
	      styles: {},
	      listeners: {},
	      watchers: {},
	      properties: {},
	      queries: {}
	    };
	    for (k in props) {
	      if (!__hasProp.call(props, k)) continue;
	      v = props[k];
	      if (k === '?') {
	        k = '? ';
	      }
	      _ref = partition(k, 1), first = _ref[0], rest = _ref[1];
	      switch (first) {
	        case '?':
	          q = rest.trim();
	          if (q.length === 0) {
	            q = '__empty__';
	          }
	          r.queries[q] = v;
	          break;
	        case '.':
	          r.classflags[rest] = v;
	          break;
	        case '$':
	          (r.styles != null ? r.styles : r.styles = {})[rest] = v;
	          break;
	        default:
	          if (k.indexOf('on') === 0) {
	            (r.listeners != null ? r.listeners : r.listeners = {})[k.slice(2, +k.length + 1 || 9e9)] = v;
	          } else {
	            if (k.indexOf('$') === -1) {
	              (r.properties != null ? r.properties : r.properties = {})[k] = v;
	            } else {
	              splitter = k.indexOf('$$') === -1 ? '$' : '$$';
	              parts = k.split(splitter);
	              event = parts[1];
	              if (event.indexOf('on') === 0) {
	                event = event.slice(2, +event.length + 1 || 9e9);
	              }
	              ((_base = (r.watchers != null ? r.watchers : r.watchers = {}))[_name = parts[0]] != null ? _base[_name] : _base[_name] = {})[event] = {
	                handler: v,
	                bidirectional: splitter === '$$'
	              };
	            }
	          }
	      }
	    }
	    basic_validations(r);
	    return r;
	  };

	  basic_validations = function(t) {
	    ut.kv(t.listeners, function(event, handler) {
	      if (typeof handler !== 'function') {
	        throw new Error("'" + event + "' listener must be a function");
	      }
	    });
	    ut.kkv(t.watchers, function(prop, event, handler) {
	      if (typeof handler.handler !== 'function') {
	        throw new Error("watcher " + prop + "$$on" + event + " must be a function");
	      }
	    });
	    ut.kv(t.classflags, function(k, v) {
	      var tof;
	      tof = typeof v;
	      if (!((tof === 'boolean') || (tof === 'function'))) {
	        throw new Error("value for classflag '." + k + "' must be boolean or function ( that returns a boolean )");
	      }
	    });
	    return ut.kv(t.queries, function(k, v) {
	      if (typeof v !== 'object') {
	        throw new Error("the content of a query tag must be an object ( query: " + k + " )");
	      }
	    });
	  };

	  test = function() {
	    console.log(parse({
	      '.class': true,
	      '$style': 'style',
	      'prop': 'property',
	      'onclick': function() {},
	      'prop$$event': function() {}
	    }));
	    return console.log(parse({
	      '.class': true,
	      'prop$$event': function() {}
	    }));
	  };

	}).call(this);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.8.0
	(function() {
	  var helpers, is_content,
	    __hasProp = {}.hasOwnProperty;

	  helpers = __webpack_require__(10);


	  /*
	   */

	  module.exports = function(args) {
	    var arg, content, has_content, k, props, result, v, _i, _len;
	    args = args.concat();
	    has_content = false;
	    content = void 0;
	    if (is_content(args[args.length - 1])) {
	      content = args.pop();
	      has_content = true;
	    }
	    props = {};
	    for (_i = 0, _len = args.length; _i < _len; _i++) {
	      arg = args[_i];
	      if (typeof arg === 'object') {
	        for (k in arg) {
	          if (!__hasProp.call(arg, k)) continue;
	          v = arg[k];
	          props[k] = v;
	        }
	      }
	    }
	    result = {};
	    result.props = props;
	    if (has_content) {
	      result.content = content;
	    }
	    return result;
	  };

	  is_content = function(v) {
	    if (typeof v !== 'object') {
	      return true;
	    }
	    if (v === null) {
	      return true;
	    }
	    if (v instanceof Array) {
	      return true;
	    }
	    if (helpers.is_ext_component(v)) {
	      return true;
	    }
	    if (helpers.is_dom_node(v)) {
	      return true;
	    }
	    if (helpers.is_jquery_obj(v)) {
	      return true;
	    }
	    return false;
	  };

	}).call(this);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.8.0
	(function() {
	  var env, ut;

	  ut = __webpack_require__(13);

	  env = __webpack_require__(5);

	  module.exports = {
	    is_ext_component: function(v) {
	      try {
	        if (v instanceof Ext.Component) {
	          return true;
	        }
	      } catch (_error) {}
	      return false;
	    },
	    is_dom_node: function(v) {
	      try {
	        if (v.ownerDocument === env.document()) {
	          return true;
	        }
	      } catch (_error) {}
	      return false;
	    },
	    is_jquery_obj: function(v) {
	      try {
	        if (v instanceof env.jQuery()) {
	          return true;
	        }
	      } catch (_error) {}
	      return false;
	    },
	    jquery_find_watch: function(jquery_selector, $elm, cb, delay) {
	      var current, ival;
	      if (delay == null) {
	        delay = 50;
	      }
	      current = [];
	      ival = ut.interval(delay, function() {
	        var added, last, removed, _ref;
	        last = current;
	        current = env.jQuery()(jquery_selector, $elm).toArray();
	        _ref = ut.arrdiff(current, last), added = _ref[0], removed = _ref[1];
	        if ((added.length + removed.length) !== 0) {
	          return cb(added, removed);
	        }
	      });
	      return function() {
	        return clearInterval(ival);
	      };
	    }
	  };

	}).call(this);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.1
	(function() {
	  var build_lookup_map, lookup_map;

	  lookup_map = null;

	  module.exports = function(tag) {
	    return (lookup_map != null ? lookup_map : lookup_map = build_lookup_map())[tag.toLowerCase()] === true;
	  };

	  build_lookup_map = function() {
	    var all, k, map, obsolete, obsolete_self_closing, regular, self_closing, _i, _len;
	    regular = 'a abbr address article aside audio b bdi bdo blockquote body button canvas caption cite code colgroup datalist dd del details dfn div dl dt em fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup html i iframe ins kbd label legend li map mark menu meter nav noscript object ol optgroup option output p pre progress q rp rt ruby s samp script section select small span strong style sub summary sup table tbody td textarea tfoot th thead time title tr u ul var video';
	    self_closing = 'area base br col command embed hr img input keygen link meta param source track wbr';
	    obsolete = 'applet acronym bgsound dir frameset noframes isindex listing nextid noembed plaintext rb strike xmp big blink center font marquee multicol nobr spacer tt';
	    obsolete_self_closing = 'basefont frame';
	    all = [regular, self_closing, obsolete, obsolete_self_closing].join(' ').split(' ');
	    map = {};
	    for (_i = 0, _len = all.length; _i < _len; _i++) {
	      k = all[_i];
	      if (k !== ' ') {
	        map[k.trim()] = true;
	      }
	    }
	    return map;
	  };

	}).call(this);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var stackval;

	  stackval = __webpack_require__(19);

	  module.exports = function() {
	    var sv, x;
	    sv = stackval();
	    x = function(value) {
	      return sv.get().push(value);
	    };
	    x.attach = function(f) {
	      return function() {
	        var collected, f2;
	        collected = [];
	        f2 = sv.attach(f, function() {
	          return collected;
	        });
	        return collected.concat([f2.apply(this, arguments)]);
	      };
	    };
	    x.run = function(f) {
	      return x.attach(f)();
	    };
	    x.defined = function() {
	      return sv.defined();
	    };
	    x.collect = x;
	    return x;
	  };

	}).call(this);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.1
	(function() {
	  var LIPSUM, delay, email_re, interval, kv, null_or_undefined,
	    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
	    __hasProp = {}.hasOwnProperty;

	  interval = function() {
	    return setInterval(arguments[1], arguments[0]);
	  };

	  delay = function() {
	    return setTimeout(arguments[1], arguments[0]);
	  };

	  email_re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	  LIPSUM = 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum. Nullam id dolor id nibh ultricies vehicula ut id elit.';

	  module.exports = {
	    say_hello: function(name) {
	      return "Hello " + name + "!";
	    },
	    delay: delay,
	    interval: interval,
	    unbox_arr: function(v) {
	      if (v instanceof Array) {
	        return v[0];
	      } else {
	        return v;
	      }
	    },
	    unbox_func: function(v) {
	      if (typeof v === 'function') {
	        return v();
	      } else {
	        return v;
	      }
	    },
	    arr: function(arrayish) {
	      return Array.prototype.slice.apply(arrayish, null);
	    },
	    arrdiff: function(arr1, arr2) {
	      var e, onlyin1, onlyin2;
	      onlyin1 = (function() {
	        var _i, _len, _results;
	        _results = [];
	        for (_i = 0, _len = arr1.length; _i < _len; _i++) {
	          e = arr1[_i];
	          if (__indexOf.call(arr2, e) < 0) {
	            _results.push(e);
	          }
	        }
	        return _results;
	      })();
	      onlyin2 = (function() {
	        var _i, _len, _results;
	        _results = [];
	        for (_i = 0, _len = arr2.length; _i < _len; _i++) {
	          e = arr2[_i];
	          if (__indexOf.call(arr1, e) < 0) {
	            _results.push(e);
	          }
	        }
	        return _results;
	      })();
	      return [onlyin1, onlyin2];
	    },
	    arr_builder: function(f) {
	      var arr;
	      arr = [];
	      f(function(x) {
	        return arr.push(x);
	      });
	      return arr;
	    },
	    lipsum: function(len) {
	      if (len == null) {
	        len = 0;
	      }
	      if (len === 0) {
	        return LIPSUM;
	      } else {
	        return LIPSUM.substring(0, len);
	      }
	    },
	    obj_empty: function(obj) {
	      var k, v;
	      if (obj != null) {
	        for (k in obj) {
	          if (!__hasProp.call(obj, k)) continue;
	          v = obj[k];
	          return false;
	        }
	      }
	      return true;
	    },
	    getter: function(prop) {
	      return 'get' + prop[0].toUpperCase() + prop.slice(1);
	    },
	    setter: function(prop) {
	      return 'set' + prop[0].toUpperCase() + prop.slice(1);
	    },
	    kv: kv = function(obj, func) {
	      var k, v, _results;
	      if (obj != null) {
	        _results = [];
	        for (k in obj) {
	          if (!__hasProp.call(obj, k)) continue;
	          v = obj[k];
	          _results.push(func(k, v));
	        }
	        return _results;
	      }
	    },
	    kkv: function(obj, func) {
	      return kv(obj, function(k, v) {
	        return kv(v, function(k2, v2) {
	          return func(k, k2, v2);
	        });
	      });
	    },
	    err: function(e) {
	      if (e != null) {
	        console.log(e);
	        console.log(e.stack);
	        throw e;
	      }
	    },
	    collapse_arr: function(arr) {
	      var x, _i, _len, _results;
	      _results = [];
	      for (_i = 0, _len = arr.length; _i < _len; _i++) {
	        x = arr[_i];
	        if (!null_or_undefined(x)) {
	          _results.push(x);
	        }
	      }
	      return _results;
	    },
	    null_or_undefined: null_or_undefined = function(v) {
	      switch (typeof v) {
	        case 'undefined':
	          return true;
	        case 'object':
	          return v == null;
	        default:
	          return false;
	      }
	    },
	    when_not_falsy: function(f1, f2) {
	      var iv;
	      return iv = interval(100, function() {
	        if (f1() != null) {
	          clearInterval(iv);
	          return f2();
	        }
	      });
	    },
	    tap: function(v) {
	      console.log(v);
	      return v;
	    },
	    first_key: function(obj) {
	      var k, v;
	      for (k in obj) {
	        v = obj[k];
	        return k;
	      }
	    },
	    first_own_key: function(obj) {
	      var k, v;
	      for (k in obj) {
	        if (!__hasProp.call(obj, k)) continue;
	        v = obj[k];
	        return k;
	      }
	    },
	    lazy: function(f) {
	      var res, res_ready;
	      res_ready = false;
	      res = null;
	      return function() {
	        if (res_ready) {
	          return res;
	        } else {
	          res_ready = true;
	          res = f();
	          return res;
	        }
	      };
	    },
	    clone: function(obj) {
	      var k, o, v;
	      o = {};
	      for (k in obj) {
	        if (!__hasProp.call(obj, k)) continue;
	        v = obj[k];
	        o[k] = v;
	      }
	      return o;
	    },
	    insist: function(times, interval_, f) {
	      var count, x;
	      count = 0;
	      return (x = function() {
	        var e;
	        try {
	          return f();
	        } catch (_error) {
	          e = _error;
	          count += 1;
	          if (count < times) {
	            return delay(interval_, x);
	          }
	        }
	      })();
	    },
	    valid_email: function(v) {
	      return typeof v === 'string' && email_re.test(v);
	    },
	    email_re: email_re,

	    /*
	    to get rid of 'return cb e if e?'
	    
	    func1 = ( a, cb ) ->
	      func2 ( e, r ) ->
	        return cb e if e?
	        console.log r
	    
	    func1 = ( a, cb ) ->
	      func2 ( cbe cb ) ( e, r ) ->
	        console.log r
	     */
	    cbe: function(done) {
	      return function(cb) {
	        return function() {
	          if (arguments[0] != null) {
	            return done(arguments[0]);
	          } else {
	            return cb.apply(null, arguments);
	          }
	        };
	      };
	    },
	    assert_type: function(type, v, message) {
	      if (message == null) {
	        message = ("Expected " + v + " to be a ") + type;
	      }
	      if (typeof v !== type) {
	        throw new Error(message);
	      }
	    }
	  };

	}).call(this);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.1
	(function() {
	  module.exports = (function() {
	    var line, obj, p, parts, s, _i, _len, _ref;
	    s = "actionsheet             Ext.ActionSheet\naudio                   Ext.Audio\nbutton                  Ext.Button\ncomponent               Ext.Component\ncontainer               Ext.Container\nimage                   Ext.Img\nlabel                   Ext.Label\nloadmask                Ext.LoadMask\nmap                     Ext.Map\nmask                    Ext.Mask\nmedia                   Ext.Media\npanel                   Ext.Panel\nsegmentedbutton         Ext.SegmentedButton\nsheet                   Ext.Sheet\nspacer                  Ext.Spacer\ntitle                   Ext.Title\ntitlebar                Ext.TitleBar\ntoolbar                 Ext.Toolbar\nvideo                   Ext.Video\ncarousel                Ext.carousel.Carousel\ncarouselindicator       Ext.carousel.Indicator\nnavigationview          Ext.navigation.View\ndatepicker              Ext.picker.Date\npicker                  Ext.picker.Picker\npickerslot              Ext.picker.Slot\nslider                  Ext.slider.Slider\nthumb                   Ext.slider.Thumb\ntabbar                  Ext.tab.Bar\ntabpanel                Ext.tab.Panel\ntab                     Ext.tab.Tab\nviewport                Ext.viewport.Default\ndataview                Ext.dataview.DataView\nlist                    Ext.dataview.List\nlistitemheader          Ext.dataview.ListItemHeader\nnestedlist              Ext.dataview.NestedList\ndataitem                Ext.dataview.component.DataItem\ncheckboxfield           Ext.field.Checkbox\ndatepickerfield         Ext.field.DatePicker\nemailfield              Ext.field.Email\nfield                   Ext.field.Field\nhiddenfield             Ext.field.Hidden\ninput                   Ext.field.Input\nnumberfield             Ext.field.Number\npasswordfield           Ext.field.Password\nradiofield              Ext.field.Radio\nsearchfield             Ext.field.Search\nselectfield             Ext.field.Select\nsliderfield             Ext.field.Slider\nspinnerfield            Ext.field.Spinner\ntextfield               Ext.field.Text\ntextareafield           Ext.field.TextArea\ntextareainput           Ext.field.TextAreaInput\ntogglefield             Ext.field.Toggle\nurlfield                Ext.field.Url\nfieldset                Ext.form.FieldSet\nformpanel               Ext.form.Panel\nmenu                    Ext.Menu";
	    obj = {};
	    _ref = s.split("\n");
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      line = _ref[_i];
	      if (!(line.trim() !== '')) {
	        continue;
	      }
	      parts = (function() {
	        var _j, _len1, _ref1, _results;
	        _ref1 = line.split(" ");
	        _results = [];
	        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	          p = _ref1[_j];
	          if (p !== '') {
	            _results.push(p);
	          }
	        }
	        return _results;
	      })();
	      obj[parts[0]] = parts[1];
	    }
	    return obj;
	  })();

	}).call(this);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var Binding, EQ;

	  module.exports = function(opts) {
	    return new Binding(opts);
	  };

	  EQ = function(x, y) {
	    return x === y;
	  };

	  Binding = (function() {
	    function Binding(_arg) {
	      this.get_a = _arg.get_a, this.get_b = _arg.get_b, this.set_a = _arg.set_a, this.set_b = _arg.set_b, this.equals = _arg.equals;
	      if (this.equals == null) {
	        this.equals = EQ;
	      }
	    }

	    Binding.prototype._run = function(func) {
	      if (this._m !== true) {
	        this._m = true;
	        func();
	        return this._m = false;
	      }
	    };

	    Binding.prototype.touch_a = function() {
	      var _this = this;
	      return this._run(function() {
	        var v;
	        if (!_this.equals(_this.get_b(), v = _this.get_a())) {
	          return _this.set_b(v);
	        }
	      });
	    };

	    Binding.prototype.touch_b = function() {
	      var _this = this;
	      return this._run(function() {
	        var v;
	        if (!_this.equals(_this.get_a(), v = _this.get_b())) {
	          return _this.set_a(v);
	        }
	      });
	    };

	    return Binding;

	  })();

	}).call(this);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var ParseError, UnknownTagError, main, syntax_parser, valid_html_tags,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  valid_html_tags = __webpack_require__(17);

	  syntax_parser = __webpack_require__(18);

	  /*
	  parse string into an object with "tag, id, classes"
	  throws ParseError, UnknownTagError
	  
	  @str the string to parse
	  @strict whether to check for valid HTML tags. Defaults to yes
	  
	  returns:
	  @tag      the type/name of tag ( div, input, etc )
	  @id       optional ID string ( '#my-form' --> 'my-form' ) ( null if no ID )
	  @classes  array of strings containing classes ( empty if no classes )
	  */


	  module.exports = main = function(str, strict, lowercase) {
	    var classes, id, t, tag;
	    if (strict == null) {
	      strict = true;
	    }
	    if (lowercase == null) {
	      lowercase = true;
	    }
	    if (typeof str !== 'string') {
	      throw new ParseError('(undefined)');
	    }
	    if (str.length === 0) {
	      throw new ParseError('(empty string)');
	    }
	    if ((t = syntax_parser(str)) == null) {
	      throw new ParseError(str);
	    }
	    tag = t.tag, id = t.id, classes = t.classes;
	    if (lowercase) {
	      tag = tag.toLowerCase();
	    }
	    if (strict && !valid_html_tags(tag.toLowerCase())) {
	      throw new UnknownTagError(tag);
	    }
	    return {
	      tag: tag,
	      id: id,
	      classes: classes
	    };
	  };

	  main.ParseError = ParseError = (function(_super) {
	    __extends(ParseError, _super);

	    function ParseError(tag) {
	      this.message = "[htmltagparser] Can't parse HTML tag: '" + tag + "'";
	    }

	    return ParseError;

	  })(Error);

	  UnknownTagError = UnknownTagError = (function(_super) {
	    __extends(UnknownTagError, _super);

	    function UnknownTagError(tag) {
	      this.message = "[htmltagparser] Unknown HTML tag: '" + tag + "'";
	    }

	    return UnknownTagError;

	  })(Error);

	}).call(this);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var build_lookup_map, lookup_map;

	  lookup_map = null;

	  module.exports = function(tag) {
	    return (lookup_map != null ? lookup_map : lookup_map = build_lookup_map())[tag.toLowerCase()] === true;
	  };

	  build_lookup_map = function() {
	    var all, k, map, obsolete, obsolete_self_closing, regular, self_closing, _i, _len;
	    regular = 'a abbr address article aside audio b bdi bdo blockquote body button\
	 canvas caption cite code colgroup datalist dd del details dfn div dl dt em\
	 fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup\
	 html i iframe ins kbd label legend li map mark menu meter nav noscript object\
	 ol optgroup option output p pre progress q rp rt ruby s samp script section\
	 select small span strong style sub summary sup table tbody td textarea tfoot\
	 th thead time title tr u ul var video';
	    self_closing = 'area base br col command embed hr img input keygen link meta param\
	 source track wbr';
	    obsolete = 'applet acronym bgsound dir frameset noframes isindex listing\
	 nextid noembed plaintext rb strike xmp big blink center font marquee multicol\
	 nobr spacer tt';
	    obsolete_self_closing = 'basefont frame';
	    all = [regular, self_closing, obsolete, obsolete_self_closing].join(' ').split(' ');
	    map = {};
	    for (_i = 0, _len = all.length; _i < _len; _i++) {
	      k = all[_i];
	      if (k !== ' ') {
	        map[k.trim()] = true;
	      }
	    }
	    return map;
	  };

	}).call(this);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var html_tag_re, str_ok, syntax_parser;

	  module.exports = syntax_parser = function(tag) {
	    /*
	    [ 'p#id.class1.class2',  #0
	    'p',                   #1
	    '#id',                 #2
	    'id',                  #3
	    '.class1.class2',      #4
	    '.class2',             #5
	    index: 0,
	    input: 'p#id.class1.class2' ]
	    */

	    var classes, id, name, _, _ref;
	    _ref = tag.trim().match(html_tag_re), _ = _ref[0], name = _ref[1], _ = _ref[2], id = _ref[3], classes = _ref[4];
	    return {
	      tag: str_ok(name) ? name : 'div',
	      id: id,
	      classes: str_ok(classes) ? classes.split('.').slice(1) : []
	    };
	  };

	  html_tag_re = /^([\w\-]+)?([#]([\w\-]+))?((\.[\w\-]+)*)$/i;

	  str_ok = function(s) {
	    return (s != null) && ('string' === typeof s) && (s !== '');
	  };

	}).call(this);


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var StackVal,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  StackVal = (function() {
	    function StackVal() {
	      this.defined = __bind(this.defined, this);
	      this.get = __bind(this.get, this);
	      this.attach = __bind(this.attach, this);
	      this._stack = [];
	    }

	    /*
	    Combinator that returns a function with an attached stack value.
	    Whenever you execute this function  the generator function will be executed
	    and the resulting value will will be accessible to any downstack function.
	    */


	    StackVal.prototype.attach = function(f, generator) {
	      var sv;
	      if (typeof f !== 'function') {
	        throw new Error('function argument required');
	      }
	      sv = this;
	      return function() {
	        try {
	          sv._stack.push(generator());
	          return f.apply(this, arguments);
	        } finally {
	          sv._stack.pop();
	        }
	      };
	    };

	    /*
	    Gets a stackval that was attached to an upstack function
	    will throw an error if there is no upstack function with a value
	    attached
	    */


	    StackVal.prototype.get = function() {
	      if (this.defined()) {
	        return this._stack[this._stack.length - 1];
	      } else {
	        throw new Error('No stackval found upstack');
	      }
	    };

	    /*
	    true if there is a value attached upstack
	    */


	    StackVal.prototype.defined = function() {
	      return this._stack.length !== 0;
	    };

	    return StackVal;

	  })();

	  module.exports = function() {
	    var main, s;
	    s = new StackVal();
	    main = function() {
	      var a;
	      a = arguments;
	      if (a.length === 2) {
	        return s.attach(a[0], a[1]);
	      } else {
	        return s.get();
	      }
	    };
	    main.attach = function() {
	      return s.attach.apply(s, arguments);
	    };
	    main.get = function() {
	      return s.get.apply(s, arguments);
	    };
	    main.defined = function() {
	      return s.defined.apply(s, arguments);
	    };
	    return main;
	  };

	}).call(this);


/***/ }
/******/ ])