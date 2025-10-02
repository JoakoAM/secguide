type Props = {};

// firebase.ts
import { initializeApp } from "firebase/app";
import { initializeFirestore, Timestamp } from "firebase/firestore";


export type Categories = {
  id: string;
  desc: string;
  name: string;
  createdAt: Timestamp;
  approved: boolean;
};

export type Tools = {
  id: string;
  desc: string;
  name: string;
  createdAt: Timestamp;
  approved: boolean;
};
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSASING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);
// Inicializa Firestore con long polling forzado
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  // Opcional:
  // experimentalAutoDetectLongPolling: true,
  // useFetchStreams: false
});

const firebase = ({}: Props) => {
  return <></>;
};

export default firebase;
