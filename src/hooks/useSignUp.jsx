import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
// import { auth } from "../firebaseInit";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signUpHandler = ({ email, password, displayName }) => {
    setError(null);
    setIsPending(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        setError(error.code, error.message);
        setIsPending(false);
        // ..
      });

    return { error, isPending, signUpHandler };
  };
};

export default useSignUp;
