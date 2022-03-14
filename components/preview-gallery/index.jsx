import React, {useCallback, useRef, useState} from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

import {
    ListStyled,
    ListItemStyled,
    ImageWrapperStyled
} from './preview.style'

export const PreviewGallery = ({ imagesSrc, multiple = true }) => {
    const [opened, setOpened] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)
    const images = imagesSrc.map((images) => images.src)

    const handleClick = useCallback((index) => {
        setPhotoIndex(index)
        setOpened(true)
    })

    return (
        <>
        <ListStyled>
            {
                imagesSrc.map(({src}, index) => (
                    <ListItemStyled onClick={() => handleClick(index)}>
                        {index}
                        <ImageWrapperStyled>
                            <img src={src} alt=""/>
                        </ImageWrapperStyled>
                    </ListItemStyled>
                ))
            }
        </ListStyled>
        {opened && (
            <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={multiple && images[(photoIndex + 1) % images.length]}
                prevSrc={multiple && images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => setOpened(false)}
                onMovePrevRequest={() => setPhotoIndex( (prevIndex) => (photoIndex + images.length - 1) % images.length)}
                onMoveNextRequest={() => setPhotoIndex( (prevIndex) => (photoIndex + images.length + 1) % images.length)}
            />
        )}
    </>
    )
}
