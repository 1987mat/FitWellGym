class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');

    if (this.form) {
      this.message = document.createElement('p');
      this.message.classList.add('form-message');
      this.events();
    }
  }

  events() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear all fields
      this.form.reset();

      // Show success message
      this.message.innerText = 'Thanks! We will be in touch soon.';
      this.form.prepend(this.message);
      setTimeout(() => {
        this.message.innerText = '';
      }, 2000);
    });
  }
}

export default ContactForm;
