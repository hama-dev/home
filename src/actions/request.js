import { firebase, googleAuthProvider } from "../firebase/firebase";

export const StartSendRequest = (
  ref,
  sendBy,
  userId,
  userEmail,
  productId,
  productImg,
  sentAt,
  requestRead,
  requestAccept,
  quantity,
  productPrice,
  totalPrice,
  reject,
  phoneNumber
) => {
  return () => {
    return firebase
      .database()
      .ref(ref)
      .set({
        sendBy,
        userId,
        userEmail,
        productId,
        productImg,
        sentAt,
        requestRead,
        requestAccept,
        quantity,
        productPrice,
        totalPrice,
        reject,
        answerdAt: "",
        phoneNumber
      });
  };
};

export const StartSaveRequestAtDb = (
  ref,
  sendBy,
  userId,
  userEmail,
  productId,
  productImg,
  sentAt,
  requestRead,
  requestAccept,
  quantity,
  productPrice,
  totalPrice,
  reject,
  phoneNumber
) => {
  return () => {
    return firebase
      .database()
      .ref(ref)
      .set({
        sendBy,
        userId,
        userEmail,
        productId,
        productImg,
        sentAt,
        requestRead,
        requestAccept,
        quantity,
        productPrice,
        totalPrice,
        reject,
        answerdAt: "",
        phoneNumber
      });
  };
};

export const StartSetRequest = ref => {
  return dispatch => {
    return firebase
      .database()
      .ref(ref)
      .once("value")
      .then(snapshot => {
        const request = [];
        let i = 0;
        snapshot.forEach(childSnapshot => {
          request.push({
            id: Object.entries(snapshot.val())[i][0],
            ...childSnapshot.val()
          });
          i++;
        });
        
        
        dispatch(setRequest(request));
      });
  };
};

export const setRequest = request => {
  return {
    type: "SET_REQUEST",
    request
  };
};

export const StartAcceptTheRequest = (requestId, userId , answerdAt) => {
  return () => {
    return firebase
      .database()
      .ref(`request/${requestId}`)
      .update({ requestAccept: true, answerdAt })
      .then(() => {
        firebase
          .database()
          .ref(`users/${userId}/request/${requestId}`)
          .update({ requestAccept: true  , answerdAt});
      });
  };
};

export const StartRejectTheRequest = (requestId, userId, msg , answerdAt) => {

  return () => {
    return firebase
      .database()
      .ref(`request/${requestId}`)
      .update({ reject: msg, answerdAt })
      .then(() => {
        firebase
          .database()
          .ref(`users/${userId}/request/${requestId}`)
          .update({ reject: msg , answerdAt });
      });
  };
};

export const StartRemoveRequest = (requestId, userId) => {
  return () => {
    return firebase
      .database()
      .ref(`request/${requestId}`)
      .remove()
      .then(() => {
        firebase
          .database()
          .ref(`users/${userId}/request/${requestId}`)
          .remove();
      });
  };
};
