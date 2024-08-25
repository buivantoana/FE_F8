import { useLocalStorage } from "@/hooks/useStorage";
import { Navigate } from "react-router-dom"


const PrivateRouter = ({test,children}:any) => {
    const [user, setUser] = useLocalStorage("user", {});
    
    if(Object.keys(user).length>0){
        return <>{children}</>
    }
    return <Navigate to={"/"} />;
}

export default PrivateRouter