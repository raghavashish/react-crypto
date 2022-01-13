// Regex to add commas in price
export const priceFormatRegex = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Convert time into readable format
export const readableTime = (time) => {
  return new Date(time).toLocaleString()
}