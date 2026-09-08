---
name: GitHub repository uploads
description: Reliable approach for uploading a complete workspace to an empty GitHub repository through the connected GitHub API.
---

An empty GitHub repository must receive an initial file commit through the Contents API before the low-level Git Data API will accept blob uploads. After that bootstrap commit, upload files as blobs, create a tree, create one commit, and update the branch reference.

**Why:** GitHub returns `409 Git Repository is empty` for blob creation until the repository has a first commit. The Replit connector also rate-limits bursts of GitHub API calls.

**How to apply:** For bulk workspace uploads, exclude dependency caches, `.git`, generated build output, and tool caches; use a slow bounded queue for blob creation; then verify the final tree and commit URL.