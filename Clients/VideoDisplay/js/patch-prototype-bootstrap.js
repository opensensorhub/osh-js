if (typeof(JQuery) != "undefined") {
    jQuery.noConflict();
    if (Prototype.BrowserFeatures.ElementExtensions) {
        var disablePrototypeJS = function (method, pluginsToDisable) {
                var handler = function (event) {
                    event.target[method] = undefined;
                    setTimeout(function () {
                        delete event.target[method];
                    }, 0);
                };
                pluginsToDisable.each(function (plugin) {
                    jQuery(window).on(method + '.bs.' + plugin, handler);
                });
            },
            pluginsToDisable = ['collapse', 'dropdown', 'modal', 'tooltip', 'popover'];
        disablePrototypeJS('show', pluginsToDisable);
        disablePrototypeJS('hide', pluginsToDisable);
    }

//avoid to get the dropdown menu disappeared
    (function ($) {
        $(document).ready(function () {
            $('ul.dropdown-menu').click(function (e) {
                e.stopPropagation();
            });
            /*$('.btn').click(function(e) {
             e.preventDefault();
             $(this).addClass('active');
             });*/
        });
    })(jQuery);
}



