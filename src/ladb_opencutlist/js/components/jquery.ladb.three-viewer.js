+function ($) {
    'use strict';

    // CLASS DEFINITION
    // ======================

    var LadbThreeViewer = function (element, options, dialog) {
        this.options = options;
        this.$element = $(element);
        this.dialog = dialog;

        this.$iframe = $('iframe', this.$element);

    };

    LadbThreeViewer.DEFAULTS = {
        modelDef: null,
        partsColored: false,
        pinsHidden: false,
        pinsColored: false,
        pinsLength: 1,      // PINS_LENGTH_SHORT
        pinsDirection: 0,   // PINS_DIRECTION_CENTER
        controlsTarget: null,
        controlsPosition: null,
        controlsZoom: null,
        showBoxHelper: false,
    };

    LadbThreeViewer.prototype.callCommand = function (command, params) {
        this.$iframe.get(0).contentWindow.postMessage({
            command: command,
            params: params
        }, '*');
    };

    LadbThreeViewer.prototype.bind = function () {
        var that = this;

        // Bind iframe
        this.$iframe
            .on('load', function () {

                that.callCommand(
                    'setup_model',
                    {
                        modelDef: that.options.modelDef,
                        partsColored: that.options.partsColored,
                        pinsHidden: that.options.pinsHidden,
                        pinsColored: that.options.pinsColored,
                        pinsLength: that.options.pinsLength,
                        pinsDirection: that.options.pinsDirection,
                        controlsTarget: that.options.controlsTarget,
                        controlsPosition: that.options.controlsPosition,
                        controlsZoom: that.options.controlsZoom,
                    }
                );
                if (that.options.showBoxHelper) {
                    that.callCommand(
                        'set_box_helper_visible',
                        {
                            visible: true,
                        }
                    );
                }

            })
            .attr('src', 'viewer.html');

        this.$iframe.get(0).addEventListener('controls.changed', function (e) {
            that.$element.trigger('controls.changed', [ e.data ]);
        })

        // Bind buttons
        $('button[data-command]', this.$element).on('click', function () {
            this.blur();
            var command = $(this).data('command');
            var params = $(this).data('params');
            that.callCommand(command, params);
        });

    };

    LadbThreeViewer.prototype.init = function () {
        this.bind();
        this.dialog.setupTooltips(this.$element);
    };

    // PLUGIN DEFINITION
    // =======================

    function Plugin(option, params) {
        var value;
        var elements = this.each(function () {
            var $this = $(this);
            var data = $this.data('ladb.threeviewer');
            var options = $.extend({}, LadbThreeViewer.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) {
                if (undefined === options.dialog) {
                    throw 'dialog option is mandatory.';
                }
                $this.data('ladb.editorExport', (data = new LadbThreeViewer(this, options, options.dialog)));
            }
            if (typeof option === 'string') {
                value = data[option].apply(data, Array.isArray(params) ? params : [ params ])
            } else {
                data.init(params);
            }
        });
        return typeof value !== 'undefined' ? value : elements;
    }

    var old = $.fn.ladbThreeViewer;

    $.fn.ladbThreeViewer = Plugin;
    $.fn.ladbThreeViewer.Constructor = LadbThreeViewer;


    // NO CONFLICT
    // =================

    $.fn.ladbThreeViewer.noConflict = function () {
        $.fn.ladbThreeViewer = old;
        return this;
    }

}(jQuery);