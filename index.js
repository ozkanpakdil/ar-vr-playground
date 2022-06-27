var POINTING_BEACH_PORTAL = false;
var POINTING_WORKSPACE_PORTAL = false;

AFRAME.registerComponent("input-listen", {
  init: function () {
    //X-button Pressed
    var cam = document.querySelector("#cam");
    cam.addEventListener("onmousewheel", function () {
      console.log("a");
    });
  }
});

AFRAME.registerComponent("listen-controllers-input", {
  init: () => {
    this.leftController = document.querySelector("#left-controller");
    this.rightController = document.querySelector("#right-controller");
    // event listeners
    let self = this;
    this.leftController.addEventListener("triggerchanged", function (event) {
      console.log(
        "Left trigger BP=" +
          POINTING_BEACH_PORTAL +
          ", WP=" +
          POINTING_WORKSPACE_PORTAL
      );
      POINTING_BEACH_PORTAL && showBeach();
      POINTING_WORKSPACE_PORTAL && showWorkspace();
    });

    this.rightController.addEventListener("triggerchanged", function (event) {
      console.log(
        "Right trigger BP=" +
          POINTING_BEACH_PORTAL +
          ", WP=" +
          POINTING_WORKSPACE_PORTAL
      );
      POINTING_BEACH_PORTAL && showBeach();
      POINTING_WORKSPACE_PORTAL && showWorkspace();
    });
  }
});

AFRAME.registerComponent("go-to-the-beach", {
  init: function () {
    var el = this.el;

    el.addEventListener("raycaster-intersected", function () {
      POINTING_BEACH_PORTAL = true;
      console.log("On Beach portal" + POINTING_BEACH_PORTAL);
    });

    el.addEventListener("raycaster-intersected-cleared", function () {
      POINTING_BEACH_PORTAL = false;
      console.log("Out Beach portal " + POINTING_BEACH_PORTAL);
    });
  }
});

AFRAME.registerComponent("go-to-work", {
  init: function () {
    var el = this.el;

    el.addEventListener("raycaster-intersected", function () {
      POINTING_WORKSPACE_PORTAL = true;
      console.log("On Workspace portal");
    });

    el.addEventListener("raycaster-intersected-cleared", function () {
      POINTING_WORKSPACE_PORTAL = false;
      console.log("Out Workspace portal");
    });
  }
});

var scene;

var showWorkspace = () => {
  scene.querySelector(".workspace.room").setAttribute("visible", "true");
  scene.querySelector(".order-a-coffee").setAttribute("visible", "true");
  scene.querySelector("#workspacePortal").classList.remove("collidable");
  scene.querySelector("#beachPortal").classList.add("collidable");
  scene.querySelector(":not(.workspace).room").setAttribute("visible", "false");
};

var showBeach = () => {
  scene.querySelector(".beach.room").setAttribute("visible", "true");
  scene.querySelector(".order-a-coffee").setAttribute("visible", "false");
  scene.querySelector("#workspacePortal").classList.add("collidable");
  scene.querySelector("#beachPortal").classList.remove("collidable");
  scene.querySelector(":not(.beach).room").setAttribute("visible", "false");
};

window.addEventListener("load", () => {
  scene = document.querySelector("a-scene");

  if (scene.hasLoaded) {
    showWorkspace();
  } else {
    scene.addEventListener("loaded", showWorkspace);
  }
});
