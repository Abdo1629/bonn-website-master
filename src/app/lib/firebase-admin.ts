// lib/firebase-admin.ts
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../../../serviceAccountKey.json";

const app = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    })
  : getApp();

const db = getFirestore(app);

export { db };
