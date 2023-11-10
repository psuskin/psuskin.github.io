window.onscroll = function () {
  var header = document.getElementById("top");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("gray");
  } else {
    header.classList.remove("gray");
  }
};

$(function () {
  $(".img-w").each(function () {
    $(this).wrap("<div class='img-c'></div>")
    let imgSrc = $(this).find("img").attr("src");
    $(this).css('background-image', 'url(' + imgSrc + ')');
  })

  $(".img-c").click(function () {
    let w = $(this).outerWidth()
    let h = $(this).outerHeight()
    let x = $(this).offset().left
    let y = $(this).offset().top

    $(".active").not($(this)).remove()
    let copy = $(this).clone();
    copy.insertAfter($(this)).height(h).width(w).delay(500).addClass("active")
    $(".active").css('top', y);
    $(".active").css('left', x);

    setTimeout(function () {
      copy.addClass("positioned")
    }, 0)
  })
})

$(document).on("click", ".img-c.active", function () {
  let copy = $(this);
  copy.removeClass("positioned active").addClass("postactive");
  setTimeout(function () {
    copy.remove();
  }, 500)
})

"use strict";

var carousels = function () {
  $(".owl-carousel1").owlCarousel({
    loop: true,
    center: true,
    margin: 0,
    responsiveClass: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      680: {
        items: 2,
        nav: false,
        loop: false
      },
      1000: {
        items: 3,
        nav: true
      }
    }
  });
};

carousels();