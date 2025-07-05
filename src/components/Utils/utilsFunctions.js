export const generateBasedOnCategory = (category, variant) => {
  if (category === "mobile" || category === "laptop") {
    return `${variant}GB`;
  } else if (category === "Tv") {
    return `${variant}inch`;
  }
  else{
    return "-"
  }
};
