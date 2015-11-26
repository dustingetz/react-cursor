import util from './util';


function ImmutableOptimizations (refFields, ignoredFields/*optional*/) {
  var noValueCheckFields = refFields.concat(ignoredFields || []);
  return {
    shouldComponentUpdate: function (nextProps) {
      var currentProps = this.props;

      var valuesChanged = !util.isEqual(
        util.omit(nextProps, noValueCheckFields),
        util.omit(currentProps, noValueCheckFields));

      var refsChanged = !refFields.every(function (field) {
        return currentProps[field] === nextProps[field];
      });

      return valuesChanged || refsChanged;
    }
  };
}

export default ImmutableOptimizations;
