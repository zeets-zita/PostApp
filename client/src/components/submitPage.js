import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
    Button,
    Form,
    FormGroup,
    Input, 
    Col,
} from 'reactstrap';


class Submit extends Component {
   state = {
      name: "",
      number: "",
      email: "",
      msg: ""
   }

   onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

 onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.name, this.state.number, this.state.email, this.state.msg, this.state.date);
    fetch("http://localhost:5000/new-message", {
       method: "POST",
       headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
       },
       body: JSON.stringify({
          name: this.state.name,
          number: this.state.number,
          email: this.state.email,
          date: this.state.date,
          msg: this.state.msg
          .replace(/\e/, '')
          .split("")
          .reverse()
          .join("")
       })
    })
    this.props.history.push('/view')
 }

   render() {
      return (
        <div className="post-form sm-2 submit-container" style={{ marginTop: '90px', margin: '20px'}}>
          <Link to="/view" className="btn btn-light mb-3"
              style={{marginTop: '30px'}}
                >View Messages</Link>
           <Col md={6} sm={6} xs={8} className="m-auto">
             <Form onSubmit={this.onSubmit}>
              <FormGroup>
               <Input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={this.state.name}
                  onChange={this.onChange}
                  required
               />
               </FormGroup>
               <FormGroup>
               <Input
                  type="tel"
                  name="number"
                  placeholder="Phone number +27"
                  value={this.state.number}
                  onChange={this.onChange}
                />
                </FormGroup>
                <FormGroup>
               <Input 
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
               />
               </FormGroup>
               <FormGroup>
               <Input 
                  type="textarea"
                  name="msg"
                  placeholder="Message"
                  maxLength="10000"
                  value={this.state.msg}
                  onChange={this.onChange}
                  required
               />
               <Button
                  type="submit"
                  onClick={this.onSubmit}
                  color="dark"
                  style={{marginTop: '20px'}}
                  block
               > Add message
               </Button>
               </FormGroup>
            </Form>
           </Col>
         </div>
      );
   }
}

export default Submit;
