import {NextApiRequest, NextApiResponse} from "next";
import {orders} from "@/data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json({ orders });
    } else {
        // Handle any other HTTP method
    }
}
