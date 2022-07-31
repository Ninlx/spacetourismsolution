(function ($) {
  /* scrllbr init */
  const cntnt = document.getElementById("main");
  Scrollbar.use(OverscrollPlugin);
  const options = {
    damping: 0.105,
    renderByPixels: !("ontouchstart" in document),
  };

  /* ovrscrll */
  const ovrscrllptns = {
    enable: true,
    effect: navigator.userAgent.match(/Android/) ? "glow" : "glow",
    damping: 0.105,
    maxOverscroll: navigator.userAgent.match(/Android/) ? 100 : 140,
    glowColor: cntnt.dataset.glowColor,
  };

  /* scrllbr */
  const scrollbar = [
    Scrollbar.init(cntnt, {
      ...options,
      delegateTo: document,
      plugins: {
        overscroll: { ...ovrscrllptns },
      },
    }),
  ];

  /* hdr init */
  const hdr = document.getElementById("hdr");
  const scrllbr = Scrollbar.init(document.getElementById("main"));
  scrllbr.addListener(function (status) {
    let offset = status.offset;
    hdr.style.top = offset.y + "px";
    hdr.style.left = offset.x + "px";
  });

  /* ready function start */
  $(function () {
    "use strict";

    /* prldr */
    var width = 100,
      perfData = window.performance.timing,
      EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
      time = parseInt((EstimatedTime / 1000) % 0) * 0;
    $(".ldbr").animate({ width: width + "%" }, time);

    /* anmt vle */
    function animateValue(id, start, end, duration) {
      var range = end - start,
        current = start,
        increment = end > start ? 1 : -1,
        stepTime = Math.abs(Math.floor(duration / range)),
        obj = $(id);

      /* stntrvl */
      var timer = setInterval(function () {
        current += increment;
        $(obj).text(current + "%");
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    }

    /* sttmt */
    setTimeout(function () {
      $("body").addClass("pgldd");
    }, time);

    /* actv lnks */
    const actv = window.location.href;
    const actvlnks = document
      .querySelectorAll(
        ".hdr__links, .banner-dstntn__links, .banner-crew__pagination-links, .banner-tech__pagination-links"
      )
      .forEach((nvlnks) => {
        const kkk =
          nvlnks.href === actv
            ? nvlnks.setAttribute("aria-current", "page")
            : null;
      });

    /* hmbrgr */
    $("#hmbrgr__mn").on("click", function () {
      $(this).toggleClass("shw");
    });

    /* crsr mgnt init */
    let crsrmgnt = document.querySelectorAll(
      ".hdr__brand img, .banner__right-button a, #hmbrgr, .banner-dstntn__image img"
    );
    crsrmgnt.forEach(function (elem) {
      $(document).on("mousemove touch", function (e) {
        mgntz(elem, e);
      });
    });

    /* mgntz */
    function mgntz(el, e) {
      let mX = e.pageX,
        mY = e.pageY;
      const item = $(el);
      const customDist = item.data("dist") * 70 || 120;
      const centerX = item.offset().left + item.width() / 2;
      const centerY = item.offset().top + item.height() / 2;
      var deltaX = Math.floor(centerX - mX) * -0.35;
      var deltaY = Math.floor(centerY - mY) * -0.35;
      var distance = calcDstnc(item, mX, mY);
      if (distance < customDist) {
        TweenMax.to(item, 0.5, {
          y: deltaY,
          x: deltaX,
          scale: 1,
        });
        item.addClass("mgnt");
      } else {
        TweenMax.to(item, 0.7, {
          y: 0,
          x: 0,
          scale: 1,
        });
        item.removeClass("mgnt");
      }
    }

    /* calc dstnc */
    function calcDstnc(elem, mouseX, mouseY) {
      return Math.floor(
        Math.sqrt(
          Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) +
            Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 2)
        )
      );
    }

    /* lnr ntrpltn */
    function lerp(a, b, n) {
      return (1 - n) * a + n * b;
    }

    /* crsr init */
    const crsr = document.getElementById("crsr");
    var msStppd;

    /* crsr move */
    document.addEventListener("mousemove", function (e) {
      const y = e.pageY;
      const x = e.pageX;
      crsr.style.top = y + "px";
      crsr.style.left = x + "px";
      crsr.style.display = "block";

      /* crsr stop */
      function msStp() {
        crsr.style.display = "none";
      }

      /* crsr stoptime */
      clearTimeout(msStppd);
      msStppd = setTimeout(msStp, 10000);
    });

    /* crsr out */
    document.addEventListener("mouseout", function () {
      crsr.style.display = "none";
    });

    /* crsr cndtn */
    if ($("#crsr").length > 0) {
      $(".hdr__brand img").hover(function () {
        $("#crsr").toggleClass("brnd");
      });
      $(".hdr__links").hover(function () {
        $("#crsr").toggleClass("nvlnks");
      });
      $(".banner-dstntn__links").hover(function () {
        $("#crsr").toggleClass("bnnrdstntnlnks");
      });
      $(".hmbrgr").hover(function () {
        $("#crsr").toggleClass("hmbrgr");
      });
      $(".banner-crew__pagination-links").hover(function () {
        $("#crsr").toggleClass("bnnrcrwlnks");
      });
      $(".banner__right-button a").hover(function () {
        $("#crsr").toggleClass("bnnrdstntnlnks");
      });
    }
  });
})(jQuery);
