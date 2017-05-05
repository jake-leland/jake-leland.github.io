(function () {

    $(document).ready(initialize);

    function initialize() {
        console.log("initializing");
        setPointerPosition();
        setSectionHeights();
        renderSectionTitles();
        setButtonRadii();

        checkSection();
        startListeners();
    }

    function setPointerPosition() {
        $("#header-pointer").css({
            'left': $("#header-home").position().left + ($("#header-home").width() / 2) - 12
        });
    }

    function setSectionHeights() {
        $(".section").css({'min-height': $(window).height() - 90});
    }

    // FIXME: line issue in safari
    function renderSectionTitles() {
        $(".section-title")
            .prepend("<hr class='left'>")
            .append("<hr class='right'>");
    }

    // FIXME: works on page reload but not load
    function setButtonRadii() {
        var r = $(".button").outerHeight() / 2;
        $(".button").css(
            {'-webkit-border-radius': r},
            {'-moz-border-radius:': r},
            {'border-radius': r}
        );
    }

    function startListeners() {
        $(".header-item").click(onHeaderItemClick);
        $(document).scroll(checkSection);
        $(window).resize(updatePointer);
    }

    function onHeaderItemClick() {
        // scroll
        var sectionName = this.innerHTML;
        sectionName = sectionName.replace('jake leland', 'home');
        $('html, body').animate({
            scrollTop: $("#" + sectionName).offset().top - 60
        });
    }

    var prevElem;
    function checkSection() {
        var elem = document.elementFromPoint(0, 60);
        // TODO: what if element doesn't exist?
        while (elem.getAttribute('class') != "section") {
            elem = elem.parentNode;
        }

        if (elem != prevElem) {
            var sectionName = elem.id;
            var bgColor = ($("#" + sectionName)).css('background-color');
            $("#header-pointer").animate({
                'border-bottom-color': (isTransparent(bgColor) ? '#fff' : bgColor),
                'left': $("#header-" + sectionName).position().left + ($("#header-" + sectionName).width() / 2) - 12
            }, 100);
            prevElem = elem;
        }
    }

    function updatePointer() {
        $("#header-pointer").css({left: $("#header-" + prevElem.id).position().left + ($("#header-" + prevElem.id).width() / 2) - 12});
    }

    function isTransparent(color) {
        return !(color != 'transparent' && color != 'rgba(0, 0, 0, 0)');
    }

})();