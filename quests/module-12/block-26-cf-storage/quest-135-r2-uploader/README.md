# Quest 26.3: R2 Object Uploader

**Block**: 26 - Cloudflare Storage & Advanced | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Implement presigned URL generation and multipart upload coordination.
- **Handle large files** — naive AI doesn't chunk large files; always split files larger than 5MB for multipart upload.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-12/block-26-cf-storage/quest-135-r2-uploader my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `planUpload(fileName, fileSize, contentType)`** that returns the upload strategy.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Uses single upload for files < 5MB.
- Uses multipart upload for files >= 5MB.
- Calculates correct number of parts (10MB chunks).
- Returns errors for invalid inputs.

## 💡 Hints

- Naive AI tries single upload for large files — that's the edge case.
- Multipart threshold is 5MB, chunk size is 10MB.
- Use `Math.ceil(fileSize / CHUNK_SIZE)` for part count.
