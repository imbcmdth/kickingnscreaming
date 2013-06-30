(function (root, factory) {
		"use strict";

		if (typeof exports === 'object') {
			module.exports = factory();
		} else if (typeof define === 'function' && define.amd) {
			define(['KickingNScreaming'], factory);
		} else {
			root.KickingNScreaming = factory();
		}
	}(this, function () {
		// Some helper functions to make everything less sucky
		function isIn (element) {
			return this.indexOf(element) !== -1;
		}

		function anyMatchesIn (a, b) {
			return a.some(isIn, b);
		}

		function getMatchesIn (a, b) {
			return b.filter(isIn, a);
		}

		function getAcceptableTypes (prefix, str) {
			if (str) {
				var accepts = str.split(' ');
				return accepts.map(function(e){ return prefix + "-" + e; });
			} else {
				return [prefix];
			}
		}

		function makeTypesString(element, types, attribute) {
			if (theTypeof(types) === "array") {
				types = types.join(' ');
			}
			var existingTypes = element.getAttribute(attribute);
			if (existingTypes) types = existingTypes + " " + types;

			return types;
		}

		function theTypeof (thing) {
			var type = Object.prototype.toString.call(thing);
			return type.toLowerCase().match(/^\[object (.+)\]$/)[1];
		}

		function beforeDragStart (e) {
			var types = e.target.getAttribute(this.draggableDataAttribute).split(' ');

			types.forEach(function _addMimeTypedData (type) {
				e.dataTransfer.setData(this.mimePrefix + "-" + type, e.target.id);
			}, this);

			e.dataTransfer.effectAllowed = this.effectAllowed;

			this.dragstart.call(e.currentTarget, e);
		}

		function doIfDragAllowed (next, e) {
			if (isDraggableAllowed.call(this, e)) {
				next.call(e.currentTarget, e);
			}
		}

		function isDraggableAllowed (e) {
			var dropTarget = e.currentTarget;

			var accepts = getAcceptableTypes(this.mimePrefix, dropTarget.getAttribute(this.droppableDataAttribute));
			var listOfTypes = Array.prototype.slice.call(e.dataTransfer.types);

			return anyMatchesIn(accepts, listOfTypes);
		}

		function beforeDrop (e) {
			var dropTarget = e.currentTarget;
			var accepts = getAcceptableTypes(this.mimePrefix, dropTarget.getAttribute(this.droppableDataAttribute));
			var listOfTypes = Array.prototype.slice.call(e.dataTransfer.types);

			var matches = getMatchesIn(accepts, listOfTypes);

			if (matches.length) {
				var draggable = document.getElementById(e.dataTransfer.getData(matches[0]));
			}

			this.drop.call(e.currentTarget, e, draggable);
		}

		function noop() { }

		function KickingNScreaming (options) {
			Object.keys(options).forEach(function _copyProperties(key) {
				this[key] = options[key];
			}, this);
		}

		KickingNScreaming.prototype = {
			// Constants
			mimePrefix: 'application/x-drag',
			draggableDataAttribute: 'data-drag-classes',
			droppableDataAttribute: 'data-accept-drag-classes',
			effectAllowed: "move",

			dragstart: noop,
			dragenter: noop,
			dragover: noop,
			dragleave: noop,
			drag: noop,
			drop: noop,
			dragend: noop,

			makeDraggable: function _setDraggableAttribute(element, types) {
				types = makeTypesString(element, types, this.draggableDataAttribute);

				element.setAttribute(this.draggableDataAttribute, types);
				element.draggable = "true";
				element.addEventListener('dragstart', beforeDragStart.bind(this));
				element.addEventListener('drag', this.drag);
				element.addEventListener('dragend', this.dragend);
			},

			makeDroppable: function _setDraggableAttribute(element, types) {
				types = makeTypesString(element, types, this.droppableDataAttribute);

				element.setAttribute(this.droppableDataAttribute, types);

				element.addEventListener('drop', beforeDrop.bind(this));
				['dragenter', 'dragover', 'dragleave'].forEach(function (name) {
					element.addEventListener(name, doIfDragAllowed.bind(this, this[name]));
				}, this);
			}
		};

		return KickingNScreaming;
}));