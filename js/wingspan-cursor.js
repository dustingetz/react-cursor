define([
  'Cursor', 'ImmutableOptimizations'
], function (Cursor, ImmutableOptimizations) {
  'use strict';

  return {
    build: Cursor.build,
    ImmutableOptimizations: ImmutableOptimizations
  };
});