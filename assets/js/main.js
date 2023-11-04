window.onscroll = function() {
    var header = document.getElementById("top");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add("gray");
    } else {
        header.classList.remove("gray");
    }
};