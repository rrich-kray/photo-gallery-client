import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

const Modal = ({ userId, baseUrl }) => {
  const [file, setFile] = useState();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
  });

  let config = {
    headers: {
      "x-access-token": localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // create post
    const postData = await axios.post(`${baseUrl}/photo-gallery/api/posts`, {
      ...formState,
      user_id: userId,
    });
    console.log(postData);

    const data = new FormData();
    data.append("file", file);

    // Upload image
    const filename = await axios.post(
      `${baseUrl}/photo-gallery/api/posts/upload`,
      data
    );
    console.log(filename);

    const imageData = await axios.post(`${baseUrl}/photo-gallery/api/images`, {
      filename: filename.data,
      post_id: postData.data.id,
    });
    window.location.replace("/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        ></input>
        <div>{file && <img src={URL.createObjectURL(file)} />}</div>
        <div>
          <input
            type="text"
            className="title"
            name="title"
            style={{ width: "50%", marginTop: "20px" }}
            placeholder="Post Title"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            className="description-container"
            name="content"
            style={{ width: "75%", height: "100px", marginTop: "20px" }}
            placeholder="Post Description"
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
