export function extractPublicId(url) {
  if (!url) return null;
  try {
    // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/users/avatars/avatar-123.jpg
    const parts = url.split('/');
    const filePart = parts[parts.length - 1]; // avatar-123.jpg
    return parts.slice(-2, -1)[0] + '/' + filePart.split('.')[0]; // users/avatars/avatar-123
  } catch {
    return null;
  }
}