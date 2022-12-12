import React, { useState } from "react";
import axios from "axios";
import styles from "../../pages/Login/styles.module.scss";
import { uploadFile } from "../../utils/uploadFile";
import "./Modal.css";

const Modal = ({ userId, baseUrl }) => {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [file, setFile] = useState();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
  });

  let config = {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("token") ? localStorage.getItem("token") : ""
      }`,
    },
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    if (!isLoading) {
      e.preventDefault();
      const errorsTemp = [];

      if (!file) {
        errorsTemp.push("Your post must include an image file.");
      }

      if (!formState.title) {
        errorsTemp.push("Your post must include a title.");
      }

      if (!formState.content) {
        errorsTemp.push("Your post must include content.");
      }

      if (errorsTemp.length > 0) {
        setErrors(errorsTemp);
        return;
      }
      // create post
      const postData = await axios.post(
        `${baseUrl}/photo-gallery/api/posts`,
        {
          ...formState,
          user_id: userId,
        },
        config
      );

      const data = new FormData();
      data.append("file", file);

      // Upload image
      const filename = await axios.post(
        `${baseUrl}/photo-gallery/api/posts/upload`,
        data,
        config
      );

      console.log(filename);

      const imageData = await axios.post(
        `${baseUrl}/photo-gallery/api/images`,
        {
          filename: filename.data,
          post_id: postData.data.id,
          is_avatar: false,
        },
        config
      );
      window.location.replace("/dashboard");
    }
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
      {errors &&
        errors.map((error) => (
          <div className={styles.errorHandler}>{error}</div>
        ))}
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
          {!isLoading && <button onClick={handleSubmit}>Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default Modal;
