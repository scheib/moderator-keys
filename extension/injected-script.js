"use strict";

var keyIdentifierToMouseEventTargetDict = {};

var dispatchMouseEvent = function(target, typeString) {
  var e = document.createEvent("MouseEvents");
  e.initEvent(typeString, true, true);
  target.dispatchEvent(e);
}

var keydown = function(e) {
  if (e.target.nodeName !== "TEXTAREA") {  // Do not interfere with text input.
    var mouseEventTarget = keyIdentifierToMouseEventTargetDict[e.keyIdentifier];
    if (mouseEventTarget) {
      dispatchMouseEvent(mouseEventTarget, "mouseover");
      dispatchMouseEvent(mouseEventTarget, "mousedown");
      dispatchMouseEvent(mouseEventTarget, "click");
      dispatchMouseEvent(mouseEventTarget, "mouseup");
      e.preventDefault();
    }
  }
};

var insertHint = function (targetElement, hintText) {
  if (targetElement) {
    var hintDiv = targetElement.querySelector(".hintText");
    if (!hintDiv) {
      hintDiv = document.createElement("div");
      hintDiv.classList.add("hintText");
    }
    hintDiv.innerText = hintText;
    targetElement.insertBefore(hintDiv, targetElement.firstChild);
  }
}

var bindKeyToTargetAndAddHint = function (targetElement, keyIdentifier, hintText) {
  if (keyIdentifierToMouseEventTargetDict[keyIdentifier] != targetElement) {
    keyIdentifierToMouseEventTargetDict[keyIdentifier] = targetElement;
    insertHint(targetElement, hintText);
  }
}

var findTargets = function() {
  var buttons = document.querySelectorAll(".featured .gwt-ToggleButton");
  var yesButton = buttons[0];
  var noButton = buttons[1];
  console.assert(buttons[2] === undefined, "Expected only 2 buttons.");
  var skipButton = document.querySelectorAll(".featured .goog-button-base")[0];

  bindKeyToTargetAndAddHint(yesButton, "U+004A", "j");
  bindKeyToTargetAndAddHint(noButton, "U+004B", "k");
  bindKeyToTargetAndAddHint(skipButton, "U+0020", "space");
}

var init = function() {
  document.body.addEventListener("keydown", keydown);
  findTargets();

  // As page is updated, ensure we call findTargets in case they change.
  var observer = new MutationObserver(findTargets);
  observer.observe(document.body, { childList: true, subtree: true });
}

window.onload = init;
