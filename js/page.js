/*;(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    throttle ("scroll", "optimizedScroll");
})();*/


function each(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(i, array[i]);
  }
}

function onLoad() {
  var height = $(window).height();
  var pages = document.body.getElementsByClassName('page');
  var pos = $(window).scrollTop();
  var index = Math.floor(pos / height) + 1 % pages.length;

  var hidePage = function(index) {
    pages[index].style.height = '0px';
  }
  
  var reset = function () {
    each(pages, hidePage);
    pages[0].style.height = height + 'px';
  }

  var onscroll = function(){
    pos =  $(window).scrollTop();
    index = Math.floor(pos / height) + 1 % pages.length;
    if (pos + height >= $(document).height() || index >= pages.length) {
      reset();
      window.scrollTo(0,0);
    } else {
      var scrollPos = pos % height;
      pages[index].style.height = scrollPos + 'px';
      document.getElementById('scroll-effect').style.top = pos % height + 'px';
      if (index > 0) {
        pages[index-1].style.height = height + 'px';
      }
      if (index > 1) {
        hidePage(index-2);
      }
      if (index < pages.length-1) {
        hidePage(index+1);
      }
    }
  };

  window.addEventListener("scroll", onscroll);
  window.addEventListener("resize", function() {
    height = $(window).height();
    window.scrollTo(0, Math.max(0, (index-1) * height)); // jump to top of current page
    $('body').css('height', pages.length * height + 'px');

  });
  reset();
  document.body.style.height = pages.length * height + 'px';
}


$(document).ready(onLoad);
