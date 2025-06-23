import { strapi } from '@strapi/client';
import { apiURL } from "@/app/lib/general_variables";

const client = strapi({
    baseURL: apiURL || "",
    auth: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN_FULL_AUTH || "",
});

export default client;
