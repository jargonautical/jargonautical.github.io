var container = document.querySelector("#container");
var activeItem = null;
var tilesUsed = [];
var impactsUsed = [];

var active = false;

function getToolName() {
  var toolName = document.getElementById('tool_name').value;
  var toolDesc = document.getElementById('description').value;
  var result = document.getElementById('result');
  var resultDesc = document.getElementById('descResult');


  var socImpact = document.querySelector('input[name="social"]:checked').value;
  var envImpact = document.querySelector('input[name="environmental"]:checked').value;
  var finImpact = document.querySelector('input[name="financial"]:checked').value;
  if (toolName.length < 3) {
    result.textContent = 'Tool name must contain at least 3 characters';
    //alert('Username must contain at least 3 characters');
  } else {
    result.textContent = 'Your tool name is: ' + toolName;
    descResult.textContent = 'What it does: ' + toolDesc;
    //alert(nameField)
    tilesResult.textContent = 'Tiles used: ' + tilesUsed;
  }
}

//var subButton = document.getElementById('subButton');
//subButton.addEventListener('click', getToolName, false);

//console.log("tool name is", toolName)

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
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  //accept: '#drag-1',
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

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    //draggableElement.classList.add('can-drop');
    //draggableElement.textContent = 'le bloc est dedans';
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
		event.relatedTarget.classList.remove('drop-ok');//enlever la class

  },

  ondrop: function (event) {
    tilesUsed.push(event.relatedTarget.id),
    console.log(event.relatedTarget.id
      + ' was dropped into '
      + event.target.id);}
});
