import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';

let unsub;

export async function getLibrary(userId) {
  const libraryRef = doc(getFirestore(), 'libraries', userId);
  const librarySnap = await getDoc(libraryRef);
  if (librarySnap.exists()) return librarySnap.data().books;
  createLibrary(userId);
  return [];
}

export async function storeBookAtLibrary(userId, book) {
  await updateDoc(doc(getFirestore(), 'libraries', userId), {
    books: arrayUnion(book),
  });
}

export async function removeBookAtLibrary(userId, book) {
  await updateDoc(doc(getFirestore(), 'libraries', userId), {
    books: arrayRemove(book),
  });
}

export async function updateBookReadStatus(userId, bookList) {
  await updateDoc(doc(getFirestore(), 'libraries', userId), {
    books: bookList,
  });
}

async function createLibrary(userId) {
  await setDoc(doc(getFirestore(), 'libraries', userId), {
    books: [],
  });
}

export function listenLibraryUpdates(userId, libraryChangeHandler) {
  unsub = onSnapshot(doc(getFirestore(), 'libraries', userId), (doc) =>
    libraryChangeHandler(doc.data().books)
  );
}

export function unsubscribeLibraryUpdates() {
  if (unsub) unsub();
}
