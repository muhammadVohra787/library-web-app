//useraccount.js
import { useState } from "react";

const useAccount = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const createAccount = async (userData) => {
        try {
            const response = await fetch("http://localhost:3000/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error("Failed to create account");
            }

            const responseData = await response.json();
            setData(responseData);
            console.log("user created");
        } catch (errors) {
            setError(errors.message);
            console.error("error creating account:", errors.message);
        }
    };
    const signIn = async (userData) => {
        try {
            console.log("Sign In Request:", userData);

            const response = await fetch(
                "http://localhost:3000/api/auth/signin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );

            const responseText = await response.text(); // Add this line to log the response text
            console.log("Sign In Response:", responseText);

            if (!response.ok) {
                throw new Error("Failed to sign in");
            }

            const responseData = await response.json();
            setData(responseData);
            console.log("user signed in", responseData);
        } catch (errors) {
            setError(errors.message);
            console.error("error signing in:", errors.message);
        }
    };

    return {
        data,
        error,
        createAccount,
        signIn,
    };
};

export default useAccount;
