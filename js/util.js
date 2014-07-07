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

    function hashString(str) {
        var hash = 0, i, ch, l;
        if (str.length === 0) {
            return hash;
        }
        for (i = 0, l = str.length; i < l; i++) {
            ch  = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + ch;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    function hashRecord(record) {
        return hashString(JSON.stringify(record));
    }

    return {
        getRefAtPath: getRefAtPath,
        deref: deref,
        unDeref: unDeref,
        initial: initial,
        last: last,
        reduce: reduce,
        flatten: flatten,
        hashString: hashString,
        hashRecord: hashRecord
    };
});