import React from 'react';
import { useKeyPress } from '../../hooks/useKeyPress';

const Lightbox = ({ mediaItem, onClose, onNext, onPrev }) => {

  useKeyPress('ArrowRight', onNext);
  useKeyPress('ArrowLeft', onPrev);
  useKeyPress('Escape', onClose);

  const isVideo = mediaItem.filename.match(/\.(mp4|webm|mov)$/i);
  const filename = mediaItem.filename.split('/').pop();

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-8 text-white text-5xl font-bold hover:text-gray-300"
        onClick={onClose}
      >
        &times;
      </button>

      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Previous Button */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white text-4xl bg-black bg-opacity-30 rounded-full hover:bg-opacity-60"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          &lsaquo;
        </button>

        {/* Media Content */}
        <div className="max-w-[90%] max-h-[80vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
          {isVideo ? (
            <video src={mediaItem.url} className="max-w-full max-h-full block" controls autoPlay />
          ) : (
            <img src={mediaItem.url} alt={filename} className="max-w-full max-h-full block" />
          )}
        </div>

        {/* Next Button */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white text-4xl bg-black bg-opacity-30 rounded-full hover:bg-opacity-60"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          &rsaquo;
        </button>
      </div>

       {/* Download Button */}
        <a
            href={mediaItem.url}
            download={filename}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-white py-2 px-6 border-2 border-white rounded-md font-bold transition hover:bg-white hover:text-black"
            onClick={e => e.stopPropagation()}
        >
            Download
        </a>
    </div>
  );
};

export default Lightbox;