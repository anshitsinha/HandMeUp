import DeleteProduct from "@src/components/DeleteProduct";
import { Product } from "@src/components/Product";
import { app } from "@src/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";

export default async function PostPage({ params }) {
  const db = getFirestore(app);
  let data = {};
  const querySnapshot = await getDoc(doc(db, "products", params.id));

  data = { ...querySnapshot.data(), id: querySnapshot.id };

  return (
    <div className="flex">
      <div className="flex-col h-[50vh] w-1/2">
        <img
          className="w-full mx-2 object-cover"
          src={data.imgURL1}
          alt={data.productTitle}
        />
        <img
          className="w-full object-cover"
          src={data.imgURL2}
          alt={data.productTitle}
        />
      </div>
      <div className="flex-col justify-between m-5">
        <div>
          {" "}
          <p className="text-9xl uppercase">{data.productTitle}</p>{" "}
          <div className="text-6xl mt-14">&#8377;{data.price}</div>
          <p>{data.description}</p>
          <p>address:{data.address}</p>
          <p>phno:{data.phno}</p>
          <Link className="bg-gridGrey p-5 m-5" href={`https://wa.me/${data.phno}`}> Contact </Link>
          <p>seller:{data.seller}</p>
        </div>
      </div>

      <DeleteProduct data={data} />
    </div>
  );
}
