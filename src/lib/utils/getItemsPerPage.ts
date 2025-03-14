export function getItemsPerPage <T> (array: T[], itemsPerPage: number): number {
  return Math.round(array.length / itemsPerPage);
}