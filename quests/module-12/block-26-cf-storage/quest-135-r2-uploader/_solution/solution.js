/**
 * Quest 26.3: REFERENCE solution (do NOT read during the exercise)
 *
 * Plans R2 uploads with single/multipart strategy.
 */

const MULTIPART_THRESHOLD = 5 * 1024 * 1024; // 5MB
const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB

function planUpload(fileName, fileSize, contentType) {
  const errors = [];

  if (!fileName || fileName.trim() === '') {
    errors.push('fileName is required');
  }
  if (typeof fileSize !== 'number' || fileSize <= 0) {
    errors.push('fileSize must be a positive number');
  }
  if (!contentType || contentType.trim() === '') {
    errors.push('contentType is required');
  }

  if (errors.length > 0) {
    return { strategy: 'single', errors };
  }

  if (fileSize <= MULTIPART_THRESHOLD) {
    // Single upload for small files (up to 5MB)
    const presignedUrl = `https://r2.example.com/${fileName}?upload=${contentType}`;
    return { strategy: 'single', presignedUrl };
  } else {
    // Multipart upload for large files (EDGE CASE: naive AI fails this)
    const parts = Math.ceil(fileSize / CHUNK_SIZE);
    return { strategy: 'multipart', parts };
  }
}

module.exports = { planUpload };
