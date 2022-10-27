/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ "./css/style.scss");
/* harmony import */ var _modules_MobileMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/MobileMenu */ "./src/modules/MobileMenu.js");
/* harmony import */ var _modules_Search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Search */ "./src/modules/Search.js");
/* harmony import */ var _modules_MyComments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/MyComments */ "./src/modules/MyComments.js");
/* harmony import */ var _modules_Like__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/Like */ "./src/modules/Like.js");
/* harmony import */ var _modules_NavbarScroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/NavbarScroll */ "./src/modules/NavbarScroll.js");
/* harmony import */ var _modules_ContactForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/ContactForm */ "./src/modules/ContactForm.js");
 // Modules / Classes






 // Instantiate a new object using our modules/classes

const mobileMenu = new _modules_MobileMenu__WEBPACK_IMPORTED_MODULE_1__["default"]();
const search = new _modules_Search__WEBPACK_IMPORTED_MODULE_2__["default"]();
const myComments = new _modules_MyComments__WEBPACK_IMPORTED_MODULE_3__["default"]();
const likes = new _modules_Like__WEBPACK_IMPORTED_MODULE_4__["default"]();
const navbar = new _modules_NavbarScroll__WEBPACK_IMPORTED_MODULE_5__["default"]();
const contactForm = new _modules_ContactForm__WEBPACK_IMPORTED_MODULE_6__["default"]();

/***/ }),

/***/ "./src/modules/ContactForm.js":
/*!************************************!*\
  !*** ./src/modules/ContactForm.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    this.form.addEventListener('submit', e => {
      e.preventDefault(); // Clear all fields

      this.form.reset(); // Show success message

      this.message.innerText = 'Thanks! We will be in touch soon.';
      this.form.prepend(this.message);
      setTimeout(() => {
        this.message.innerText = '';
      }, 2000);
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContactForm);

/***/ }),

/***/ "./src/modules/Like.js":
/*!*****************************!*\
  !*** ./src/modules/Like.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Like {
  constructor() {
    if (document.querySelector('.like-box')) {
      this.likeBox = document.querySelector('.like-box');
      this.events();
      this.isLiked = false;
    }
  }

  events() {
    this.likeBox.addEventListener('click', e => this.clickHandler(e));
  } // Methods


  clickHandler(e) {
    let currentLikeBox = e.target.closest('.like-box');

    if (currentLikeBox.dataset.exist === 'yes') {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox);
    }
  }

  createLike(currentLikeBox) {
    let url = siteData.root_url + '/wp-json/fitness/v1/manageLike';

    async function create() {
      try {
        const response = await fetch(url, {
          headers: {
            'X-WP-Nonce': siteData.nonce,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            eventID: currentLikeBox.dataset.event
          })
        });
        const data = await response.json();
        currentLikeBox.dataset.exist = 'yes'; // Get number value of like

        let likeCount = parseInt(currentLikeBox.querySelector('.like-count').innerHTML);
        likeCount++;
        currentLikeBox.querySelector('.like-count').innerHTML = likeCount;
        currentLikeBox.dataset.like = data;
      } catch (err) {
        console.log('Sorry');
      }
    }

    create();
  }

  deleteLike(currentLikeBox) {
    let url = siteData.root_url + '/wp-json/fitness/v1/manageLike';

    async function remove() {
      try {
        const response = await fetch(url, {
          headers: {
            'X-WP-Nonce': siteData.nonce,
            'Content-Type': 'application/json'
          },
          method: 'DELETE',
          body: JSON.stringify({
            like: currentLikeBox.dataset.like
          })
        });
        const data = await response.json();
        currentLikeBox.dataset.exist = 'no'; // Get number value of like

        let likeCount = parseInt(currentLikeBox.querySelector('.like-count').innerHTML);
        likeCount--;
        currentLikeBox.querySelector('.like-count').innerHTML = likeCount;
        currentLikeBox.dataset.like = '';
      } catch (err) {
        console.log('Sorry');
      }
    }

    remove();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Like);

/***/ }),

/***/ "./src/modules/MobileMenu.js":
/*!***********************************!*\
  !*** ./src/modules/MobileMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MobileMenu {
  constructor() {
    this.hamburgerMenu = document.querySelector('.hamburger');
    this.mobileNav = document.querySelector('.main-navigation');
    this.events();
  }

  events() {
    this.hamburgerMenu.addEventListener('click', () => this.openMenu());
    window.addEventListener('click', e => this.closeMenu(e));
  }

  openMenu() {
    this.hamburgerMenu.classList.toggle('clicked');
    this.mobileNav.classList.toggle('show');
    document.documentElement.classList.toggle('no-scroll');
  }

  closeMenu(e) {
    if (!e.target.closest('.hamburger') && !e.target.closest('.main-navigation') && this.mobileNav.classList.contains('show')) {
      console.log('close');
      this.mobileNav.classList.toggle('show');
      this.hamburgerMenu.classList.toggle('clicked');
      document.documentElement.classList.toggle('no-scroll');
      console.log('test');
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MobileMenu);

/***/ }),

