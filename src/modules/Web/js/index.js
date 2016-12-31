'use strict';

if (!window.smartshare) {
    window.smartshare = {};
} else {
    console.log("var already defined");
}

$(document).ready(function() {
    smartshare.create();
    smartshare.login();
});