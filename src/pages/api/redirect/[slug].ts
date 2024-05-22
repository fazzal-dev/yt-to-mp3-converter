import dbConnect from "../../../utils/dbConnect";
import Redirect from "../../../../models/Redirects";

dbConnect();

export default async (req, res) => {
  const { slug } = req.query;
  console.log("Slug in API:", slug); 

  try {
    const redirect = await Redirect.findOne({ fromUrl: `/${slug}` });
    console.log("Redirect found:", redirect); 

    if (redirect) {
      res.status(200).json({ toUrl: redirect.toUrl });
    } else {
      res.status(404).json({ message: "Redirect not found" });
    }
  } catch (error) {
    console.error("Database Error:", error); 
    res.status(500).json({ message: "Error processing redirect", error: error.message });
  }
};