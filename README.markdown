# Kicking-N-Screaming 

### A drag-n-drop helper

Somewhat tames HTML5's insane DnD system. Allows you to associate meta-type data to your draggable and droppable elements and to recieve the events *dragenter, dragleave, and dragover* only when both the draggable and droppable elements have one or more `types` that match.

### Node.js

For *Node.js*, use `npm`:

````console
npm install kickingnscreaming
````

..then `require` KickingNScreaming:

````javascript
var KickingNScreaming = require('kickingnscreaming');
````

### In the browser, traditional

For the *browser*, add the following to your pages:

````html
<script src="kickingnscreaming.js"></script>
````

And the global function `KickingNScreaming` will be available.

### In the browser, using AMD (require.js)

...Or using AMD in the browser:

````javascript
require(["kickingnscreaming"], function(KickingNScreaming) {
	// ...
});
````

## Usage

````javascript
var dragHelper = KickingNScreaming({
	dragover: function(e){
		console.log("BAZ");
	}
});

// Make two draggable elements
dragHelper.makeDraggable(draggableFoo, "foo");
dragHelper.makeDraggable(draggableBar, "bar");
dragHelper.makeDraggable(draggableBaz, "foo baz");

// Setup drop targets
dragHelper.makeDroppable(dropTargetFoo, "foo");
dragHelper.makeDroppable(dropTargetBar, ["bar", "baz"]);
dragHelper.makeDroppable(dropTargetAny, "foo bar baz");
````

The `dragover` function will print "BAZ" under the following conditions:

* Whenever `draggableFoo` is dragged over `dropTargetFoo`

* Whenever `draggableBar` is dragged over `dropTargetBar`

* Whenever `draggableBaz` is dragged over **any** drag target

* Whenever **any** draggable is dragged over `dropTargetAny`

## API

#### `KickingNScreaming([options])` 

Construct a new KickingNScreaming object

* `options` is an object that can override the following default properties:

````javascript
{
	// MIME-type prefix to use for storing drag data in the "dataTransfer" object
	mimePrefix: 'application/x-drag',

	// Data attribute specifying draggable's type(s)
	draggableDataAttribute: 'data-drag-classes',

	// Data attribute specifying droppable's type(s)
	droppableDataAttribute: 'data-accept-drag-classes',

	// dataTransfer.effectsAllowed
	effectAllowed: "move", 

	// Drag-n-Drop events
	dragstart: noop,
	dragenter: noop,
	dragover: noop,
	dragleave: noop,
	drag: noop,
	drop: noop,
	dragend: noop
}
````

#### `makeDroppable(element[, types])` 

Adds DnD events to a drag target

* `element` - DOM node that will become draggable

* `types` - optional string or array that specifies the type(s) of this element

#### `makeDraggable(element[, types])` 

Adds DnD events to a drop target

* `element` - DOM node that will become a drop-target

* `types` - optional string or array that specifies the type(s) of this element

## License - MIT

> Copyright (C) 2012 Jon-Carlos Rivera
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
