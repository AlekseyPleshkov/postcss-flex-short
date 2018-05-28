'use strict';

// flex-container: width-1200px direction-row align-center justify-stretch;
// flex-column: width-400px flex-1 align-flex-start

var postcss = require('postcss');
module.exports = postcss.plugin('postcss-flex-short', function (options) {
  return function (css) {
    
    // Flex container
    var flexContainer = function(decl, params) {
      // Params default
      var parent = decl.parent;
      var maxWidth = '';
      var direction = '';
      var align = '';
      var justify = '';
      var wrap = '';
      // Parse params
      for (var i = 0; i < params.length; i++) {
        var value = params[i].toLowerCase();
        // Max width
        if (value.search('width-') === 0) {
          maxWidth = value.replace('width-', '');
        } 
        // Flex direction
        else if (value.search('direction-') === 0) {
          direction = value.replace('direction-', '');
        }
        // Align items
        else if (value.search('align-') === 0) {
          align = value.replace('align-', '');
        }
        // Justify content
        else if (value.search('justify-') === 0) {
          justify = value.replace('justify-', '');
        }
        // Wrap
        else if (value.search('wrap-') === 0) {
          wrap = value.replace('wrap-', '');
        }
      }
      // Set params
      parent.append('display: flex;');
      if (maxWidth.length > 0) {
        parent.append('width: 100%; max-width: ' + maxWidth + ';');
      }
      if (direction.length > 0) {
        parent.append('flex-direction: ' + direction + ';');
      }
      if (align.length > 0) {
        parent.append('align-items: ' + align + ';');
      }
      if (justify.length > 0) {
        parent.append('justify-content: ' + justify + ';');
      }
      if (wrap.length > 0) {
        parent.append('flex-wrap: ' + wrap + ';');
      }
      // Remove old elements
      decl.remove();
    };

    // Flex column
    var flexColumn = function(decl, params) {
      // Params default
      var parent = decl.parent;
      var maxWidth = '';
      var flex = '';
      var basis = '';
      var grow = '';
      var shrink = '';
      var align = '';
      var justify = '';
      // Parse params
      for (var i = 0; i < params.length; i++) {
        var value = params[i].toLowerCase();
        // Max width
        if (value.search('width-') === 0) {
          maxWidth = value.replace('width-', '');
        } 
        // Flex
        else if (value.search('flex-') === 0) {
          flex = value.replace('flex-', '');
          flex = flex.split('-');
        }
        // Basis
        else if (value.search('basis-') === 0) {
          basis = value.replace('basis-', '');
        }
        // Grow
        else if (value.search('grow-') === 0) {
          grow = value.replace('grow-', '');
        }
        // Shrink
        else if (value.search('shrink-') === 0) {
          shrink = value.replace('shrink-', '');
        }
        // Align self
        else if (value.search('align-') === 0) {
          align = value.replace('align-', '');
        }
        // Justify self
        else if (value.search('justify-') === 0) {
          justify = value.replace('justify-', '');
        }
      }
      // Set params
      if (maxWidth.length > 0) {
        parent.append('width: 100%; max-width: ' + maxWidth + ';');
      }
      if (flex.length > 0) {
        let flexJoin = flex.join(' ');
        parent.append('flex: ' + flexJoin + ';');
      }
      if (basis.length > 0) {
        parent.append('flex-basis: ' + basis + ';');
      }
      if (grow.length > 0) {
        parent.append('flex-grow: ' + grow + ';');
      }
      if (shrink.length > 0) {
        parent.append('flex-shrink: ' + shrink + ';');
      }
      if (align.length > 0) {
        parent.append('align-self: ' + align + ';');
      }
      if (justify.length > 0) {
        parent.append('justify-self: ' + justify + ';');
      }
      // Remove old elements
      decl.remove();
    };

    // Search tag flex container
    css.walkDecls('flex-container', function(decl) {
      var params = postcss.list.space(decl.value);
      flexContainer(decl, params);
    });

    // Search tag flex column
    css.walkDecls('flex-column', function(decl) {
      var params = postcss.list.space(decl.value);
      flexColumn(decl, params);
    });
  };
});
