import { FC } from 'react';
import { IPhoto } from '../api/api';

interface Props {
  photos: IPhoto[];
  onImageLoad(): void;
}

export const PhotosList: FC<Props> = ({ photos, onImageLoad }) => {
  return (
    <div className="image-container">
      {photos.map(photo => {
        return (
          <a key={photo.id} href={photo.links.html} target="_blank">
            <img
              src={photo.urls.regular}
              alt={photo.alt_description || ''}
              title={photo.alt_description || ''}
              onLoad={onImageLoad}
            />
          </a>
        );
      })}
    </div>
  );
};
