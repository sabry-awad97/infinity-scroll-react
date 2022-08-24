import { FC, useCallback, useEffect, useState } from 'react';
import { getPhotos, IPhoto } from './api/api';

import { useEventListener } from './hooks/useEventListener';
import { Title } from './components/Title';
import { Loader } from './components/Loader';
import { PhotosList } from './components/PhotosList';

const App: FC = () => {
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const [ready, setReady] = useState(false);

  useEventListener(
    'scroll',
    useCallback(async () => {
      if (
        window.scrollY + window.innerHeight >=
          document.body.offsetHeight - 1000 &&
        ready
      ) {
        setReady(false);
        getPhotos(30).then(photos => {
          if (photos) {
            setPhotos(prev => {
              if (prev) {
                prev = prev.concat(photos);
              }
              return prev;
            });
          }
        });
      }
    }, [ready])
  );

  useEffect(() => void getPhotos(5).then(setPhotos), [setPhotos]);

  if (!photos) {
    return <Loader />;
  }

  return (
    <>
      <Title />
      <PhotosList
        photos={photos}
        onImageLoad={() => {
          setImagesLoaded(prev => prev + 1);

          if (imagesLoaded + 1 === photos.length) {
            setReady(true);
          }
        }}
      />
    </>
  );
};

export default App;
