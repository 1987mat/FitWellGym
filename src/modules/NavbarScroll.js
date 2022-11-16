class Navbar {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.hasScrolled;
    this.lastScrollTop = 0;
    this.navbarHeight = this.header.getBoundingClientRect().height;
    this.events();
  }

  events() {
    window.addEventListener('scroll', () => {
      // Hide navbar on bigger screens
      if (window.innerWidth >= 992) {
        this.hasScrolled = true;

        setInterval(() => {
          if (this.hasScrolled) {
            this.scroll();
            this.hasScrolled = false;
          }
        }, 150);
      }
    });
  }

  scroll() {
    let prev = window.pageYOffset;

    if (prev > this.lastScrollTop && prev > this.navbarHeight) {
      // Scroll Down
      this.header.classList.add('hide');
    } else {
      // Scroll Up
      this.header.classList.remove('hide');
    }

    this.lastScrollTop = prev;
  }
}

export default Navbar;
