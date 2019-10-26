import React from "react";
import { NavLink } from "react-router-dom";
import numeral from "numeral";
import AdminDeletePost from "./AdminDeletePost";

const ImageGroup = prop => {
  return (
    <div className="image-group col span-1-of-4">
      <div className="product--orange">
        <div className="product_inner">
          <img 
            src={Object.entries(prop.post.images)[0][1].imageUrl}
            width="300"
          />
          <NavLink className="image-group-navLink" to={`/post/${prop.post.id}`}>
            <p className="p-title">{prop.post.title}</p>
          </NavLink>
          <p className="p-price">
            {numeral(prop.post.price).format("$0,0.00")}
          </p>
          <NavLink to={`/post/${prop.post.id}`}>
            <button>Buy</button>
          </NavLink>
          <AdminDeletePost postId={prop.post.id} />
        </div>
      </div>
    </div>
  );
};

export default ImageGroup;
