import {NextApiRequest, NextApiResponse} from "next";
import {orders} from "@/data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // setTimeout(() => {
            const products = orders.map(el => el.products)
            res.status(200).json({ products: products.flat() });
        // }, 2000)

    } else {
        // Handle any other HTTP method
    }
}
