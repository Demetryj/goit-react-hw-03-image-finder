export const ImageGalleryItem = ({
  image: { id, tags, webformatURL, largeImageURL },
}) => {
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={tags} datalargeurl={largeImageURL} />
    </li>
  );
};
