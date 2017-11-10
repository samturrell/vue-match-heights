/**
 * Remove height of a single element
 *
 * @param element
 */
function removeHeight (element) {
  element.style.removeProperty('height')
}

/**
 * Remove height of each selector
 *
 * @param selectors
 */
function removeHeights (selectors) {
  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((element) => {
      removeHeight(element)
    })
  })
}

/**
 * Get the min height for a set of elements
 *
 * @param elements
 *
 * @returns {number}
 */
function getMinHeight (elements) {
  let min = 0

  elements.forEach((element) => {
    if (element.offsetHeight > min) {
      min = element.offsetHeight
    }
  })

  return min
}

/**
 * Set the height of a single selector
 *
 * @param selector
 */
function setHeight (selector) {
  const elements = document.querySelectorAll(selector)
  const height = getMinHeight(elements)

  elements.forEach((element) => {
    element.style.height = `${height}px`
  })
}

/**
 * Determine if the plugin should run for the current window size based on the provided values
 *
 * @param rules
 *
 * @returns {boolean}
 */
function shouldRun (rules) {
  let shouldRun = true
  rules.forEach((rule) => {
    let min = 0
    let max = rule

    if (typeof rule === 'object') {
      [min, max] = rule
    }

    if (window.innerWidth > min && window.innerWidth < max) {
      shouldRun = false
    }
  })

  return shouldRun
}

/**
 * Match heights function
 *
 * @param selectors
 * @param disabled
 */
function matchHeights (selectors = [], disabled = []) {
  // Size each selector in turn
  removeHeights(selectors)

  // Check if the plugin should run
  if (!shouldRun(disabled)) return false

  // Size each provided selector
  selectors.forEach(setHeight)
}


function plugin (Vue, options = {}) {
  Vue.directive('match-heights', {
    bind (el, binding) {
      console.log(options)
      function matchHeightsFunc () {
        matchHeights(binding.value.el, binding.value.disabled || options.disabled || [])
      }
      matchHeightsFunc()
      window.addEventListener('resize', matchHeightsFunc)
      Vue.nextTick(matchHeightsFunc)
    },

    inserted (el, binding) {
      function matchHeightsFunc () {
        matchHeights(binding.value.el, binding.value.disabled || options.disabled || [])
      }

      // Handle images rendering
      document.querySelectorAll(binding.value.el).forEach((el) => {
        el.querySelectorAll('img').forEach((img) => {
          img.addEventListener('load', matchHeightsFunc)
        })
      })

      // Bind custom events to recalculate heights
      el.addEventListener('matchheight', matchHeightsFunc, false)
      document.addEventListener('matchheight', matchHeightsFunc, false)
    },

    unbind (el, binding) {}
  })
}

plugin.version = '__VERSION__'

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
