import {
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query,
  } from 'firebase/firestore';
  
  import { app } from '../firebase';
import { Product } from './Product';

export default async function Products() {

    const db = getFirestore(app);
    const q = query(collection(db, 'products'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    console.log(data)


  return (
    <div>
    {data.map((product) => (
      <Product key={product.id} product={product} id={product.id} />
    ))}
  </div>
  )
}
