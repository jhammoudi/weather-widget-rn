export const unixToFullDate = (unix) => {
  const options = {
    weekday: "long",
    year: undefined,
    month: "long",
    day: "numeric",
  };
  let dateTime = new Date(unix * 1000);
  return dateTime.toLocaleDateString(undefined, options);
};

export const unixToShortDate = (unix) => {
  const options = {
    weekday: "short",
    year: undefined,
    month: undefined,
    day: "numeric",
  };
  let dateTime = new Date(unix * 1000);
  return dateTime.toLocaleDateString(undefined, options);
};
