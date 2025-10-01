// firebase.ts
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_PROJECT_ID,
  projectId: import.meta.env.VITE_STORAGE_BUCKET,
  storageBucket: import.meta.env.VITE_MESSASING_SENDER_ID,
  messagingSenderId: import.meta.env.VITE_APP_ID,
  appId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore con long polling forzado
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  // Opcional:
  // experimentalAutoDetectLongPolling: true,
  // useFetchStreams: false
});

export { db };
