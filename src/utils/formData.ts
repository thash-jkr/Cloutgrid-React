export function buildFormData(
  params: Record<string, string>,
  file?: { blob: Blob; key: string; filename?: string }
): FormData {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => formData.append(key, value));
  if (file) {
    formData.append(file.key, file.blob, file.filename ?? 'upload.jpg');
  }
  return formData;
}