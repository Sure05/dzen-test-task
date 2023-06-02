import {NextApiRequest, NextApiResponse} from "next";
import {orders} from "@/data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // setTimeout(() => {
            const products = orders.map(el => {
                return el.products.map(pr => {
                    return {
                        ...pr,
                        orderInfo: {
                            id: el.id,
                            title: el.title
                        }
                    }
                })
            })
        console.log(products)
            res.status(200).json({ products: products.flat() });
        // }, 2000)

    } else {
        // Handle any other HTTP method
    }
}
