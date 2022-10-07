import type { JSX } from 'preact'
import { useState } from 'preact/hooks'

export interface IProduct {
    id: number
    attributes: {
        title: string
        price: number
        image?: any
    }

}

interface ProductCardProps {
    product: IProduct
}

export default function ProductCard({ product }: ProductCardProps) {
    const [details, setDetails] = useState(false)

    const toggle = () => setDetails((prev) => !prev)

    return (
        <div style={{ border: '1px solid #aaaaaa' }}>
            {!!product.attributes.image.data && <img src={"http://localhost:1337" + product.attributes.image.data.attributes.formats.thumbnail.url} />}
            <h2 className="lext-lg">{product.attributes.title}</h2>
            <p className="font-bold">{product.attributes.price}</p>


            <a href={`/products/${product.id}`}>Open product</a>
        </div>
    )
}