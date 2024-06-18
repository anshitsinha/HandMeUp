"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { app } from "@/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export default function AddProductForm() {
  const session = useSession();

  const imagePickRef1 = useRef(null);
  const imagePickRef2 = useRef(null);

  const [imageFileURLs, setImageFileURLs] = useState([null, null]);
  const [selectedFiles, setSelectedFiles] = useState([null, null]);
  const [postLoading, setPostLoading] = useState(false);
  const [imageFileUploading, setImageFileUploading] = useState([false, false]);
  const db = getFirestore(app);
  const [productInfo, setProductInfo] = useState({
    productTitle: "",
    phno: "",
    description: "",
    address: "",
    price: "",
    imgURL1: "",
    imgURL2: "",
    seller: "",
    timestamp: "",
  });

  function productInfoHandle(event) {
    setProductInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  const addImageToForm = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index] = file;
      setSelectedFiles(newSelectedFiles);

      const newImageFileURLs = [...imageFileURLs];
      newImageFileURLs[index] = URL.createObjectURL(file);
      setImageFileURLs(newImageFileURLs);
    }
  };

  useEffect(() => {
    selectedFiles.forEach((file, index) => {
      if (file) {
        uploadImageToStorage(index);
      }
    });
  }, [selectedFiles]);

  const uploadImageToStorage = (index) => {
    setImageFileUploading((prevState) => {
      const newUploading = [...prevState];
      newUploading[index] = true;
      return newUploading;
    });

    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFiles[index].name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFiles[index]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setImageFileUploading((prevState) => {
          const newUploading = [...prevState];
          newUploading[index] = false;
          return newUploading;
        });

        setImageFileURLs((prevState) => {
          const newURLs = [...prevState];
          newURLs[index] = null;
          return newURLs;
        });

        setSelectedFiles((prevState) => {
          const newFiles = [...prevState];
          newFiles[index] = null;
          return newFiles;
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImageFileURLs((prevState) => {
              const newURLs = [...prevState];
              newURLs[index] = downloadURL;
              return newURLs;
            });

            setImageFileUploading((prevState) => {
              const newUploading = [...prevState];
              newUploading[index] = false;
              return newUploading;
            });
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            setImageFileUploading((prevState) => {
              const newUploading = [...prevState];
              newUploading[index] = false;
              return newUploading;
            });

            setImageFileURLs((prevState) => {
              const newURLs = [...prevState];
              newURLs[index] = null;
              return newURLs;
            });

            setSelectedFiles((prevState) => {
              const newFiles = [...prevState];
              newFiles[index] = null;
              return newFiles;
            });
          });
      }
    );
  };

  async function submitHandle(event) {
    setPostLoading(true);
    event.preventDefault();
    const updatedProductInfo = {
      ...productInfo,
      imgURL1: imageFileURLs[0],
      imgURL2: imageFileURLs[1],
      seller: session?.data?.user?.email,
      timestamp: serverTimestamp(),
    };

    console.log("Form Submitted!!");
    console.log(updatedProductInfo);
    const docRef = await addDoc(collection(db, "products"), updatedProductInfo);
    console.log("Pushed to db", docRef);
    setPostLoading(false);

    // setText('');
    //Mishra se chna hai

    setImageFileURLs([null, null]);
    setSelectedFiles([null, null]);
    location.reload();
  }

  return (
    <div>
      <form className="flex flex-col" onSubmit={submitHandle}>
        {/* Product Image 1 */}
        <div onClick={() => imagePickRef1.current.click()}>Image 1</div>
        <input
          type="file"
          ref={imagePickRef1}
          accept="image/*"
          onChange={(e) => addImageToForm(0, e)}
          hidden
        />
        {selectedFiles[0] && (
          <img
            src={imageFileURLs[0]}
            alt=""
            className={`w-full max-h-[250px] object-cover cursor-pointer
            ${imageFileUploading[0] ? "animate-pulse" : ""}`}
          />
        )}

        {/* Product Image 2 */}
        <div onClick={() => imagePickRef2.current.click()}>Image 2</div>
        <input
          type="file"
          ref={imagePickRef2}
          accept="image/*"
          onChange={(e) => addImageToForm(1, e)}
          hidden
        />
        {selectedFiles[1] && (
          <img
            src={imageFileURLs[1]}
            alt=""
            className={`w-full max-h-[250px] object-cover cursor-pointer
            ${imageFileUploading[1] ? "animate-pulse" : ""}`}
          />
        )}

        {/* Other form inputs */}
        <input
          type="text"
          name="productTitle"
          placeholder="Product Title"
          value={productInfo.title}
          onChange={productInfoHandle}
        />
        <textarea
          placeholder="Product Description"
          value={productInfo.description}
          name="description"
          onChange={productInfoHandle}
        />
        <input
          type="text"
          placeholder="Price"
          value={productInfo.price}
          name="price"
          onChange={productInfoHandle}
        />
        <input
          type="text"
          placeholder="Address"
          value={productInfo.address}
          name="address"
          onChange={productInfoHandle}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={productInfo.phno}
          name="phno"
          onChange={productInfoHandle}
        />

        <button>Sell</button>
      </form>
    </div>
  );
}
