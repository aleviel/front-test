document.addEventListener('DOMContentLoaded', function () {
    // ________________________________________________________________________
    // scroll header
    window.addEventListener('scroll', function () {
        let minHeaderHeight = 70,
            headerHeight = 160;

        headerHeight -= (this.pageYOffset / 4);

        if (headerHeight < minHeaderHeight) {
            headerHeight = minHeaderHeight;
        };

        document.querySelector('.header').style.height = headerHeight + 'px';
        document.querySelector('.header-logo svg').style.height = headerHeight + 'px';

    });
    // ________________________________________________________________________
    // photo1
    let photo1 = document.querySelector('.photo1');
    photo1.style.left = 0;
    photo1.style.top = 0;

    photo1.addEventListener('mousedown', function (e) {
        let photo1X = parseInt(photo1.style.left),
            photo1Y = parseInt(photo1.style.top),
            coords = getCoords(photo1, e.layerX, e.layerY),
            shiftX = e.pageX - coords.left,
            shiftY = e.pageY - coords.top;
        // console.log(photo1X, photo1Y);
        // console.log();
        // console.log(e.layerX, e.layerY);
        // console.log();
        // console.log(getCoords(photo1, e.layerX, e.layerY));

        function moveAt(e) {
            photo1.style.left = (e.pageX - shiftX) + photo1X + 'px';
            photo1.style.top = (e.pageY - shiftY) + photo1Y + 'px';
        }

        document.onmousemove = function (e) {
            moveAt(e);
        };

        photo1.onmouseup = function () {
            document.onmousemove = null;
            photo1.onmouseup = null;
        };

        photo1.onmouseout = function () {
            document.onmousemove = null;
            photo1.onmouseup = null;
        };
    })

    photo1.ondragstart = function () {
        return false;
    };

    function getCoords(elem, layerX, layerY) {
        let box = elem.getBoundingClientRect();
        return {
            top: (box.top + pageYOffset) / layerX,
            left: (box.left + pageXOffset) / layerY
        };
    }

    // ________________________________________________________________________
    //photo2
    let photo2 = document.querySelector('.photo2');

    photo2.addEventListener('mousemove', function (e) {
        let x = e.offsetX / photo2.clientWidth,
            y = e.offsetY / photo2.clientHeight;
        // console.log(`${e.offsetX} ${x} ${photo2.clientWidth}`);
        photo2.style.transform = 'translate(-' + (x * photo2.clientWidth / 2) + 'px, -' + (y * photo2.clientHeight / 2) + 'px';
    });
    // ________________________________________________________________________

    //select
    let selectList = document.querySelector('.select'),
        tabHeaders = document.querySelectorAll('.tab-header'),
        tabContents = document.querySelectorAll('.tab-content'),
        allTabs = document.querySelector('.tab-header-wrap');

    selectList.addEventListener('change', function () {
        let selectedTab = selectList.selectedIndex;
        tabHeaders.forEach(function (i) {
            i.classList.remove('active');
        });

        tabContents.forEach(function (i) {
            i.classList.remove('active');
        });

        tabHeaders[selectedTab].classList.add('active');
        tabContents[selectedTab].classList.add('active');
    });

    allTabs.addEventListener('click', function (e) {
        let target = e.target;
        if (target && target.classList.contains('tab-header')) {
            for (let i = 0; i < tabHeaders.length; i++) {
                if (target == tabHeaders[i]) {
                    selectList.value = i + 1;
                }
            }
        }

    });

});
