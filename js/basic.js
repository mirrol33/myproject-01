window.addEventListener("load", function () {
  // 외부 html 파일 불러오기!
  var allElements = document.getElementsByTagName("*");
  Array.prototype.forEach.call(allElements, function (el) {
    var includePath = el.dataset.includePath;
    if (includePath) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          el.outerHTML = this.responseText;
        }
      };
      xhttp.open("GET", includePath, true);
      xhttp.send();
    }
  }); ////

  // lenis.js 스크롤을 부드럽게하는 효과
  const lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // lenis 멈춤
  lenis.stop();
  // 스크롤바 없애기
  document.body.style.overflow = "hidden";

  this.setTimeout(() => {
    // lenis 시작
    lenis.start();
    // 스크롤바 생성
    document.body.style.overflow = "auto";
  }, 5000); // 5초후 실행

}); //// load event listener ////
