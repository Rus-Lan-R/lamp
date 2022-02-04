import React from "react";

interface IPictureImage {
  className?: string;
  baseImage: IOptimizedImageItem;
  optimizedImages?: IOptimizedImages;
  altText: string;
  isLazy?: boolean;
}

export interface IOptimizedImages {
  mobile?: IOptimizedImageItem;
  tablet?: IOptimizedImageItem;
  laptop?: IOptimizedImageItem;
  desktop?: IOptimizedImageItem;
}

export interface IOptimizedImageItem {
  sourceFormat: string;
  sourceFormat2x?: string;
  webp?: string;
  webp2x?: string;
}

interface IPictureImageSource {
  image: IOptimizedImageItem;
  media: string;
}

const getSrcSet = (format: string, format2x?: string): string =>
  `${format}${format2x ? ` 1x, ${format2x} 2x` : ""}`;

const PictureImageSource: React.VFC<IPictureImageSource> = (
  props,
): JSX.Element => {
  const { image, media } = props;
  const { sourceFormat, sourceFormat2x, webp, webp2x } = image;

  return (
    <>
      {webp ? (
        <source
          type="image/webp"
          srcSet={getSrcSet(webp, webp2x)}
          media={media}
        />
      ) : (
        <></>
      )}

      <source srcSet={getSrcSet(sourceFormat, sourceFormat2x)} media={media} />
    </>
  );
};

const PictureImage: React.VFC<IPictureImage> = (props): JSX.Element => {
  const { className, baseImage, optimizedImages, altText, isLazy } = props;

  return (
    <picture>
      <PictureImageSource image={baseImage} media="(min-width: 1440px)" />

      {optimizedImages ? (
        <>
          {optimizedImages.laptop ? (
            <PictureImageSource
              image={optimizedImages.laptop}
              media="(min-width: 1024px)"
            />
          ) : (
            <></>
          )}

          {optimizedImages.tablet ? (
            <PictureImageSource
              image={optimizedImages.tablet}
              media="(min-width: 768px)"
            />
          ) : (
            <></>
          )}

          {optimizedImages.mobile ? (
            <PictureImageSource
              image={optimizedImages.mobile}
              media="(max-width: 767px)"
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      <img
        className={className}
        src={baseImage.sourceFormat}
        srcSet={getSrcSet(baseImage.sourceFormat, baseImage.sourceFormat2x)}
        alt={altText}
      />
    </picture>
  );
};

export { PictureImage };
