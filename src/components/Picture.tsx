import React from 'react';

interface PictureProps {
    url: string;
    alt: string
}

const Picture: React.FC<PictureProps> = ({ url, alt }) => {
    return (
        <div>
            <img src={url} alt={alt} />
        </div>
    );
};

export default Picture;
