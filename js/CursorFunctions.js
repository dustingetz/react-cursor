define([], function () {
    'use strict';

    function getRefAtPath(tree, paths) {
        return reduce(paths, deref, tree);
    }

    function deref(obj, key) {
        return obj[key];
    }

    function unDeref(obj, key) {
        var nextObj = {};
        nextObj[key] = obj;
        return nextObj;
    }

    function initial(array) {
        return array.slice(0, array.length - 1);
    }

    function last(array) {
        return array[array.length - 1];
    }

    function reduce(array, f, mzero) {
        return array.reduce(f, mzero);
    }

    function flatten(listOfLists) {
        return [].concat.apply([], listOfLists);
    }

    return {
        getRefAtPath: getRefAtPath,
        deref: deref,
        unDeref: unDeref,
        initial: initial,
        last: last,
        reduce: reduce,
        flatten: flatten
    };
});