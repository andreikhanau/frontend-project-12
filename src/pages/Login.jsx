import NavBarNoLogOut from "../components/navBarNoLogOut";
import LogIn from "../components/Login";

function Login() {
    return (
        <div className="h-100 d-flex flex-column bg-light">
            <NavBarNoLogOut />
            <LogIn />
        </div>
      );
    }
    
    export default Login;