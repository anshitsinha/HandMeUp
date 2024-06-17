'use client';

import { useEffect, useRef, useState } from 'react';
import { app } from '@/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';

export default function AddProductForm() {
  const imagePickRef1 = useRef(null);
  const imagePickRef2 = useRef(null);

  const [imageFileUrls, setImageFileUrls] = useState([null, null]);
  const [selectedFiles, setSelectedFiles] = useState([null, null]);
  const [imageFileUploading, setImageFileUploading] = useState([false, false]);
  const db = getFirestore(app);
  const [productInfo, setProductInfo] = useState({ productTitle: '', phno: '', description: '', address: '', price: '', imgUrl1: '', imgUrl2: '' });

  function productInfoHandle(event) {
    setProductInfo(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  }

  const addImageToForm = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index] = file;
      setSelectedFiles(newSelectedFiles);

      const newImageFileUrls = [...imageFileUrls];
      newImageFileUrls[index] = URL.createObjectURL(file);
      setImageFileUrls(newImageFileUrls);
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
    setImageFileUploading(prevState => {
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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setImageFileUploading(prevState => {
          const newUploading = [...prevState];
          newUploading[index] = false;
          return newUploading;
        });

        setImageFileUrls(prevState => {
          const newUrls = [...prevState];
          newUrls[index] = null;
          return newUrls;
        });

        setSelectedFiles(prevState => {
          const newFiles = [...prevState];
          newFiles[index] = null;
          return newFiles;
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrls(prevState => {
            const newUrls = [...prevState];
            newUrls[index] = downloadURL;
            return newUrls;
          });

          setImageFileUploading(prevState => {
            const newUploading = [...prevState];
            newUploading[index] = false;
            return newUploading;
          });
        }).catch((error) => {
          console.error("Error getting download URL:", error);
          setImageFileUploading(prevState => {
            const newUploading = [...prevState];
            newUploading[index] = false;
            return newUploading;
          });

          setImageFileUrls(prevState => {
            const newUrls = [...prevState];
            newUrls[index] = null;
            return newUrls;
          });

          setSelectedFiles(prevState => {
            const newFiles = [...prevState];
            newFiles[index] = null;
            return newFiles;
          });
        });
      }
    );
  };

  async function submitHandle(event) {
    event.preventDefault();
    const updatedProductInfo = {
      ...productInfo,
      imgUrl1: imageFileUrls[0],
      imgUrl2: imageFileUrls[1]
    };
    console.log("Form Submitted!!");
    console.log(updatedProductInfo);
    const docRef = await addDoc(collection(db, 'products'), updatedProductInfo);
    console.log("Pushed to db", docRef);
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
        {selectedFiles[0] && <img src={imageFileUrls[0]} alt=""  className={`w-full max-h-[250px] object-cover cursor-pointer
            ${imageFileUploading[0] ? 'animate-pulse' : ''}`} />}

        {/* Product Image 2 */}
        <div onClick={() => imagePickRef2.current.click()}>Image 2</div>
        <input
          type="file"
          ref={imagePickRef2}
          accept="image/*"
          onChange={(e) => addImageToForm(1, e)}
          hidden
        />
        {selectedFiles[1] && <img src={imageFileUrls[1]} alt=""  className={`w-full max-h-[250px] object-cover cursor-pointer
            ${imageFileUploading[1] ? 'animate-pulse' : ''}`}/>}

        {/* Other form inputs */}
        <input type="text" name='productTitle' placeholder="Product Title" value={productInfo.title} onChange={productInfoHandle} />
        <textarea placeholder="Product Description" value={productInfo.description} name="description" onChange={productInfoHandle} />
        <input type="text" placeholder="Price" value={productInfo.price} name="price" onChange={productInfoHandle} />
        <input type="text" placeholder="Address" value={productInfo.address} name="address" onChange={productInfoHandle} />
        <input type="text" placeholder="Phone Number" value={productInfo.phno} name='phno' onChange={productInfoHandle} />

        <button>Sell</button>
      </form>
    </div>
  );
}
