class MobileMenu {
  constructor() {
    this.hamburgerMenu = document.querySelector('.hamburger');
    this.mobileNav = document.querySelector('.main-navigation');
    this.events();
  }

  events() {
    this.hamburgerMenu.addEventListener('click', () => this.openMenu());
    window.addEventListener('click', (e) => this.closeMenu(e));
  }

  openMenu() {
    this.hamburgerMenu.classList.toggle('clicked');
    this.mobileNav.classList.toggle('show');
    document.documentElement.classList.toggle('no-scroll');
  }

  closeMenu(e) {
    if (
      !e.target.closest('.hamburger') &&
      !e.target.closest('.main-navigation') &&
      this.mobileNav.classList.contains('show')
    ) {
      console.log('close');
      this.mobileNav.classList.toggle('show');
      this.hamburgerMenu.classList.toggle('clicked');
      document.documentElement.classList.toggle('no-scroll');
      console.log('test');
    }
  }
}

export default MobileMenu;
