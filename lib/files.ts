export function fileInfo(fileName: string) {
  const extension = fileName?.split(".").pop();
  switch (extension) {
    case "mp3":
      return {
        name: fileName,
        icon: "/icons/mic.svg",
        extension,
      };
    case "mp4":
      return {
        name: fileName,
        icon: "/icons/camera.svg",
        extension,
      };
    case "jpg":
    case "jpeg":
    case "png":
      return {
        name: fileName,
        icon: "/icons/image.svg",
        extension,
      };
    default:
      return null;
  }
}
