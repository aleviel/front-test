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



function moveEl(e) {

}