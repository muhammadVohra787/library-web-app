//useraccount.js
import { useState } from "react";

const useAccount = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const createAccount = async (userData) => {
        try {
            const response = await fetch("/user", {

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
            console.log('user created');
        } catch (errors) {
            setError(errors.message);
            console.error('error creating account:', errors.message);
        }
    };

    return {
        data,
        error,
        createAccount,
    };
};

export default useAccount;
