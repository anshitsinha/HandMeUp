"use client";

import { app } from "@/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";

export default function AddProductForm() {
  const imagePickRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const addImageToForm = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  return (
    <div>
      <form action="" className=" flex flex-col">
        {/*  Product Image */}
        <div onClick={() => imagePickRef.current.click()}>Image1</div>
        <input
          type="file"
          ref={imagePickRef}
          accept="image/*"
          onChange={addImageToForm}
          hidden
        />

        {selectedFile && <img src={imageFileUrl} alt="" />}
        {/* <div onClick={() => imagePickRef.current.click()}>Image2</div> */}

        {/* <input
          type="file"
          ref={imagePickRef}
          accept="image/*"
          onChange={addImageToForm}
          hidden
        /> */}
        <input type="text" placeholder="Product Title" />
        <textarea placeholder="Product Description" name="" id="" />
        <input type="text" placeholder="Price" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="Phone Number" />

        <button>Sell</button>
      </form>
    </div>
  );
}
