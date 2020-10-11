export default function slugify(text: string) {
  return (
    text
      .toString()
      .normalize("NFD")
      // these are special unicode characters
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/_+/g, "-")
      .replace(/--+/g, "-")
  );
}
