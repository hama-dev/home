import { firebase } from "../firebase/firebase";

export const StartUploadFile = (uuid, uuid2, image) => {
  return () => {
    return firebase
      .storage()
      .ref(`images/${uuid}/${uuid2}`)
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

export const StartSaveUploadedFileToDatabase = (
  imageUrl,
  fileUuid,
  imageUuid,
  { title, description, price, createdAt, createdBy }
) => {
  return () => {
    return firebase
      .database()
      .ref(`post/${fileUuid}`)
      .set({
        title,
        description,
        price,
        createdAt,
        createdBy
      })
      .then(() => {
        firebase
          .database()
          .ref(`post/${fileUuid}/images/${imageUuid}`)
          .set({
            imageUrl
          });
      });
  };
};

export const StartSetPost = () => {
  return (dispatch, getState) => {
    return firebase
      .database()
      .ref("post")
      .once("value")
      .then(snapshot => {
        const post = [];
        let i = 0;
        snapshot.forEach(childSnapshot => {
          const obInArr = Object.entries(snapshot.val());
          post.push({
            id: Object.entries(snapshot.val())[i][0],
            ...childSnapshot.val()
          });
          i++;
        });
        dispatch(SetPost(post));
      });
  };
};

export const SetPost = post => {
  return {
    type: "SET_POST",
    post
  };
};

export const StartDeletePost = postId => {
  return (dispatch) => {
    return firebase
      .database()
      .ref(`post/${postId}`)
      .remove()
      .then(() => {
        console.log(postId);
        dispatch(DeletePost(postId));
      });
  };
};

export const DeletePost = id => {
  console.log(id)
  return {
    type: "DELETE_POST",
    post: {
      id
    }
  };
};
