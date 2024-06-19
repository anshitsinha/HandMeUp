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
    <div>
      <div>
        <img className="h-40" src={data.imgURL1} alt={data.productTitle} />
        <img className="h-40" src={data.imgURL2} alt={data.productTitle} />
      </div>

      <p>Title:{data.productTitle}</p>
      <p>price:{data.price}</p>
      <p>address:{data.address}</p>
      <p>phno:{data.phno}</p>
      <Link href={`https://wa.me/${data.phno}`}> Contact </Link>
      <p>seller:{data.seller}</p>

      <DeleteProduct data={data} />
    </div>
  );
}
