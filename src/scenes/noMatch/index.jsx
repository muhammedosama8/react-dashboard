import { Link } from "react-router-dom"

const NoMatch   = () => {
    return(
        <div className="not-found">
            <h1 className="title">404! Page Not Found</h1>
            <Link to='/'>Home</Link>
        </div>
    )
}
export default NoMatch