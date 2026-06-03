export const uploadFileToPresignedUrl = async (
  uploadUrl: string,
  file: File,
) => {
  const response = await fetch(uploadUrl, {
    body: file,
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error(`File upload failed with status ${response.status}`);
  }
};
