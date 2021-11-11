import React from 'react';
import Button from './Button';

/**
 * renders a tile with an image or text
 * @param {render} 
 * @returns 
 */
export default function Tile({ image, title, text, goTo, buttonText }) {
    return (
        <section>
            {image
                ? <img id='tile-image' src={image} alt={image} />
                : <>
                    <h1>{title}</h1>
                    <p>{text}</p>
                    <Button text={buttonText} link={goTo} />
                  </>
            }
        </section>
    );
}
