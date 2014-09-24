var util = require('./util');

'use strict';

function ImmutableOptimizations (refFields, ignoredFields/*optional*/) {
  ignoredFields = ignoredFields === undefined ? [] : ignoredFields;
  return {
    shouldComponentUpdate: function (nextProps) {
      var valuesChanged = !util.isEqual(
        util.omit(nextProps, util.union(refFields, ignoredFields)),
        util.omit(this.props, util.union(refFields, ignoredFields)));

      var refsChanged = !util.every(refFields, function (field) {
        return this.props[field] === nextProps[field];
      }.bind(this));

      return valuesChanged || refsChanged;
    }
  };
}

module.exports = ImmutableOptimizations;
