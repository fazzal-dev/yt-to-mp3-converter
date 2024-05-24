// pages/api/default-redirect.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import Redirect from "../../../models/Redirects";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const latestRedirect = await Redirect.findOne().sort({ _id: -1 });

    if (latestRedirect) {
      res.status(200).json({ defaultToUrl: latestRedirect.toUrl });
    } else {
      res.status(404).json({ message: "No default redirect found" });
    }
  } catch (error) {
    console.error("Error fetching default redirect:", error);
    res.status(500).json({ message: "Error fetching default redirect", error: error.message });
  }
};
