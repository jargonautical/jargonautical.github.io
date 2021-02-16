var container = document.querySelector("#container");
var activeItem = null;
var tilesUsed = [];
var impactsUsed = [];

var active = false;

function dragStart(e) {

  if (e.target !== e.currentTarget) {
    active = true;

    // this is the item we are interacting with
    activeItem = e.target;

    if (activeItem !== null) {
      if (!activeItem.xOffset) {
        activeItem.xOffset = 0;
      }

      if (!activeItem.yOffset) {
        activeItem.yOffset = 0;
      }

      if (e.type === "touchstart") {
        activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
        activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
      } else {
        console.log("doing something!");
        activeItem.initialX = e.clientX - activeItem.xOffset;
        activeItem.initialY = e.clientY - activeItem.yOffset;
      }
    }
  }
}

function dragEnd(e) {
  if (activeItem !== null) {
    activeItem.initialX = activeItem.currentX;
    activeItem.initialY = activeItem.currentY;
  }

  active = false;
  activeItem = null;
}

function drag(e) {
  if (active) {
    if (e.type === "touchmove") {
      e.preventDefault();

      activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
      activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
    } else {
      activeItem.currentX = e.clientX - activeItem.initialX;
      activeItem.currentY = e.clientY - activeItem.initialY;
    }

    activeItem.xOffset = activeItem.currentX;
    activeItem.yOffset = activeItem.currentY;

    setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

/*Downloaded from https://www.codeseek.co/nicolastilly/drag-andamp-drop-dropzone-interactjs-pdKrKP */
// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,

    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
    }

  });

  function dragMoveListener (event) {
    var target = event.target;

    //get max z-index on page
    var maxZ = Math.max.apply(null,
      $.map($('body > *'), function(e,n) {
        if ($(e).css('position') != 'static')
        return parseInt($(e).css('z-index')) || 1;
      }));
      // bring to front
      target.style.zIndex = maxZ + 1;
      target.style.position = 'relative';

      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

      // update the position attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.80,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },

  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;
      },

  ondragleave: function (event) {
    // ...
  },

  ondrop: function (event) {
    tilesUsed.push(event.relatedTarget.id),
    console.log(event.relatedTarget.id
      + ' was dropped into '
      + event.target.id);}
});
