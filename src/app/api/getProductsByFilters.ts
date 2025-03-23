import axios from "axios";
import { Product, Filter } from "@/types/collectionTypes";
import { getSession } from "next-auth/react";

export const getProductsByFilters = async (
  filters: Filter[]
): Promise<Product[]> => {
  try {
    const session = await getSession();
    const accessToken = session?.user?.accessToken;

    const body = {
      additionalFilters: filters,
      page: 1,
      pageSize: 36,
    };

    const response = await axios.post(
      "https://maestro-api-dev.secil.biz/Collection/72/GetProductsForConstants",
      body,
      {
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
              "Accept-Language": "tr-TR",
            }
          : undefined,
      }
    );

    return response.data.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch products by filters:", error);
    return [];
  }
};
