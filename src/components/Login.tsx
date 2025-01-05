import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const Login: React.FC = () => {
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("user signed in:", result.user);
    } catch (error) {
      console.error("error signing with googlle:", error);
    }
  };

  return (
    <>
      <div>
        <button
          className="bg-black text-white px-2 text-sm"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </>
  );
};
