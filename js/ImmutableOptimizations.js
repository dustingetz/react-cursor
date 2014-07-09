define([
  'underscore'
], function (_) {
  'use strict';

  function ImmutableOptimizations (refFields, ignoredFields/*optional*/) {
    ignoredFields = ignoredFields === undefined ? [] : ignoredFields;
    return {
      shouldComponentUpdate: function (nextProps) {
        var valuesChanged = !_.isEqual(
          _.omit(nextProps, _.union(refFields, ignoredFields)),
          _.omit(this.props, _.union(refFields, ignoredFields)));

        var refsChanged = !_.every(refFields, function (field) {
          return this.props[field] === nextProps[field];
        }.bind(this));

        return valuesChanged || refsChanged;
      }
    };
  }

  return ImmutableOptimizations;
});
