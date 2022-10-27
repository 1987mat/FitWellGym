class Navbar {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.events();
    this.hasScrolled;
    this.lastScrollTop = 0;
    this.delta = 5;
    this.navbarHeight = this.header.getBoundingClientRect().height;
  }

  events() {
    window.addEventListener('scroll', () => {
      // Hide navbar only on bigger screens
      if (window.innerWidth >= 992) {
        this.hasScrolled = true;

        // Check condition every 250ms
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
    // Get current scroll value
    let prev = window.pageYOffset;

    // Make sure they scroll more than delta, which may fix Safari scenario
    // if (Math.abs(this.lastScrollTop - prev) <= this.delta) return;

    // If they scrolled down and are past the navbar, add class .hide
    if (prev > this.lastScrollTop && prev > this.navbarHeight) {
      // Scroll Down
      this.header.classList.add('hide');
    } else {
      this.header.classList.remove('hide');
    }

    this.lastScrollTop = prev;
  }
}

export default Navbar;
