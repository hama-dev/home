import { firebase } from "../firebase/firebase";

export const StartUploadPlayer = (playerId, image, imageId) => {
  return () => {
    return firebase
      .storage()
      .ref(`player/${playerId}/${imageId}`)
      .put(image);
  };
};

export const StartgetImageUrl = (ref, childRef) => {
  return () => {
    return firebase
      .storage()
      .ref(ref)
      .child(childRef)
      .getDownloadURL();
  };
};

export const StartSaveToDatabase = (
  playerId,
  name,
  nickName,
  location,
  fb,
  inst,
  Imageurl
) => {
  return () => {
    return firebase
      .database()
      .ref(`player/${playerId}`)
      .set({
        name,
        nickName,
        location,
        fb,
        inst,
        Imageurl
      });
  };
};

export const SatrtFetchPlayer = () => {
  return dispatch => {
    return firebase
      .database()
      .ref("player")
      .once("value")
      .then(snapshot => {
        const player = [];
        let i = 0;
        snapshot.forEach(childSnapshot => {
          player.push({
            id: Object.entries(snapshot.val())[i][0],
            ...childSnapshot.val()
          });
          i++;
        });
        dispatch(SetPost(player));
      });
  };
};

export const SetPost = player => {
  return {
    type: "SET_PLAYER",
    player
  };
};

export const StartDeletePlayer = (playerId) => {
  return () => {
    return firebase
      .database()
      .ref(`player/${playerId}`)
      .remove();
  };
};
