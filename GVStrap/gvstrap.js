(function () {
    window.addEventListener('load', function () {
        let sel = [".gv-dropdown-1"];
        document.querySelectorAll(sel[0]).forEach(function (item) {
            let clicked = false;
            let last = item.querySelector(sel[0] + '>*:last-child');
            // last.classList.toggle('disp-none');
            item.addEventListener('click', function () {
                last.classList.toggle('gv-disp-none');
                clicked = true;
            });
            document.addEventListener('click', function () {
                if (!clicked) last.classList.toggle('gv-disp-none', true);
                clicked = false;
            });
        });
    });
})()