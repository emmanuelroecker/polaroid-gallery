var polaroidGallery = (function () {
    var dataSize = [];
    var currentIndex = -1;
    var resizeTimeout = null;

    function polaroidGallery(elements) {
        elements = [].slice.call(elements);
        elements.forEach(function (item) {
            dataSize.push({width: item.offsetWidth, height: item.offsetHeight});

            item.addEventListener('click', function () {
                shuffle(elements);

                var index = Number((item.id).replace('fig', ''));
                select(index);
            })
        });

        shuffle(elements);
        navigation(elements);

        window.addEventListener('resize', function () {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(function () {
                shuffle(elements);
                if (currentIndex > 0) {
                    select(currentIndex);
                }
            }, 100);
        })
    }

    function select(index) {
        var item = document.getElementById('fig' + index);
        var scale = 1.8;
        var rotRandomD = 0;

        var newWidth = (dataSize[index].width * scale);
        var newHeight = dataSize[index].height * (newWidth / dataSize[index].width);

        console.log(window.innerWidth + ' - ' + window.innerHeight);
        var x = (window.innerWidth - newWidth) / 2;
        var y = (window.innerHeight - newHeight) / 2;

        item.style.transformOrigin = '0 0';
        item.style.WebkitTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
        item.style.msTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
        item.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
        item.style.zIndex = 999;

        currentIndex = index;
    }

    function shuffle(elements) {
        var zIndex = 1;
        elements.forEach(function (item) {
            var randomX = Math.random();
            var randomY = Math.random();
            var maxR = 45;
            var minR = -45;
            var rotRandomD = Math.random() * (maxR - minR) + minR;
            var rotRandomR = rotRandomD * Math.PI / 180;

            var rotatedW = Math.abs(item.offsetWidth * Math.cos(rotRandomR)) + Math.abs(item.offsetHeight * Math.sin(rotRandomR));
            var rotatedH = Math.abs(item.offsetWidth * Math.sin(rotRandomR)) + Math.abs(item.offsetHeight * Math.cos(rotRandomR));

            var x = Math.floor((window.innerWidth - rotatedW) * randomX);
            var y = Math.floor((window.innerHeight - rotatedH) * randomY);

            item.style.zIndex = zIndex++;
            item.style.WebkitTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
            item.style.msTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
            item.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
        })
    }

    function navigation(elements) {
        var lastIndex = dataSize.length - 1;

        var next = document.getElementById('next');
        var preview = document.getElementById('preview');

        next.addEventListener('click', function () {
            shuffle(elements);
            select((currentIndex >= lastIndex) ? 0 : currentIndex + 1);
        });

        preview.addEventListener('click', function () {
            shuffle(elements);
            select((currentIndex <= 0) ? lastIndex : currentIndex - 1);
        })
    }

    return polaroidGallery;
})();