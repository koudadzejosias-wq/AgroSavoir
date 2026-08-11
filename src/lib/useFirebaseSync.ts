import React, { useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { UserAccount, UserProgress } from '../types';

export function useFirebaseSync(
  currentUser: UserAccount,
  progress: UserProgress,
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>
) {
  // 1. Load progress from Firestore on user login
  useEffect(() => {
    if (!currentUser.id || !currentUser.isLoggedIn) return;

    const docRef = doc(db, 'progress', currentUser.id);

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const cloudData = snapshot.data() as Partial<UserProgress>;
          setProgress({
            completedLessons: cloudData.completedLessons || {},
            completedModules: cloudData.completedModules || [],
            quizScores: {
              agriculture: cloudData.quizScores?.agriculture || 0,
              elevage: cloudData.quizScores?.elevage || 0,
              pisciculture: cloudData.quizScores?.pisciculture || 0,
              entrepreneuriat: cloudData.quizScores?.entrepreneuriat || 0,
            },
            unlockedCertificates: cloudData.unlockedCertificates || {},
            downloadHistory: cloudData.downloadHistory || [],
          });
        }
      })
      .catch((err) => {
        console.warn('Firebase Firestore load error:', err);
      });
  }, [currentUser.id, currentUser.isLoggedIn]);

  // 2. Persist progress to Firestore whenever it changes
  useEffect(() => {
    if (!currentUser.id || !currentUser.isLoggedIn) return;

    const docRef = doc(db, 'progress', currentUser.id);
    const userDocRef = doc(db, 'users', currentUser.id);

    // Save progress
    setDoc(
      docRef,
      {
        userId: currentUser.id,
        completedLessons: progress.completedLessons,
        completedModules: progress.completedModules,
        quizScores: progress.quizScores,
        unlockedCertificates: progress.unlockedCertificates,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    ).catch((err) => console.warn('Firebase sync error:', err));

    // Save user info
    setDoc(
      userDocRef,
      {
        uid: currentUser.id,
        email: currentUser.email,
        displayName: currentUser.name,
        role: currentUser.role,
        region: currentUser.region,
        createdAt: currentUser.joinedDate || new Date().toISOString(),
      },
      { merge: true }
    ).catch((err) => console.warn('Firebase user sync error:', err));
  }, [currentUser, progress]);
}
