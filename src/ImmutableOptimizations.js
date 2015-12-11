import omit from 'omit-keys';
import {valEq, refEq} from './util';


function ImmutableOptimizations (refFields = [], ignoredFields = []) {
  var noValueCheckFields = refFields.concat(ignoredFields);
  return {
    shouldComponentUpdate: function (nextProps) {

      var valuesChanged = !valEq(
        omit(nextProps, noValueCheckFields),
        omit(this.props, noValueCheckFields));

      var refsChanged = !refFields.every((field) => {
        return refEq(this.props[field], nextProps[field]);
      });

      return valuesChanged || refsChanged;
    }
  };
}

export default ImmutableOptimizations;
