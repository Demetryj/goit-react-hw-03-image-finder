import { ImageGalleryItem } from '../ImageGalleryItem';

export const ImageGallery = ({ imageItems }) => {
  return (
    <ul className="gallery">
      {imageItems.map(item => (
        <ImageGalleryItem image={item} key={item.webformatURL} />
      ))}
    </ul>
  );
};
