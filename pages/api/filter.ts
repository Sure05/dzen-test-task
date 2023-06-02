import {NextApiRequest, NextApiResponse} from "next";
import {modelCategories} from "@/data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json({ modelCategories });
    } else {
        // Handle any other HTTP method
    }
}
