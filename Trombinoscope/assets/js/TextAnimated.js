"use strict"; //Mode strict activated

(function() {
	// Header Animation
	var texts = [ // table text list
		'2019',
		'cannes',
		'simplon',
		'trombinoscope'
	];

	var styles = ['green', 'yellow', 'red', 'blue']; // table color list
	var degrees = ['0deg', '5deg', '10deg', '-5deg', '-10deg']; // table transform degree list
	var sizes = ['lowercase', 'uppercase']; // table font case list
	var getRndInteger = function (min, max) { // function randomize
		return Math.floor(Math.random() * (max - min)) + min;
	};
	var generateTextAnimated = function () { // function to randomize text displayed
		var text = texts[getRndInteger(0, texts.length)];
		new TextAnimated(
			document.querySelector('.head_animation-items'),
			text);
	};
	var TextAnimated = /** @class */ (function () {
		function TextAnimated(container, text) {
			this.text = text;
			this.container = container;
			this.textAnimatedArr = this.getArr(this.text);
			this.render();
		}
		TextAnimated.prototype.createTag = function (tagName, content) {
			var tag = document.createElement(tagName);
			var tagInner = document.createElement(tagName);
			tag.className = "animated bounceIn text-item text-" + this.getSize() + " " + this.getStyle();
			tagInner.textContent = content;
			tagInner.style.transform = "rotate(" + this.getDegree() + ")";
			tag.appendChild(tagInner);
			return tag;
		};
		TextAnimated.prototype.getArr = function (string) {
			return string.split('');
		};
		TextAnimated.prototype.getStyle = function () {
			return styles[getRndInteger(0, styles.length)];
		};
		TextAnimated.prototype.getDegree = function () {
			return degrees[getRndInteger(0, degrees.length)];
		};
		TextAnimated.prototype.getSize = function () {
			return sizes[getRndInteger(0, sizes.length)];
		};
		TextAnimated.prototype.render = function () {
			var _this = this;
			this.container.innerHTML = '';
			this.textAnimatedArr.map(function (str) { return _this.container.appendChild(_this.createTag('div', str)); });
		};
		return TextAnimated;
	}());

	generateTextAnimated();
	setInterval(function () {
		generateTextAnimated();
	}, 6000);

	// !Header Animation
})();
