import React from 'react';
// import PropTypes from 'prop-types';

export default function ImageGalleryItem({ item, onClick }) {
  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img
        src={item.webformatURL}
        alt={item.tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

// export default function ImageGalleryItem({ item, onClick }) {
//   return (
//     <li className="ImageGalleryItem" onClick={onClick}>
//       <img
//         src={item.webformatURL}
//         alt={item.tags}
//         className="ImageGalleryItem-image"
//       />
//     </li>
//   );
// }
