import { useState } from "preact/hooks"

export default function CartItem({ item }) {

    const [count, setCount] = useState(item.count);
    const [readonly, setreadonly] = useState(false);

    const handleChangeCount = async (e) => {
        setreadonly(true)
        // const response = await fetch(
        //     "http://localhost:1337/api/users/me......",
        //     {
        //         method: "PUT",
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //             'Authorization': "Bearer " + document.cookie.match('(^|;)\\s*' + 'jwt' + '\\s*=\\s*([^;]+)')?.pop() || ''
        //         },
        //         body: JSON.stringify({ data })
        //     }
        // );
        // const res = await response.json();
        setCount(e.target.value)
        setreadonly(false)
    }

    return (
        <div>
            <div>{count}</div>
            <span>{item.id}</span>
            <span>{item.product.id}</span>
            <span>{item.product.title}</span>
            <span>{item.product.price}</span>
            <input type="number" value={count} readonly={readonly}
                onChange={handleChangeCount}
            />
            <span>{item.count * item.product.price}</span>
            {item.product.image && (
                <img
                    src={
                        "http://localhost:1337" +
                        item.product.image.formats.thumbnail.url
                    }
                    width="50px"
                />
            )}
            <a href="">Remove</a>
        </div>
    )
}