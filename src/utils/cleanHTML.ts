import purify from "dompurify";

export const cleanHTML = (htmlString: string) => {
  return purify.sanitize(htmlString);
};
