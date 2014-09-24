var utils = require('./util');

'use strict';

function ImmutableOptimizations (refFields, ignoredFields/*optional*/) {
  ignoredFields = ignoredFields === undefined ? [] : ignoredFields;
  return {
    shouldComponentUpdate: function (nextProps) {
      var valuesChanged = !utils.isEqual(
        utils.omit(nextProps, utils.union(refFields, ignoredFields)),
        utils.omit(this.props, utils.union(refFields, ignoredFields)));

      var refsChanged = !refFields.every(function (field) {
        return this.props[field] === nextProps[field];
      }.bind(this));

      return valuesChanged || refsChanged;
    }
  };
}

module.exports = ImmutableOptimizations;
