import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Cards from "../components/card";
import Form from 'react-bootstrap/Form';
function Home() {
  const [foodItem,setFoodItem]  = useState([]);
  const [foodCat,setFoodCat] = useState([]);
  const [search,setSearch] = useState("");
  const load_data = async () => {
    const response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const json = await response.json();
    setFoodItem(json[0]);
    setFoodCat(json[1]);

  }
  useEffect(() => {
    load_data();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mb-5">
        <div className="container d-flex mt-3 justify-content-center">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            style={{ "maxWidth": "500px"}}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="container">
      {
        foodCat !== [] ? foodCat.map((data) => {
          return (
            <div key={data._id} className="row mb-3">
            <div  className="fs-3 m-3">{data.CategoryName}</div>
            <hr/>
            {
              foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
              .map(filterItems =>{
                return (
                  <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                  <Cards  foodItem = {filterItems} options={filterItems.options[0]}/>
                  </div>
                );
              }) : <div>Empty</div>
            }
            </div>
          )
        }) : <div>Empty</div>
      }
      </div>
      <Footer />
    </div>
  )
}

export default Home;