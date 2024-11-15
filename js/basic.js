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

  // lenis (스크롤을 부드럽게하는 효과)
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
    document.body.style.overflowY = "auto";

    // .header-wrap 요소 선택
    const headerWrap = document.querySelector('.header-wrap');
    
    if (headerWrap) {
      function checkScrollPosition() {
        const screenHeight = window.innerHeight;
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollPosition >= screenHeight) {
          headerWrap.style.backgroundColor = 'var(--color-bg-red)'; // 레드 색상
          headerWrap.classList.add('scrolled'); // 클래스 추가
        } else {
          headerWrap.style.backgroundColor = 'var(--color-bg-dark-ov)'; // 검은 색상
          headerWrap.classList.remove('scrolled'); // 클래스 제거
        }
      }

      checkScrollPosition();
      window.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
    } else {
      console.error(".header-wrap 요소를 찾을 수 없습니다.");
    }
  }, 5000); // 5초후 실행

}); //// load event listener ////

