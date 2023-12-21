import { FormEvent, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import EmployeeListing from "../EmployeeListing/EmployeeListing";
import { postData } from "../../core/api/functions";
import { apiURL } from "../../core/config/constants";
import { toast } from "react-toastify";

function Login({ onLogin }: {
    onLogin: (accessToken: string) => void;
}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const response = await postData(apiURL.authSignIn, { username, password });
            const responseData: { access_token: string } = response.data;
            console.log(response)

            if (response.status === 201) {
                onLogin(responseData["access_token"]);
            } else {
                toast.error('Invalid username or password.', {
                    toastId: 'invalid-login',
                });
            }
        } catch (error) {
            // Handle the error here, e.g., show a user-friendly message.
            toast.error('An error occurred during login.', {
                toastId: 'login-error',
            });
        }
    }



    return (
        <form
            onSubmit={handleSubmit}
        >
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
    );
}



function OnboardPage() {

    const [cookies, setCookie] = useCookies(["accessToken"]);
    function handleLogin(accessToken: string) {
        console.log(accessToken)
        setCookie("accessToken", accessToken, { path: "/" });
    }

    return (
        <CookiesProvider>
            <div>
                {cookies.accessToken ? (
                    <EmployeeListing />
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </div>
        </CookiesProvider>
    );
}

export default OnboardPage;