// CONSTANTS
// ======================

var EXTENSION_BUILD = '202302091527';   // /!\ Auto-generated line, do not edit //

// UI /////

var SELECT_PICKER_OPTIONS = {
    size: 13,
    iconBase: 'ladb-opencutlist-icon',
    tickIcon: 'ladb-opencutlist-icon-tick',
    showTick: true,
    dropupAuto: false
};

var TOKENFIELD_OPTIONS = {
    delimiter: ';',
    createTokensOnBlur: true,
    beautify: false,
    minWidth: 250
};

var SORTABLE_OPTIONS = {
    cursor: 'ns-resize',
    handle: '.ladb-handle'
};

// GraphQL /////

var GRAPHQL_ENDPOINT = 'https://api.opencollective.com/graphql/v2/';
var GRAPHQL_SLUG = 'lairdubois-opencutlist-sketchup-extension';

//

var REAL_MATERIALS_FILTER = [
    0,  // TYPE_UNKNOWN
    1,  // TYPE_SOLID_WOOD
    2,  // TYPE_SHEET_GOOD
    3,  // TYPE_DIMENSIONAL
    5,  // TYPE_HARDWARE
]

//

var THREE_CONTROLS_DIRECTIONS = {
    none: [ 0, 0, 0 ],
    isometric: [ 1, -1, 1 ],
    top: [ 0, 0, 1 ],
    bottom: [ 0, 0, -1 ],
    front: [ 0, -1, 0 ],
    back: [ 0, 1, 0 ],
    left: [ -1, 0, 0 ],
    right: [ 1, 0, 0 ]
}

