import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9Sod6hohHmZYd-DV3AA6UDy7TgkEQBdo",
  authDomain: "web-n-8625a.firebaseapp.com",
  projectId: "web-n-8625a",
  storageBucket: "web-n-8625a.firebasestorage.app",
  messagingSenderId: "713331245399",
  appId: "1:713331245399:web:5cefa5dd63736a46603e12",
  measurementId: "G-VN3S8GWJWB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const letterMap = {
  'main': 'assets/letter_main.txt',
  'letter1': 'assets/letter1.txt',
  'letter2': 'assets/letter2.txt',
  'letter3': 'assets/letter3.txt',
  'letter4': 'assets/letter4.txt',
  'letter5': 'assets/letter5.txt',
};

let currentId = null;
const letterBody = document.getElementById('letterBody');
const replyBox = document.getElementById('replyBox');
const replySubmit = document.getElementById('replySubmit');
const savedReply = document.getElementById('savedReply');
const charCount  = document.getElementById('charCount');
const popupEl = document.getElementById('letterPopup');

if (replyBox && charCount) {
  replyBox.addEventListener('input', () => {
    const len = replyBox.value.length;
    charCount.textContent = `${len} / 1000`;
  });
}

let unsub = null;

window.openLetter = async function(id){
  currentId = id;
  if (popupEl) popupEl.style.display = 'block';

  // Load letter
  const url = letterMap[id];
  if (letterBody && url) {
    try{
      const res = await fetch(url);
      const text = await res.text();
      letterBody.textContent = text;
    }catch(e){
      letterBody.textContent = 'Unable to load letter.';
    }
  }

  // Clean previous listener
  if (typeof unsub === 'function') { unsub(); unsub = null; }

  const dref = doc(db, 'replies', currentId);
  unsub = onSnapshot(dref, (snap) => {
    const data = snap.data();
    if (data && data.reply) {
      savedReply.textContent = 'Her Reply: ' + data.reply;
      document.getElementById('replySection').style.display = 'none';
    } else {
      savedReply.textContent = '';
      document.getElementById('replySection').style.display = 'block';
    }
  });
};

if (replySubmit) {
  replySubmit.addEventListener('click', async () => {
    const txt = (replyBox.value || '').trim();
    if (!txt || !currentId) return;
    const dref = doc(db, 'replies', currentId);

    const existing = await getDoc(dref);
    if (existing.exists()) {
      // already locked
      return;
    }
    await setDoc(dref, { reply: txt, createdAt: serverTimestamp() });
    replyBox.value = '';
  });
}

popupEl?.addEventListener('click', (e) => {
  if (e.target === popupEl) popupEl.style.display = 'none';
});
