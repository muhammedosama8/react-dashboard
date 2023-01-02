import { useContext, useState } from "react"
import { Navigate, Outlet} from "react-router-dom"
import { AuthContext } from "../../App"
import Sidebar from "../global/Sidebar"
import Topbar from "../global/Topbar"


const Home = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    const { currentUser } = useContext(AuthContext);
    
    if (!currentUser) {
      console.log("From Home: ",currentUser)
      return <Navigate to="/login" />
    }
    return(
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Outlet />
          </main>
        </div>
    )
}
export default Home;