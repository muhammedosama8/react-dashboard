import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase-config";

export const getData = async (type) =>{
    const res = await getDocs(collection(db, type));
    const data = res.docs.map((doc) => ({...doc.data()}))
    return data
  }