export const resultsStore = new Map();

export function storeResult(id: string, data: any) {
  resultsStore.set(id, data);
}

export function getResult(id: string) {
  return resultsStore.get(id);
}