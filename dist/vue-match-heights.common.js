/*!
 * vue-match-heights v0.0.0 
 * (c) 2017 Sam Turrell
 * Released under the MIT License.
 */
'use strict';

/**
 * Remove height of a single element
 *
 * @param element
 */
function removeHeight (element) {
  element.style.removeProperty('height');
}

/**
 * Remove height of each selector
 *
 * @param selectors
 */
function removeHeights (selectors) {
  selectors.forEach(function (selector) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
      removeHeight(element);
    });
  });
}

/**
 * Get the min height for a set of elements
 *
 * @param elements
 *
 * @returns {number}
 */
function getMinHeight (elements) {
  var min = 0;

  elements.forEach(function (element) {
    if (element.offsetHeight > min) {
      min = element.offsetHeight;
    }
  });

  return min
}

/**
 * Set the height of a single selector
 *
 * @param selector
 */
function setHeight (selector) {
  var elements = document.querySelectorAll(selector);
  var height = getMinHeight(elements);

  elements.forEach(function (element) {
    element.style.height = height + "px";
  });
}

/**
 * Determine if the plugin should run for the current window size based on the provided values
 *
 * @param rules
 *
 * @returns {boolean}
 */
function shouldRun (rules) {
  var shouldRun = true;
  rules.forEach(function (rule) {
    var min = 0;
    var max = rule;

    if (typeof rule === 'object') {
      var assign;
      (assign = rule, min = assign[0], max = assign[1]);
    }

    if (window.innerWidth > min && window.innerWidth < max) {
      shouldRun = false;
    }
  });

  return shouldRun
}

/**
 * Match heights function
 *
 * @param selectors
 * @param disabled
 */
function matchHeights (selectors, disabled) {
  if ( selectors === void 0 ) selectors = [];
  if ( disabled === void 0 ) disabled = [];

  // Size each selector in turn
  removeHeights(selectors);

  // Check if the plugin should run
  if (!shouldRun(disabled)) { return false }

  // Size each provided selector
  selectors.forEach(setHeight);
}


function plugin (Vue, options) {
  if ( options === void 0 ) options = {};

  Vue.directive('match-heights', {
    bind: function bind (el, binding) {
      console.log(options);
      function matchHeightsFunc () {
        matchHeights(binding.value.el, binding.value.disabled || options.disabled || []);
      }
      matchHeightsFunc();
      window.addEventListener('resize', matchHeightsFunc);
      Vue.nextTick(matchHeightsFunc);
    },

    inserted: function inserted (el, binding) {
      function matchHeightsFunc () {
        matchHeights(binding.value.el, binding.value.disabled || options.disabled || []);
      }

      // Handle images rendering
      document.querySelectorAll(binding.value.el).forEach(function (el) {
        el.querySelectorAll('img').forEach(function (img) {
          img.addEventListener('load', matchHeightsFunc);
        });
      });

      // Bind custom events to recalculate heights
      el.addEventListener('matchheight', matchHeightsFunc, false);
      document.addEventListener('matchheight', matchHeightsFunc, false);
    },

    unbind: function unbind (el, binding) {}
  });
}

plugin.version = '0.0.0';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin;
