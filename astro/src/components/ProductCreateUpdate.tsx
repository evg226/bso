import { useState } from "preact/hooks"
import { IProduct } from "./ProductCard";

interface ProductCreateProps {
    product: IProduct,
}

export default function ProductCreateUpdate({ product }: ProductCreateProps) {
    const [title, setTitle] = useState(product ? product.attributes.title : '');
    const [price, setPrice] = useState(product ? product.attributes.price : 0);
    const [image, setImage] = useState('');
    const [result, setResult] = useState('');

    const handleClickCreate = async (e) => {
        e.preventDefault();
        try {
            let data = { title, price };
            if (image) {
                const formData = new FormData();
                formData.append('files', image);
                const responseImage = await fetch('http://localhost:1337/api/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': "Bearer " + document.cookie.match('(^|;)\\s*' + 'jwt' + '\\s*=\\s*([^;]+)')?.pop() || ''
                    },
                    body: formData
                });
                const imageUpload = await responseImage.json();
                if ('error' in imageUpload) {
                    setResult(imageUpload.error);
                }
                data['image'] = imageUpload[0].id
            }
            const response = await fetch(
                "http://localhost:1337/api/products/" + (product ? `${product.id}` : ""),
                {
                    method: (product ? "PUT" : "POST"),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + document.cookie.match('(^|;)\\s*' + 'jwt' + '\\s*=\\s*([^;]+)')?.pop() || ''
                    },
                    body: JSON.stringify({ data })
                }
            );
            const res = await response.json();
            setResult(res);
            if (res.data) {
                setResult('Success');

            } else {
                setResult(prev => prev + " " + res.error.message)
            }
        } catch (e) {
            setResult(e.message);
        }
    }

    return (
        <form onSubmit={handleClickCreate}>
            <input type="text" placeholder="title" value={title} onInput={(e) => setTitle(e.target.value)} />
            <input type="number" placeholder="price" value={price} onInput={(e) => setPrice(parseFloat(e.target.value))} />
            <input type="file" placeholder="file" value={image} onChange={(e) => setImage(e.target.files[0])} />
            {product && !image && product.attributes.image.data &&
                <img src={"http://localhost:1337" + product.attributes.image.data.attributes.formats.thumbnail.url} />
            }
            <input type="submit" value={product ? "Update" : "Create"} />
            {result}
        </form>
    )

}