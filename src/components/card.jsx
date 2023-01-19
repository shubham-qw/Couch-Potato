
import Card from 'react-bootstrap/Card';
import { useCart, useDispatchCart } from "./contextReducer";
import { useEffect, useRef, useState } from "react";

function Cards(props) {
    const priceRef = useRef();
    let dispatch = useDispatchCart();

    const option = props.options;
    const quantity = Object.keys(option);
    const [num, setNum] = useState(1);
    const [size, setSize] = useState("");
    let finalPrice = num * parseInt(option[size]);
    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);
    let data = useCart();
    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
            }
        }

        if (food !== []) {
            if (size === food.size) {
                await dispatch({ type: "update", id: props.foodItem._id, price: finalPrice, qty: num });
            }
            else if (size !== food.size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, img: props.foodItem.img, price: finalPrice, qty: num, size: size });
            }
        }
        else {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, img: props.foodItem.img, price: finalPrice, qty: num, size: size });
        }
    }
    return (
        <Card className="mb-3" border="success" style={{ width: '18rem' }}>
            <Card.Img variant="top" style={{ "maxHeight": "160px", "objectFit": "fill" }} src={props.foodItem.img} alt="" />
            <Card.Body>
                <Card.Title>{props.foodItem.name}</Card.Title>
                <Card.Text>
                </Card.Text>
                <div className="container wt-100">
                    <select className=" m-2 h-100  bg-light rounded " onChange={(e) => { setNum(e.target.value) }}>
                        {
                            Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })
                        }
                    </select>
                    <select className=" m-2 h-100 bg-light rounded" ref={priceRef} onChange={(e) => { setSize(e.target.value) }}>
                        {
                            quantity.map((plate) => {
                                return (
                                    <option key={plate} value={plate}>{plate}</option>
                                )
                            })
                        }
                    </select>
                    <div className="d-inline h-100 fs-5">
                        {finalPrice ? finalPrice : ""}
                    </div>
                </div>
                <hr></hr>
                <button className="btn bg-info text-white active" onClick={handleAddToCart}>Add to Cart</button>
            </Card.Body>
        </Card>
    );
}

export default Cards;