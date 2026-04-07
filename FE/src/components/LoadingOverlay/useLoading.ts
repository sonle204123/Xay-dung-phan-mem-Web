import { useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Hàm wrap lấy dữ liệu
  const handleLoading = async <T>(apiCall: Promise<T>): Promise<T | undefined> => {
    setIsLoading(true);

    try {
      // Chạy song song: 1 là API, 2 là hàm đợi 2 giây
      const [response] = await Promise.all([
        apiCall,
        new Promise((resolve) => setTimeout(resolve, 2000)), // Đợi ít nhất 2s
      ]);
      
      return response;
    } catch (error) {
      console.error("Loading Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleLoading };
};