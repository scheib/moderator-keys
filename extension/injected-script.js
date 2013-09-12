"use strict"

//(function () {

  var keyStore = {};
  var lastMouse = undefined;

  var dispatchMouseEvent = function(target, typeString) {
    var e = document.createEvent("MouseEvents");
    e.initEvent(typeString, true, true);
    target.dispatchEvent(e);
  }

  var mousemove = function(e) { lastMouse = e; };

  var keydown = function(e) {
    if (e.ctrlKey) {
      // Record click target.
      console.log("Storing a key " + e.keyCode + " " + e.keyIdentifier);
      keyStore[e.keyIdentifier] =
          document.elementFromPoint(lastMouse.clientX, lastMouse.clientY);
      e.preventDefault();
    } else if (keyStore.hasOwnProperty(e.keyIdentifier)) {
      // Send a synthetic click.
      var target = keyStore[e.keyIdentifier];
      console.log("Sending mousedown, mouseup, click, to ", target);
      if (target) {
        dispatchMouseEvent(target, "mouseover");
        dispatchMouseEvent(target, "mousedown");
        dispatchMouseEvent(target, "click");
        dispatchMouseEvent(target, "mouseup");
      }
      e.preventDefault();
    }
  };

  document.body.addEventListener("mousemove", mousemove);
  document.body.addEventListener("keydown", keydown);

  console.log("Keyboard shortcuts for Google Moderator.");
//})();
