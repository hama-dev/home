import { firebase, googleAuthProvider } from "../firebase/firebase";

export const startLoginWithPopup = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const StartLoginWithEmailAndPassword = (email, password) => {
  return () => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };
};

export const StartSingUpWithEmailAndPassword = (email, password) => {
  return () => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };
};

export const StartSaveAccInDatabase = (
  refLocat,
  uid,
  displayName,
  createdAt,
  email,
  adminProperty
) => {
  return () => {
    return firebase
      .database()
      .ref(refLocat)
      .child(uid)
      .set({
        name: displayName,
        email: email,
        createdAt: createdAt,
        comment: "",
        adminProperty: adminProperty
      }).then(() => {

        
      }).catch((e) => {
      });
  };
};





export const StartFetchUser = refLocat => {
  return () => {
    return firebase
      .database()
      .ref(refLocat)
      .once("value");
  };
};

export const startSingOut = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

export const login = (uid, adminProperty) => ({
  type: "LOGIN",
  uid,
  adminProperty
});

export const logout = () => ({
  type: "LOGOUT"
});
