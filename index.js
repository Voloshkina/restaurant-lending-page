(async () => {
  const interval = 2500,
    paddingRight = 50,
    slidesWrapper = document.querySelector('.carousel-slides'),
    slides = document.querySelectorAll('.carousel-slides > li'),
    delay = (ms) => new Promise((r) => setTimeout(r, ms)),
    movLeft = (el, mov) =>
      new Promise((r) => {
        el.ontransitionend = (_) => {
          el.ontransitionend = null;
          el.style.transition = 'none';
          r();
        };
        el.style.transition = '1s';
        el.style.transform = `translateX(${-mov}px)`;
      });

  let index = 0;

  while (true) {
    await delay(interval);
    await movLeft(slidesWrapper, slides[index].clientWidth + paddingRight);

    slidesWrapper.appendChild(slides[index]);
    slidesWrapper.style.transform = `translateX(0)`;
    index = ++index % slides.length;
  }
})();

const iconMenu = document.querySelector('.navbar__burger-menu');
const menu = document.querySelector('.navbar__body');
const body = document.body;

if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    iconMenu.classList.toggle('open');
    menu.classList.toggle('open');
    body.classList.toggle('noscroll');
  });
}

const menuLinks = document.querySelectorAll('.navbar__link[data-goto]');

if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;

    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top -
        document.querySelector('.header').offsetHeight / 3;

      if (iconMenu.classList.contains('open')) {
        iconMenu.classList.remove('open');
        menu.classList.remove('open');
        body.classList.remove('noscroll');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
      e.preventDefault();
    }
  }
}
