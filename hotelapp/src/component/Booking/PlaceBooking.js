import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const hotelurl= "https://developerfunnel.herokuapp.com/hotelsdetails";
const bookingurl= "";

class PlaceOrder extends Component {
    constructor(){
        super()

        this.state={
            order_id:Math.floor(Math.random()*10000),
            hotel_name:'',
            name:'',
            phone:'',
            person:''
        }
    }

    async componentDidMount(){
        var hotelid = this.props.match.params.id;
        let response = await axios.get(`${hotelurl}/${hotelid}`)
        this.setState({hotel_name:response.data[0].name})
    }

    handleChangeName = (event) => {
        this.setState({name:event.target.value})
    }
    handleChangePhone = (event) => {
        this.setState({phone:event.target.value})
    }
    handleChangePerson = (event) => {
        this.setState({person:event.target.value})
    }
    handleSubmit=()=>{
        console.log(this.state)
        fetch(bookingurl,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then(this.props.history.push('/viewBooking'))
    }
    render(){
        return(
            <div className="container">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        Place Booking
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label>Order Id</label>
                            <input type="text" name="order_id" value={this.state.order_id} readOnly
                            className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Hotel Name</label>
                            <input type="text" name="hotel_name" value={this.state.hotel_name} readOnly
                            className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="username" value={this.state.name}
                            className="form-control" onChange={this.handleChangeName}/>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" name="phone" value={this.state.phone}
                            className="form-control" onChange={this.handleChangePhone}/>
                        </div>
                        <div className="form-group">
                            <label>No Of Person</label>
                            <select name="person" value={this.state.person}
                            className="form-control" onChange={this.handleChangePerson}>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <Link to={`/details/${this.props.match.params.id}`} className="btn btn-danger">
                            Back
                        </Link> &nbsp;
                        <button className="btn btn-success" onClick={this.handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlaceOrder;