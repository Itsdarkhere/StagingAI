import Sketch from '@/components/StagingDisplay/ImageOptions/Sketch/Sketch';
import { RefObject, useEffect, useState } from 'react';
import styles from '../../../styles/ToolView/StagingDisplay/ImageOptions/ImageOptions.module.css';
import TopBar from '../TopBar/TopBar';
import ImageDrop from './ImageDrop/ImageDrop';
import Options from './Options/Options';

export default function ImageOptions({
  mode,
  originalImage,
  sketchRef,
  fetching,
  inpainting,
  setImage,
  dream,
}: {
  mode: string;
  originalImage: string | undefined;
  sketchRef: RefObject<any>;
  fetching: boolean;
  inpainting: (reqData: {
    room: string;
    style: string;
    image: string;
    mask: string;
    concept: string;
    copies: number;
    width: number;
    height: number;
  }) => void;
  setImage: (image: string | undefined) => void;
  dream: (imageUrl: string, width: number, height: number) => void;
}) {
  const [copies, setCopies] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const copiesChange = (value: number) => {
    setCopies(value);
  };

  const validateForm1 = async (event: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    // Return if we're already fetching.
    if (fetching) {
      return;
    }

    const target = event.target as typeof event.target & {
      room: { value: string };
      style: { value: string };
    };

    const data = {
      room: target.room.value,
      style: target.style.value,
      image: originalImage!,
      copies: copies,
    };
    // controlnet(data);
  };

  const validateForm2 = async (event: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    // Return if we're already fetching.
    if (fetching) {
      return;
    }

    let target;
    let newDimensions = await calculateNewDimensions(
      imageDimensions.width,
      imageDimensions.height
    );

    let data = {
      room: '',
      style: 'Fill with something',
      image: originalImage!,
      mask: '',
      concept: '',
      copies: copies,
      width: newDimensions.newWidth,
      height: newDimensions.newHeight,
    };

    target = event.target as typeof event.target & {
      what_to_add: { value: string };
    };
    data.room = target.what_to_add.value;

    inpainting(data);
  };

  const validateForm3 = async (event: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    // Return if we're already fetching.
    if (fetching) {
      return;
    }

    // Get new dimensions scaled down to max 512px
    let newDimensions = await calculateNewDimensions(
      imageDimensions.width,
      imageDimensions.height
    );

    dream(originalImage!, newDimensions.newWidth, newDimensions.newHeight);
  };

  const validateBasedOnMode = (event: React.SyntheticEvent) => {
    if (mode !== 'inpainting') {
      validateForm1(event);
    } else {
      validateForm3(event);
    }
  };

  const calculateNewDimensions = async (
    width: number,
    height: number,
    maxSize = 512
  ) => {
    let longerSide, shorterSide;
    let newWidth, newHeight;

    // Determine which side is the longer one or if they are equal
    if (width > height) {
      longerSide = width;
      shorterSide = height;
    } else if (width < height) {
      longerSide = height;
      shorterSide = width;
    } else {
      // If width and height are equal, both sides are resized to maxSize
      return { newWidth: maxSize, newHeight: maxSize };
    }

    const aspectRatio = shorterSide / longerSide;
    const newLongerSide = maxSize;
    const newShorterSide = Math.round((newLongerSide * aspectRatio) / 64) * 64;

    // Assign the new dimensions based on which side was the longer one
    if (width > height) {
      newWidth = newLongerSide;
      newHeight = newShorterSide;
    } else {
      newWidth = newShorterSide;
      newHeight = newLongerSide;
    }

    return { newWidth, newHeight };
  };

  return (
    <form className={styles.container} onSubmit={(e) => validateBasedOnMode(e)}>
      <TopBar setImage={setImage} canRemove={loaded} />
      <div className={styles.innerContainer}>
        <div className={styles.sketchcontainer}>
          {originalImage && loaded ? (
            <Sketch
              originalImage={originalImage}
              setImageDimensions={setImageDimensions}
              sketchRef={sketchRef}
              mode={mode}
            />
          ) : (
            <ImageDrop
              originalImage={originalImage}
              setImage={setImage}
              loaded={loaded}
              setLoaded={setLoaded}
            />
          )}
        </div>
        <Options
          fetching={fetching}
          copies={copies}
          copiesChange={copiesChange}
        />
      </div>
    </form>
  );
}
