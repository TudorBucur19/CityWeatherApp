// Converts Fahrenheit to Celsius
export function fahrenheitToCelsius(fahrenheit: number) {
  if (typeof fahrenheit !== "number" || isNaN(fahrenheit)) return null;
  return ((fahrenheit - 32) * 5) / 9;
}

export function kelvinToCelsius(kelvin: number) {
  if (typeof kelvin !== "number" || isNaN(kelvin)) return null;
  return (kelvin - 273.15).toFixed();
}
