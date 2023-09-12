export function formatCountWithLeadingZeros(count:number) {
    // Use String.padStart to add leading zeros if count is less than 10
    return count.toString().padStart(2, '0');
  }