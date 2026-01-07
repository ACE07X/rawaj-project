import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

const ImageWithFallback = ({ src, alt, className, fallbackSrc }) => {
    const [error, setError] = useState(false);

    const handleError = () => {
        setError(true);
    };

    if (error) {
        if (fallbackSrc) {
            return <img src={fallbackSrc} alt={alt} className={className} />;
        }
        return (
            <div className={`bg-slate-800 flex items-center justify-center ${className}`}>
                <ImageOff className="w-8 h-8 text-slate-600" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={handleError}
        />
    );
};

export default ImageWithFallback;
