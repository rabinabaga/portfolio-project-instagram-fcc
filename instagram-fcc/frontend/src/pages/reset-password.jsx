import { useParams } from "react-router-dom";

function ResetPassword() {
    let token = useParams();
    console.log("token", token);
    return ( <>
        <form action="">
            <h1>from email</h1>
        </form>
    </> );
}

export default ResetPassword;