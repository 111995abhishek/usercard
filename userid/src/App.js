import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:[]
    }
    this.refreshList = this.refreshList.bind(this)
  }

  refreshList(){
    axios.get("https://gorest.co.in/public-api/users?access-token=g2_qR9xCRk9ORJwFIWC9yWsXyZI8cKY6N6jr",{
      headers:{
        'content-type':'application/json'
      }
    })
    .then(res => {
      console.log(res.data.result)
      this.setState({user:res.data.result})
    })

  }
  deleteItem(itemId){
    const {user} = this.state;
    this.setState({
        
        user:user.filter(item=>item.id !==itemId)
      });
    

  }

  componentDidMount(){
    this.refreshList();
  }
  render() {
    console.log("item", this.state.user)
    return (
      <div className="App">
        <h1>List Of All User Card</h1>
        <span className="card-container">{this.state.user.map((item,index)=>
        <span key={index} className="card">  
        {/* {/* <span>{this.state.user.map((item,index)=>
        <span key={index} className="card"> */}
          <img src={item._links.avatar.href}/>
          <p>{item.id}</p>
          <p>{item.first_name} {item.last_name}</p>
          <p>{item.gender}</p>
          <p>{item.dob}</p>
          <p>{item.email}</p>
          <p>{item.phone}</p>
          <p>{item.website}</p>
          <p>{item.address}</p>
          <p>{item.status}</p>
          <button className="delete-button" onClick={()=>this.deleteItem(item.id)}>delete</button>
          </span>
          )}
          </span> 
       
      </div>
    );
  }
}

export default App;
