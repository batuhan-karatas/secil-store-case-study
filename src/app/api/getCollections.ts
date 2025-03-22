// lib/api/getCollections.ts
import axios from "axios";
import { Collection } from "@/types/collectionTypes";
import { getSession } from "next-auth/react";

export const getCollections = async (): Promise<Collection[]> => {
  try {
    const session = await getSession();
    const accessToken = session?.user?.accessToken;

    const response = await axios.get("https://maestro-api-dev.secil.biz/Collection/GetAll", {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
            "Accept-Language": "tr-TR",
          }
        : undefined,
    });

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    return [];
  }
};
