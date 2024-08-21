export const baseImageUnknown = {
  url: "https://via.placeholder.com/50?text=?",
  width: 50,
  height: 50,
};

export const getImageUrl = (images: Array<ImageT>) => {
  let bestImage = baseImageUnknown;
  if (images) {
    bestImage = images.length >= 2 ? images[1] : images[0];
  }
  let url = undefined;
  try {
    url = bestImage.url;
  } catch (e) {
    url = baseImageUnknown.url;
  }

  return url;
};