/***/ "./src/modules/MyComments.js":
/*!***********************************!*\
  !*** ./src/modules/MyComments.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MyComments {
  constructor() {
    if (document.querySelector('#my-comments')) {
      this.myComments = document.querySelector('#my-comments');
      this.events();
    }
  }

  events() {
    this.myComments.addEventListener('click', e => this.clickHandler(e));
    document.querySelector('.submit-comment-btn').addEventListener('click', e => this.createNewComment(e));
  }

  clickHandler(e) {
    if (e.target.classList.contains('delete-btn') || e.target.classList.contains('fa-trash-o')) this.deleteComment(e);
    if (e.target.classList.contains('edit-btn') || e.target.classList.contains('fa-pencil') || e.target.classList.contains('fa-times')) this.editComment(e);
    if (e.target.classList.contains('update-btn') || e.target.classList.contains('fa-check')) this.updateComment(e);
  }

  findNearestParentLi(el) {
    let thisComment = el;

    while (thisComment.tagName != 'LI') {
      thisComment = thisComment.parentElement;
    }

    return thisComment;
  }

  editComment(e) {
    // Get clicked comment
    let comment = this.findNearestParentLi(e.target);

    if (comment.dataset.state == 'editable') {
      this.makeCommentReadOnly(comment);
    } else {
      this.makeCommentEditable(comment);
    }
  }

  makeCommentEditable(comment) {
    // Change edit button to cancel button
    comment.querySelector('.edit-btn').innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    comment.querySelectorAll('input, textarea').forEach(item => {
      item.readOnly = false;
      item.classList.add('edit-mode');
    }); // Show Save Button

    comment.querySelector('.update-btn').classList.add('--visible'); // Set data attribute editable

    comment.setAttribute('data-state', 'editable');
  }

  makeCommentReadOnly(comment) {
    // Change edit button to cancel button
    comment.querySelector('.edit-btn').innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
    comment.querySelectorAll('input, textarea').forEach(item => {
      item.readOnly = true;
      item.classList.remove('edit-mode');
    }); // Hide Save Button

    comment.querySelector('.update-btn').classList.remove('--visible'); // Remove data attribute editable

    comment.removeAttribute('data-state', 'editable');
  }

  deleteComment(e) {
    // Get clicked comment
    let comment = this.findNearestParentLi(e.target); // Send delete request

    let url = siteData.root_url + '/wp-json/wp/v2/comment/' + comment.dataset.id;

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    }

    fetch(url, {
      headers: {
        'X-WP-Nonce': siteData.nonce
      },
      method: 'DELETE'
    }).then(handleErrors).then(function (response) {
      console.log('Comment Deleted', response); // Fade out transition

      comment.style.height = `${comment.offsetHeight}px`;
      setTimeout(() => {
        comment.classList.add('fade-out');
      }, 20);
      setTimeout(() => {
        comment.remove();
      }, 300); // Remove message alert when user deletes an existing comment

      if (response.userCommentCount < 5) {
        document.querySelector('.comment-limit-message').classList.remove('visible');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  updateComment(e) {
    // Get clicked comment
    let comment = this.findNearestParentLi(e.target); // Send post request

    let url = siteData.root_url + '/wp-json/wp/v2/comment/' + comment.dataset.id;
    let ourUpdateComment = {
      title: comment.querySelector('.comment-input-field').value,
      content: comment.querySelector('.comment-body-field').value
    };

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    } // Reference to myComments


    const that = this;
    fetch(url, {
      headers: {
        'X-WP-Nonce': siteData.nonce,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(ourUpdateComment)
    }).then(handleErrors).then(function (response) {
      console.log('ok', response);
      that.makeCommentReadOnly(comment);
    }).catch(function (error) {
      console.log(error);
    });
  }

  createNewComment(e) {
    const parent = e.target.parentElement.parentElement;
    let title = parent.querySelector('.comment-title').value;
    let content = parent.querySelector('.comment-body').value;

    if (title !== '' && content !== '') {
      // Construct the new comment object
      let ourNewComment = {
        title: title,
        content: content,
        status: 'publish'
      };
      let url = siteData.root_url + '/wp-json/wp/v2/comment/';

      async function newComment() {
        try {
          const response = await fetch(url, {
            headers: {
              'X-WP-Nonce': siteData.nonce,
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(ourNewComment)
          });
          const data = await response.text(); // Check if the user reached the max number of comments

          if (data !== 'You have reached your comment limit.') {
            const result = JSON.parse(data); // Clear input fields

            parent.querySelector('.comment-title').value = '';
            parent.querySelector('.comment-body').value = ''; // Add the new comment to the list

            document.querySelector('#my-comments').insertAdjacentHTML('afterbegin', `
              <li data-id="${result.id}" class="fade-in-calc">
                <div class="comment-top">
                  <input class="comment-input-field" readonly value="${result.title.raw}">
                  <button class="edit-btn"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                  <button class="delete-btn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                </div>
                <textarea class="comment-body-field" readonly>${result.content.raw}</textarea>
                <button class="update-btn"><i class="fa fa-check" aria-hidden="true"></i></button>
              </li>`); // Fade in transition

            let finalHeight,
                newlyCreated = document.querySelector('#my-comments li'); // give the browser 30 milliseconds to have the invisible element added to the DOM before moving on

            setTimeout(function () {
              finalHeight = `${newlyCreated.offsetHeight}px`;
              newlyCreated.style.height = '0px';
            }, 30); // give the browser another 20 milliseconds to count the height of the invisible element before moving on

            setTimeout(function () {
              newlyCreated.classList.remove('fade-in-calc');
              newlyCreated.style.height = finalHeight;
            }, 50); // wait the duration of the CSS transition before removing the hardcoded calculated height from the element so that our design is responsive once again

            setTimeout(function () {
              newlyCreated.style.removeProperty('height');
            }, 450);
          } else {
            // Show message alert
            document.querySelector('.comment-limit-message').classList.add('visible');
          }
        } catch (err) {
          console.log(err);
        }
      }

      newComment();
    } else {
      // Show message alert
      parent.querySelector('.message').innerHTML = 'Please fill both fields.';
      setTimeout(() => {
        parent.querySelector('.message').innerHTML = '';
      }, 2000);
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyComments);

/***/ }),

