'use strict';

var utils = {
    toggleView: function(selector, show) {
        if (show) {
            $(selector).removeClass("hide").addClass("show");
        } else {
            $(selector).removeClass("show").addClass("hide");
        }
    }
};