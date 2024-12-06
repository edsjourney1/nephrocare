import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  
  block.append(ul);
  movePictureInsideAnchor();
}

function movePictureInsideAnchor() {
  // Select all the 'li' elements inside the 'cards' block
  const listItems = document.querySelectorAll('.cards.block ul li');

  listItems.forEach((li) => {
    // Find the 'cards-card-image' div within the current 'li' element
    const imageDiv = li.querySelector('.cards-card-image');

    if (imageDiv) {
      // Find the 'picture' and 'a' elements inside the 'cards-card-image' div
      const pictureTag = imageDiv.querySelector('picture');
      const anchorTag = imageDiv.querySelector('a');

      if (pictureTag && anchorTag) {
        // Move the 'picture' tag inside the 'a' tag
        anchorTag.innerHTML = ''; // Clear the anchor tag content
        anchorTag.appendChild(pictureTag); // Append the picture tag inside the anchor tag
        imageDiv.append(anchorTag, imageDiv.firstChild); // Ensure the anchor tag is the first element
      }
    }
  });
}
