class Search {
  // Initiate object
  constructor() {
    this.resultsDiv = document.querySelector('.results-container');
    this.openOverlayBtn = document.getElementById('search-icon');
    this.closeOverlayBtn = document.getElementById('search-close-btn');
    this.searchOverlay = document.querySelector('.search-overlay');
    this.searchInput = document.getElementById('search-input');
    this.events();
    this.isOverlayOpen = false;
    this.typerTimer;
    this.previousValue;
  }

  // Create events
  events() {
    this.openOverlayBtn.addEventListener('click', this.openOverlay.bind(this));
    this.closeOverlayBtn.addEventListener(
      'click',
      this.closeOverlay.bind(this)
    );
    document.addEventListener('keyup', this.keyPressed.bind(this));
    this.searchInput.addEventListener('keyup', this.typingLogic.bind(this));
  }

  // Methods
  openOverlay() {
    this.searchOverlay.classList.add('show');
    this.searchInput.focus();
    document.body.classList.add('no-scroll');
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
    this.searchInput.value = '';
    this.resultsDiv.innerHTML = '';
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
  }

  typingLogic() {
    // Hide loading spinner if the search value doesn't change
    if (this.searchInput.value != this.previousValue) {
      clearTimeout(this.typerTimer);

      // Empty results div and hide spinner if the search field is empty
      if (this.searchInput.value) {
        // Display loading spinner
        if (!this.isSpinnerVisible) {
          this.resultsDiv.innerHTML = '<div class="spinner"></div>';
          this.isSpinnerVisible = true;
        }
        // Display results
        this.typerTimer = setTimeout(this.displayResults.bind(this), 500);
      } else {
        this.resultsDiv.innerHTML = '';
        this.isSpinnerVisible = false;
      }
    }
    // Update current input value
    this.previousValue = this.searchInput.value;
  }

  displayResults() {
    fetch(
      siteData.root_url +
        '/wp-json/fitness/v1/search?term=' +
        this.searchInput.value
    )
      .then((response) => response.json())
      .then((results) => {
        this.resultsDiv.innerHTML = `<div class="row">
          <div class="one-third">
            <h2>General Information</h2>
            ${
              results.generalInfo.length
                ? '<ul>'
                : '<p>No general information found.</p>'
            }
            ${results.generalInfo
              .map(
                (item) =>
                  `<li><a href="${item.url}">${item.title}</a> 
                  ${
                    item.postType == 'post' ? `by ${item.authorName}` : ''
                  }</li>`
              )
              .join('')}

          </div>
          <div class="one-third">
            <h2>Classes</h2>
            ${
              results.classes.length
                ? '<ul class="search-list">'
                : `<p>No class matches that search. <a href="${siteData.root_url}/classes">View all classes.</a></p>`
            }
            ${results.classes
              .map(
                (item) => `
                <li>
                  <a href="${item.url}" class="image-link">
                    <img src="${item.image}" alt="image-link">
                    <span>${item.title}</span>
                  </a>
                </li>
              `
              )
              .join('')}
              ${results.classes.length ? '</ul>' : ''}
            <h2>Workouts</h2>
            ${
              results.workouts.length
                ? '<ul class="search-list">'
                : `<p>No class matches that search. <a href="${siteData.root_url}/workouts">View all workouts.</a></p>`
            }
            ${results.workouts
              .map(
                (item) => ` <li>
              <a href="${item.url}" class="image-link">
                <img src="${item.image}" alt="image-link">
                <span>${item.title}</span>
              </a>
            </li>`
              )
              .join('')}
          </div>
          <div class="one-third">
            <h2>Events</h2>
            ${
              results.events.length
                ? ''
                : '<p>No event matches that search.</p>'
            }
            ${results.events
              .map(
                (item) => `
                <div class="single-event">
                  <div class="event-info">
                    <a href="${item.url}">${item.title}</a>
                  </div>
                </div>
              `
              )
              .join('')}
          </div>
        </div>`;
        this.isSpinnerVisible = false;
      })
      .catch((error) => {
        this.resultsDiv.innerHTML = 'Something went wrong.';
        this.isSpinnerVisible = false;
      });
  }

  keyPressed(e) {
    let key = e.keyCode;
    // Open search overlay only if the overlay is currently closed, the key pressed is 's' and there aren't any other input or textarea currently focused
    if (
      key === 83 &&
      !this.isOverlayOpen &&
      !document.querySelector('input:focus, textarea:focus')
    ) {
      this.openOverlay();
    }

    if (key === 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }
}

export default Search;
