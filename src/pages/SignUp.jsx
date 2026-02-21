import NavBarNoLogOut from "../components/navBarNoLogOut";
import Registration from "../components/registration";

function SignUp() {
    return (
        <div className="h-100 d-flex flex-column bg-light">
            <NavBarNoLogOut />
            <Registration />
        </div>
      );
    }
    
    export default SignUp;