"use strict";

var keyStore = {};

var dispatchMouseEvent = function(target, typeString) {
  var e = document.createEvent("MouseEvents");
  e.initEvent(typeString, true, true);
  target.dispatchEvent(e);
}

var keydown = function(e) {
  if (keyStore.hasOwnProperty(e.keyIdentifier)) {
    var target = keyStore[e.keyIdentifier];
    if (target === undefined) {
      // Moderator may not have setup buttons yet, find them now.
      findTargets();
      target = keyStore[e.keyIdentifier]

      if (target === undefined)
        console.errror("Can't find buttons to attach keyboard shortcuts to.");
    }

    console.log("Sending mouseover, mousedown, mouseup, click, to ", target);
    if (target) {
      dispatchMouseEvent(target, "mouseover");
      dispatchMouseEvent(target, "mousedown");
      dispatchMouseEvent(target, "click");
      dispatchMouseEvent(target, "mouseup");
    }
    e.preventDefault();
  }
};

var findTargets = function() {
  var buttons = document.querySelectorAll(".featured .gwt-ToggleButton");
  var yesButton = buttons[0];
  var noButton = buttons[1];
  var skipButton = document.querySelectorAll(".featured .goog-button-base")[0];
  keyStore["U+004A" /* j */] = yesButton;
  keyStore["U+004B" /* k */] = noButton;
  keyStore["U+0020" /* space */] = skipButton;
}

var init = function() {
  document.body.addEventListener("keydown", keydown);
  findTargets();
  console.log("Keyboard shortcuts for Google Moderator.");
}

window.onload = init;
