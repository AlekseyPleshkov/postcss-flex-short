'use strict'

// flex-container: width-1200px direction-row align-center justify-stretch
// flex-column: width-400px flex-1 align-flex-start

const postcss = require('postcss')

module.exports = postcss.plugin('postcss-flex-short', (options) => {
  return (css) => {

    // Flex container
    const flexContainer = (decl, params) => {
      const parseParams = params.join(' ').split(', ')

      // Params default
      const parent = decl.parent
      const styleOptions = {
        maxWidth: '',
        direction: '',
        align: '',
        justify: '',
        wrap: ''
      }

      // Parse params
      parseParams.forEach(param => {
        const singleParam = param.toLowerCase()

        // Max width
        if (singleParam.search('width ') === 0) {
          styleOptions.maxWidth = singleParam.replace('width ', '')
        }
        // Flex direction
        else if (singleParam.search('direction ') === 0) {
          styleOptions.direction = singleParam.replace('direction ', '')
        }
        // Align items
        else if (singleParam.search('align ') === 0) {
          styleOptions.align = singleParam.replace('align ', '')
        }
        // Justify content
        else if (singleParam.search('justify ') === 0) {
          styleOptions.justify = singleParam.replace('justify ', '')
        }
        // Wrap
        else if (singleParam.search('wrap ') === 0) {
          styleOptions.wrap = singleParam.replace('wrap ', '')
        }
      })

      // Set params
      parent.append('display: flex;')

      if (styleOptions.maxWidth.length > 0) {
        parent.append('width: 100%; max-width: ' + styleOptions.maxWidth + ';')
      }
      if (styleOptions.direction.length > 0) {
        parent.append('flex-direction: ' + styleOptions.direction + ';')
      }
      if (styleOptions.align.length > 0) {
        parent.append('align-items: ' + styleOptions.align + ';')
      }
      if (styleOptions.justify.length > 0) {
        parent.append('justify-content: ' + styleOptions.justify + ';')
      }
      if (styleOptions.wrap.length > 0) {
        parent.append('flex-wrap: ' + styleOptions.wrap + ';')
      }

      // Remove old elements
      decl.remove()
    }

    // Flex column
    const flexColumn = function (decl, params) {
      const parseParams = params.join(' ').split(', ')

      // Params default
      const parent = decl.parent
      const styleOptions = {
        maxWidth: '',
        flex: '',
        basis: '',
        grow: '',
        shrink: '',
        align: '',
        justify: ''
      }

      // Parse params
      parseParams.forEach(param => {
        const singleParam = param.toLowerCase()

        // Max width
        if (singleParam.search('width ') === 0) {
          styleOptions.maxWidth = singleParam.replace('width ', '')
        }
        // Flex
        else if (singleParam.search('flex ') === 0) {
          styleOptions.flex = singleParam.replace('flex ', '')
        }
        // Basis
        else if (singleParam.search('basis ') === 0) {
          styleOptions.basis = singleParam.replace('basis ', '')
        }
        // Grow
        else if (singleParam.search('grow ') === 0) {
          styleOptions.grow = singleParam.replace('grow ', '')
        }
        // Shrink
        else if (singleParam.search('shrink ') === 0) {
          styleOptions.shrink = singleParam.replace('shrink ', '')
        }
        // Align self
        else if (singleParam.search('align ') === 0) {
          styleOptions.align = singleParam.replace('align ', '')
        }
        // Justify self
        else if (singleParam.search('justify ') === 0) {
          styleOptions.justify = singleParam.replace('justify ', '')
        }
      })

      // Set params
      if (styleOptions.maxWidth.length > 0) {
        parent.append('width: 100%; max-width: ' + styleOptions.maxWidth + ';')
      }
      if (styleOptions.flex.length > 0) {
        parent.append('flex: ' + styleOptions.flex + ';')
      }
      if (styleOptions.basis.length > 0) {
        parent.append('flex-basis: ' + styleOptions.basis + ';')
      }
      if (styleOptions.grow.length > 0) {
        parent.append('flex-grow: ' + styleOptions.grow + ';')
      }
      if (styleOptions.shrink.length > 0) {
        parent.append('flex-shrink: ' + styleOptions.shrink + ';')
      }
      if (styleOptions.align.length > 0) {
        parent.append('align-self: ' + styleOptions.align + ';')
      }
      if (styleOptions.justify.length > 0) {
        parent.append('justify-self: ' + styleOptions.justify + ';')
      }

      // Remove old elements
      decl.remove()
    }

    // Search tag flex container
    css.walkDecls('flex-container', function (decl) {
      const params = postcss.list.space(decl.value)
      flexContainer(decl, params)
    })

    // Search tag flex column
    css.walkDecls('flex-column', function (decl) {
      const params = postcss.list.space(decl.value)
      flexColumn(decl, params)
    })
  }
})
