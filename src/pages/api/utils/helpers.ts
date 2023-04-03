import { InvoiceType } from "@/utils/types";
import axios from "axios";
export const convertBodyObjectToString = (body: InvoiceType): string => {
  let word =
    " " + body.clientEmail + " " + body.clientName + " " + body.description;
  const { clientAddress, senderAddress } = body;
  word += JSON.stringify(clientAddress) + JSON.stringify(senderAddress);
  return word;
};

export const checkIsCensored = async (body: InvoiceType): Promise<any> => {
  try {
    const text = convertBodyObjectToString(body);
    const encodedParams = new URLSearchParams();
    encodedParams.append("content", text);
    encodedParams.append("censor-character", "*");
    const options = {
      method: "POST",
      url: "https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "neutrinoapi-bad-word-filter.p.rapidapi.com",
      },
      data: encodedParams,
    };

    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
