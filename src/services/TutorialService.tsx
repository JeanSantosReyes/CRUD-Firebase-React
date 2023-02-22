// Firebase
import { push, ref, remove, set } from "firebase/database";
// Config Firebase
import { FirebaseDB } from "../firebase/config";
// Interfaces
import { TutorialInterface } from "../interfaces/tutorial";

const dbRef = ref(FirebaseDB, '/tutorials');

export const getAllItems = () => {
    return dbRef;
}

export const createItem = (data: TutorialInterface) => {
    return push(dbRef, data);
}

export const updateItem = (key: string, data: TutorialInterface) => {
    return set(ref(FirebaseDB, '/tutorials/' + key), data)
}

export const deleteItem = (key: string) => {
    // return remove(ref(FirebaseDB, '/tutorials/' + key));
    return set(ref(FirebaseDB, '/tutorials/' + key), null)
}

export const deleteAllItem = () => {
    return remove(dbRef);
}