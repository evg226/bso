import { useState } from "preact/hooks";

export const Login = ({ isRegister }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [authed, setAuthed] = useState(false);
    const [error, setError] = useState(false);

    const handleClickLogin = async (e) => {
        e.preventDefault();
        const body = isRegister ? { email: identifier, password, username } : { identifier, password }
        try {
            const response = await fetch(`http://localhost:1337/api/auth/local${isRegister ? "/register" : ""}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const result = (await response.json());
            if (result.jwt) {
                document.cookie = "jwt=" + result.jwt;
                setAuthed(true);

            } else {
                setError(result.error.message);
            }
        } catch (e) {
            setError(e);
        }
    }

    return (
        <form onSubmit={handleClickLogin}>
            {authed ? <>
                <span>{isRegister ? "You have been registered. " : "You have logged in. "}</span>
                <a href="/products">Go to products &gt;</a>
            </>
                :
                <>
                    <input type="email" placeholder="E-mail" value={identifier} onInput={(e) => setIdentifier(e.target.value)} />
                    {isRegister && <input type="text" placeholder="Username" value={username} onInput={(e) => setUsername(e.target.value)} />}
                    <input type="password" placeholder="Password" value={password} onInput={(e) => setPassword(e.target.value)} />
                    <input type="submit" value={isRegister ? "Register" : "Login"} />
                    {error}
                    <div>
                        {isRegister ? <a href='/login'>Do you have login? Goto login</a> :
                            <a href='/register'>Don't you have login? Goto register</a>}
                    </div>
                </>
            }
        </form>
    )
}