var utils = require('./util');

'use strict';

function ImmutableOptimizations (refFields, ignoredFields/*optional*/) {
  var ignores = utils.union(refFields, ignoredFields||[]),
      isEqual = utils.isEqual,
      omit = utils.omit,
      numberOfFields = refFields.length;
  if (numberOfFields === 1){
    var lonefield = refFields[0];
    if (!ignores.length) {
      // we just have a single retField which isn't ignored
      return {
        shouldComponentUpdate: function(nextProps){
          return !isEqual(nextProps,this.props) || this.props[lonefield] !== nextProps[lonefield];
        }
      };
    } else {
      // we have a single retField which is ignored
      return {
        shouldComponentUpdate: function(nextProps){
          return !isEqual(omit(nextProps,refFields),omit(this.props,refFields)) || this.props[lonefield] !== nextProps[lonefield];
        }
      };
    }
  } else {
    if (!ignores.length){
      // many refFields but no ignores
      return {
        shouldComponentUpdate: function(nextProps){
          var currentProps = this.props, i;
          if (!isEqual(nextProps,currentProps)){
            return true;
          }
          for (i=0;i < numberOfFields; i++){
            if (currentProps[refFields[i]]!==nextProps[refFields[i]]){
              return true;
            }
          }
          return false;
        }
      };
    } else {
      // many refFields and ignores
      return {
        shouldComponentUpdate: function(nextProps){
          var currentProps = this.props, i;
          if (!isEqual(omit(nextProps,ignores),omit(currentProps,ignores))){
            return true;
          }
          for (i=0;i < numberOfFields; i++){
            if (currentProps[refFields[i]]!==nextProps[refFields[i]]){
              return true;
            }
          }
          return false;
        }
      };
    }
  }
}

module.exports = ImmutableOptimizations;
