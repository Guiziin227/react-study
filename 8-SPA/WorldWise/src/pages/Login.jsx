import styles from "./Login.module.css";
import {useEffect, useState} from "react";
import NavBar from "../components/NavBar.jsx";
import {useAuth} from "../contexts/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button.jsx";

export default function Login() {
    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");
    const navigate = useNavigate()

    const {login, isAuthenticated} = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/app")
        }
    }, [isAuthenticated]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            console.log("email and password");
        } else {
            login(email, password);
            console.log("foi");
        }
    }

    return (
        <main className={styles.login}>
            <NavBar/>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type="primary">Login</Button>
                </div>
            </form>
        </main>
    );
}
