'use client';

import Image, { ImageProps } from 'next/image';
import classNames from 'classnames';
import { useState, useEffect } from 'react';

const defaultImage = '/images/no-image.png';

const isValidSrc = (src?: string): boolean => {
    if (!src || src.trim() === '') return false;
    try {
        new URL(src);
        return true;
    } catch {
        return src.startsWith('/');
    }
};

interface AppImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    src?: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    className?: string;
}

export default function AppImage({
                                     src,
                                     alt,
                                     width = 200,
                                     height = 200,
                                     className = '',
                                     fill = false,
                                     ...rest
                                 }: AppImageProps) {
    const validSrc: string = isValidSrc(src) ? src! : defaultImage;
    const [imgSrc, setImgSrc] = useState<string>(validSrc);

    useEffect(() => {
        setImgSrc(validSrc);
    }, [validSrc]);

    return (
        <Image
            alt={alt}
            fill={fill}
            src={imgSrc}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            onError={() => {
                console.warn(`Image failed to load: ${imgSrc}`);
                setImgSrc(defaultImage);
            }}
            className={classNames('object-cover', className)}
            {...rest}
        />
    );
}
