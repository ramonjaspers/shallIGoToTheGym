import React from 'react';
import Button from './Button';
export default function Tile({ image, title, text, goTo}) {
    return (
        <section>
            {image
                ? <img id='tileImage' src={image} alt={image} />
                : <>
                    <h1>{title}</h1>
                    <p>{text}</p>
                    <Button text={title} link={goTo} />
                </>
            }
        </section>
    );
}