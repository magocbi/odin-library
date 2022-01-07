import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export async function signInUser() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

export function signOutUser() {
  signOut(getAuth());
}

export function initFireBaseAuth(stateChangeHandler) {
  onAuthStateChanged(getAuth(), stateChangeHandler);
}

export function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || null;
}

export function getUserName() {
  return getAuth().currentUser.displayName;
}

export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

export function getUserId() {
  return getAuth().currentUser.uid;
}
