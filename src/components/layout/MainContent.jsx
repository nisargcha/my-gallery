import React from 'react';
import Gallery from '../gallery/Gallery';

const MainContent = ({ media, fetchMedia }) => {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <Gallery
        media={media}
        fetchMedia={fetchMedia}
      />
    </main>
  );
};

export default MainContent;