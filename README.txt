# Web (Amul & Adhiiiii) with Shared Replies

## Publish on GitHub Pages
1. Upload ALL files in this folder (not the folder itself) to a **public** repo.
2. Settings → Pages → Source: main / (root) → Save.
3. Open https://your-username.github.io/Web/

## Firebase (shared replies)
- Firestore collection: `replies`
- Documents: `main`, `letter1`, `letter2`, `letter3`, `letter4`, `letter5`
- Each document fields: `{ reply: string, createdAt: timestamp }`
- UI locks after the first reply appears for each letter.
- Real-time updates: both of you see the reply instantly.

### Firestore Rules (open for demo)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /replies/{document=**} {
      allow read, write: if true;
    }
  }
}
```
> You can later restrict writes to authenticated users only.

## Files
- `index.html` → login
- `home.html` → intro video + music
- `gallery.html` → grid with photo + 5 videos, popup letters + reply
- `style.css` → soft pink theme, floating hearts, scrollable popup
- `script.js` → login + hearts + basic popup
- `firebase.js` → Firestore integration (real-time, one-time reply)
- `/assets` → media + letter text files
