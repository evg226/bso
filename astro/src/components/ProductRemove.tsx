import { useState } from "preact/hooks"
import { IProduct } from "./ProductCard";

interface ProductCreateProps {
    product: IProduct;
}

export default function ProductCreateUpdate({ product }: ProductCreateProps) {

    const [result, setResult] = useState('');

    const handleClickDelete = async (e) => {
        e.preventDefault();
        try {
            if (product.attributes.image.data) {
                const responseImage = await fetch('http://localhost:1337/api/upload/files/' + product.attributes.image.data.id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': "Bearer " + document.cookie.match('(^|;)\\s*' + 'jwt' + '\\s*=\\s*([^;]+)')?.pop() || ''
                    },
                });
                const imageUpload = await responseImage.json();
                if ('error' in imageUpload) {
                    setResult(imageUpload.error);
                }
            }
            const response = await fetch(
                "http://localhost:1337/api/products/" + product.id,
                {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + document.cookie.match('(^|;)\\s*' + 'jwt' + '\\s*=\\s*([^;]+)')?.pop() || ''
                    },
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
        <>
            {product ? result !== "Success" &&
                <>
                    <h3>Do you want to remove {product.attributes.title}?</h3>
                    <button onClick={handleClickDelete}>Confirm</button>
                </>
                : <h3>Not found</h3>
            }
            {result}
        </>
    )

}