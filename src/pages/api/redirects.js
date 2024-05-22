import dbConnect from "../../utils/dbConnect";
import Redirect from "../../../models/Redirects";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { fromUrl, toUrl, statusCode } = req.body;
        console.log("Saving Redirect:", { fromUrl, toUrl, statusCode });
        const redirect = new Redirect({
          fromUrl,
          toUrl,
          statusCode,
        });
        await redirect.save();
        res.status(201).json({ message: "Redirect saved successfully!" });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error saving redirect", error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
