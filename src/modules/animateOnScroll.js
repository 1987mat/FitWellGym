export function animateOnScroll() {
  const elements = document.querySelectorAll('[data-observe]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('active', entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target);
      });
    },
    { treshold: 0.7 }
  );

  [...elements].forEach((element) => {
    observer.observe(element);
  });
}
