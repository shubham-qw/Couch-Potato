import React , {useState}from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../components/logo.png";
import img2 from "../components/sc.png";
import Badge from 'react-bootstrap/Badge';
import { useCart } from "./contextReducer";
import Cart from "../Screen/cart";
import Modal from "../components/overlay"
function Navbar() {
  const [cartView,setCartView] = useState(false);

  let data=useCart();
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("authToken");
    navigate("/")
  }
  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <img style={{ maxHeight: "100px" }} src={img1}></img>
        <Link className="navbar-brand fs-1 brandName" to="#">Couch Potato</Link>
        <button className="navbar-toggler" type="button" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5 text-danger" to="/home">Home</Link>
            </li>
            {(localStorage.getItem("authToken")) ?
              <li className="nav-item">
                <Link className="nav-link active fs-5 text-danger" to="/myorders">My Order</Link>
              </li>
              : ""}
          </ul>
          {(!localStorage.getItem("authToken")) ?
            <div className="d-flex">
              <Link className="btn bg-white  mx-1" to="/">Login</Link>
              <Link className="btn bg-white  mx-1" to="/signup">Signup</Link>
            </div> :
            <div>
              <div className="btn bg-white  mx-1" onClick={()=>{setCartView(true)}}><Badge pill bg="danger" className="">{data.length}</Badge>{" "}<img style={{ maxHeight: "26px" }} src={img2}></img></div>
              {cartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> : null}
              <div className="btn bg-danger text-white  mx-1" onClick={handleLogOut}>Log Out</div>
            </div>
          }
        </div>
      </nav>
    </div>
  )
}

export default Navbar;