/***/ "./src/modules/NavbarScroll.js":
/*!*************************************!*\
  !*** ./src/modules/NavbarScroll.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
        this.hasScrolled = true; // Check condition every 250ms

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
    let prev = window.pageYOffset; // Make sure they scroll more than delta, which may fix Safari scenario
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);

/***/ }),

/***/ "./src/modules/Search.js":
/*!*******************************!*\
  !*** ./src/modules/Search.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  } // Create events


  events() {
    this.openOverlayBtn.addEventListener('click', this.openOverlay.bind(this));
    this.closeOverlayBtn.addEventListener('click', this.closeOverlay.bind(this));
    document.addEventListener('keyup', this.keyPressed.bind(this));
    this.searchInput.addEventListener('keyup', this.typingLogic.bind(this));
  } // Methods


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
      clearTimeout(this.typerTimer); // Empty results div and hide spinner if the search field is empty

      if (this.searchInput.value) {
        // Display loading spinner
        if (!this.isSpinnerVisible) {
          this.resultsDiv.innerHTML = '<div class="spinner"></div>';
          this.isSpinnerVisible = true;
        } // Display results


        this.typerTimer = setTimeout(this.displayResults.bind(this), 500);
      } else {
        this.resultsDiv.innerHTML = '';
        this.isSpinnerVisible = false;
      }
    } // Update current input value


    this.previousValue = this.searchInput.value;
  }

  displayResults() {
    fetch(siteData.root_url + '/wp-json/fitness/v1/search?term=' + this.searchInput.value).then(response => response.json()).then(results => {
      this.resultsDiv.innerHTML = `<div class="row">
          <div class="one-third">
            <h2>General Information</h2>
            ${results.generalInfo.length ? '<ul>' : '<p>No general information found.</p>'}
            ${results.generalInfo.map(item => `<li><a href="${item.url}">${item.title}</a> 
                  ${item.postType == 'post' ? `by ${item.authorName}` : ''}</li>`).join('')}

          </div>
          <div class="one-third">
            <h2>Classes</h2>
            ${results.classes.length ? '<ul class="search-list">' : `<p>No class matches that search. <a href="${siteData.root_url}/classes">View all classes.</a></p>`}
            ${results.classes.map(item => `
                <li>
                  <a href="${item.url}" class="image-link">
                    <img src="${item.image}" alt="image-link">
                    <span>${item.title}</span>
                  </a>
                </li>
              `).join('')}
              ${results.classes.length ? '</ul>' : ''}
            <h2>Workouts</h2>
            ${results.workouts.length ? '<ul class="search-list">' : `<p>No class matches that search. <a href="${siteData.root_url}/workouts">View all workouts.</a></p>`}
            ${results.workouts.map(item => ` <li>
              <a href="${item.url}" class="image-link">
                <img src="${item.image}" alt="image-link">
                <span>${item.title}</span>
              </a>
            </li>`).join('')}
          </div>
          <div class="one-third">
            <h2>Events</h2>
            ${results.events.length ? '' : '<p>No event matches that search.</p>'}
            ${results.events.map(item => `
                <div class="single-event">
                  <div class="event-info">
                    <a href="${item.url}">${item.title}</a>
                  </div>
                </div>
              `).join('')}
          </div>
        </div>`;
      this.isSpinnerVisible = false;
    }).catch(error => {
      this.resultsDiv.innerHTML = 'Something went wrong.';
      this.isSpinnerVisible = false;
    });
  }

  keyPressed(e) {
    let key = e.keyCode; // Open search overlay only if the overlay is currently closed, the key pressed is 's' and there aren't any other input or textarea currently focused

    if (key === 83 && !this.isOverlayOpen && !document.querySelector('input:focus, textarea:focus')) {
      this.openOverlay();
    }

    if (key === 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);

/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkfit_well_theme"] = globalThis["webpackChunkfit_well_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map