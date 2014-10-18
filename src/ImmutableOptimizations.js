var utils = require('./util');

'use strict';

function ImmutableOptimizations (refFields, ignoredFields/*optional*/) {
  var noValueCheckFields = refFields.concat(ignoredFields || []);
  return {
    shouldComponentUpdate: function (nextProps) {
      var currentProps = this.props;

      var valuesChanged = !utils.isEqual(
        utils.omit(nextProps, noValueCheckFields),
        utils.omit(currentProps, noValueCheckFields));

      var refsChanged = !refFields.every(function (field) {
        return currentProps[field] === nextProps[field];
      });

      return valuesChanged || refsChanged;
    }
  };
}

module.exports = ImmutableOptimizations;
