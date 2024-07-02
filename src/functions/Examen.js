import React from 'react';
// import React, { useEffect, useRef } from 'react';

const Examen = ({ src, scrollY, height }) => {
  // const containerRef = useRef(null);

  // useEffect(() => {
  //   const container = containerRef.current;

  //   const onIframeLoad = () => {
  //     if (container) {
  //       // Adding a slight delay to ensure the iframe content is fully loaded
  //       setTimeout(() => {
  //         container.scrollTop = scrollY;
  //         console.log('Scrolling to: ', scrollY);
  //       }, 100);
  //     }
  //   };

  //   const iframe = container.querySelector('iframe');
  //   if (iframe) {
  //     iframe.addEventListener('load', onIframeLoad);
  //   }

  //   return () => {
  //     if (iframe) {
  //       iframe.removeEventListener('load', onIframeLoad);
  //     }
  //   };
  // }, [scrollY]);

  return (
    <>
    {/* <section ref={containerRef} style={{ overflowY: 'auto', height }} className='section examen'> */}

      <iframe
        // ref={iframeRef}
        title="Examensbevis"
        src={src}
        width="100%"
        height={height}
        frameborder="0"
      ></iframe>
    </>
  );
};

export default Examen;
