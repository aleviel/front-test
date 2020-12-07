window.addEventListener('scroll', function () {
	let minHeaderHeight = 70,
		headerHeight = 160;

	headerHeight -= (this.pageYOffset / 6);

	if (headerHeight < minHeaderHeight) {
		headerHeight = minHeaderHeight;
	};

	document.querySelector('.header').style.height = headerHeight + 'px';
	document.querySelector('.header-logo svg').style.height = headerHeight + 'px';

});

let photo1 = document.querySelector('.photo1');

photo1.onmousedown = function (e) {

	let startX = e.pageX,
		startY = e.pageY;

	document.onmousemove = function (e) {
		photo1.style.left = e.pageX - startX + 'px';
		photo1.style.top = e.pageY - startY + 'px';
	};

	photo1.onmouseup = function () {
		document.onmousemove = null;
		photo1.onmouseup = null;
	};
}

photo1.ondragstart = function () {
	return false;
};
