import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getUploadUrl } from "../../../URL/url";
import styles from "./EditUserImg.module.scss";
import { ColorRing } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import defaultImg from "../../../Img/defaultProfile.png";

const EditUserImg = () => {
  const [previewImg, setPreviewImg] = useState(defaultImg);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [isUploadError, setIsUploadError] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  /**사진 수정하기 기능 */
  const imgSubmit = async (img) => {
    setIsLoadingImg(true);
    setIsUploadError(false);

    const res = await getUploadUrl(img);

    if (!res) {
      setIsLoadingImg(false);
      setIsUploadError(true);
      return;
    }
    console.log(res);
    setIsLoadingImg(false);
    setIsUploadError(false);
  };

  const changeImg = ({ target }) => {
    const reader = new FileReader();
    const file = target.files[0];
    console.log("file", file);

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log("이미지주소", reader.result);
      setPreviewImg(reader.result);
    };
  };

  return (
    <div className={styles.profileDiv}>
      <h2>프로필 정보</h2>
      <img src={previewImg} alt="" />
      <form className={styles.uploadForm} onSubmit={handleSubmit(imgSubmit)}>
        <div className={styles.uploadFile}>
          <input
            type="file"
            {...register("file")}
            accept="image/*"
            onChange={changeImg}
          />
          <FontAwesomeIcon
            icon={faCamera}
            style={{ color: "white" }}
            fixedWidth
          />
        </div>
        <button type="submit">변경하기</button>
        {!isLoadingImg ? null : <ColorRing height={20} width={20} />}
        {isUploadError ? <p>이미지를 다시 올려주세요.</p> : null}
        {/* <button type="button" onClick={() => reset()}>
          삭제
        </button> */}
      </form>
    </div>
  );
};

export default EditUserImg;
