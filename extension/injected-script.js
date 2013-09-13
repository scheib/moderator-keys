"use strict";

var keyStore = {};
var retryTimeForFindTargets = 10;

var dispatchMouseEvent = function(target, typeString) {
  var e = document.createEvent("MouseEvents");
  e.initEvent(typeString, true, true);
  target.dispatchEvent(e);
}

var keydown = function(e) {
  var target = keyStore[e.keyIdentifier];
  if (target) {
    dispatchMouseEvent(target, "mouseover");
    dispatchMouseEvent(target, "mousedown");
    dispatchMouseEvent(target, "click");
    dispatchMouseEvent(target, "mouseup");
    e.preventDefault();
  }
};

var insertHint = function (targetElement, hintText) {
  var hintDiv = document.createElement("div");
  hintDiv.classList.add("hintText");
  hintDiv.innerText = hintText;
  targetElement.insertBefore(hintDiv, targetElement.firstChild);
}

var bindKeyToTargetAndAddHint = function (targetElement, keyIdentifier, hintText) {
  keyStore[keyIdentifier] = targetElement;
  insertHint(targetElement, hintText);
}

var findTargets = function() {
  var buttons = document.querySelectorAll(".featured .gwt-ToggleButton");
  var yesButton = buttons[0];
  var noButton = buttons[1];
  console.assert(buttons[2] === undefined, "Expected only 2 buttons.");
  var skipButton = document.querySelectorAll(".featured .goog-button-base")[0];

  if (!yesButton || !noButton || !skipButton) {
    retryTimeForFindTargets = retryTimeForFindTargets * 2;
    setTimeout(findTargets, retryTimeForFindTargets);
    return;
  }

  bindKeyToTargetAndAddHint(yesButton, "U+004A", "j");
  bindKeyToTargetAndAddHint(noButton, "U+004B", "k");
  bindKeyToTargetAndAddHint(skipButton, "U+0020", "space");
}

var init = function() {
  document.body.addEventListener("keydown", keydown);
  findTargets();
}

window.onload = init;
