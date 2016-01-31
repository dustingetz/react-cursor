import omit from 'omit-keys';
import isEqual from 'deep-equal';


function ImmutableOptimizations (refFields = [], ignoredFields = []) {
  var noValueCheckFields = refFields.concat(ignoredFields);
  return {
    shouldComponentUpdate: function (nextProps) {

      var valuesChanged = !isEqual(
        omit(nextProps, noValueCheckFields),
        omit(this.props, noValueCheckFields));

      var refsChanged = !refFields.every((field) => {
        return this.props[field] === nextProps[field];
      });

      return valuesChanged || refsChanged;
    }
  };
}

export default ImmutableOptimizations;
