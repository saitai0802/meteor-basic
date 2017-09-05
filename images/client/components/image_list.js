// Create our image list component
// Import React
import React from 'react';
import ImageDetail from './image_detail';

// Create our component
const ImageList = (props) => {

  // Remove all album object. becuase this itme has mutiple images.
  const validImages = props.images.filter(image => !image.is_album);

  // React knows this object gonna rendered an array of component.
  /*
   Using {} is not ES6 sytle, when we return a single element / expression !
  const RenderedImages = validImages.map(image =>{ <
        <ImageDetail key={image.title} image={image} />
    }
  );
  */

  const RenderedImages = validImages.map(image =>
      <ImageDetail key={image.title} image={image} />
    );

  return (
    <ul className="media-list list-group">
      {RenderedImages}
    </ul>
  );
};

// Export our component
export default ImageList;
