import React from 'react';

export default function Tile({ image, title, paragraphs }) {
    return (
        <section>
            {image
                ? <img src={image} alt={image} />
                : <>
                    <h2>{title}</h2>
                    {paragraphs.map((paragraph) => {
                        return <p>{paragraph}</p>;
                    })}
                </>
            }
        </section>
    );
}