export const fuzzyMatch = (text: string, query: string) => {
  text = text.toLowerCase();
  query = query.toLowerCase();

  let t = 0;
  let q = 0;

  while (t < text.length && q < query.length) {
    if (text[t] === query[q]) q++;
    t++;
  }

  return q === query.length;
};