class Like {
  constructor() {
    if (document.querySelector('.like-box')) {
      this.likeBox = document.querySelector('.like-box');
      this.events();
      this.isLiked = false;
    }
  }

  events() {
    this.likeBox.addEventListener('click', (e) => this.clickHandler(e));
  }

  // Methods
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
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ eventID: currentLikeBox.dataset.event }),
        });

        const data = await response.json();

        currentLikeBox.dataset.exist = 'yes';
        // Get number value of like
        let likeCount = parseInt(
          currentLikeBox.querySelector('.like-count').innerHTML
        );
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
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
          body: JSON.stringify({ like: currentLikeBox.dataset.like }),
        });

        const data = await response.json();

        currentLikeBox.dataset.exist = 'no';
        // Get number value of like
        let likeCount = parseInt(
          currentLikeBox.querySelector('.like-count').innerHTML
        );
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

export default Like;
