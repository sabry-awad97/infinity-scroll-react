export interface IPhoto {
  id: string;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    html: string;
  };
}

// Unsplash API
const apiKey = 'ACCESS_KEY';

export const getPhotos = async (count: number): Promise<IPhoto[] | null> => {
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  try {
    const response = await fetch(apiUrl);
    const photos = await response.json();
    return photos;
  } catch (error) {
    console.error(error);
    return null;
  }
};
