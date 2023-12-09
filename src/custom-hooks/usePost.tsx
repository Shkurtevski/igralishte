import { useState } from "react";

interface PostResult {
  isLoading: boolean;
  error: string | null;
  postData: (url: string, data: any) => Promise<void>;
}

const usePost = (): PostResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (url: string, data: any): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to perform the POST request.");
      }

      // Handle success if needed
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, postData };
};

export default usePost;
