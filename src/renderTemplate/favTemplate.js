const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-thumbs-up fa-lg" aria-hidden="true"></i>
  </button>
`;

export { createLikeButtonTemplate, createLikedButtonTemplate };
