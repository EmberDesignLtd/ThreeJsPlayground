import { Colour } from './../enums/colour';
export const randomColour = (): Colour => {
  const colourOptions = [];
  for (const colour in Colour) {
    colourOptions.push(Colour[colour]);
  }
  const colourIndex = Math.floor(Math.random() * Object.keys(Colour).length);
  return colourOptions[colourIndex];
};
