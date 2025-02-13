// function to convert image to base64
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to convert image to Base64"));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// function to convert based64 to image
export const convertBase64ToImageURL = (base64String: string) => {
  if (!base64String) return "";

  // Detect the image format based on the base64 string
  let mimeType = "image/jpeg"; // Default to JPEG
  if (base64String.startsWith("iVBORw0K")) mimeType = "image/png"; // PNG
  if (base64String.startsWith("/9j/")) mimeType = "image/jpeg"; // JPEG
  if (base64String.startsWith("R0lGODdh")) mimeType = "image/gif"; // GIF
  if (base64String.startsWith("UklGR")) mimeType = "image/webp"; // WebP

  return `data:${mimeType};base64,${base64String}`;
};


// functon to download the qr as pdf 
export const downloadPdf = (base64String: string, fileName: string) => {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
