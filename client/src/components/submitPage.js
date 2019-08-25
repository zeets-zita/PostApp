import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
    Button,
    Form,
    FormGroup,
    Input, 
    Col,
} from 'reactstrap';



function validate(name, email, number, msg) {

   const errors = [];
 
   if (name.length === 0) {
     errors.push("Name can't be empty");
   }
 
   if (number.length < 6) {
     errors.push("Password should be at least 6 characters long");
   }
 
   if (email.split("").filter(x => x === "@").length !== 1) {
     errors.push("Email should contain a @");
   }
 
   if (msg.length === 0) {
     errors.push("Name can't be empty");
   }
 
   return errors;
 }

 
class Submit extends Component {
   state = {
      name: "",
      number: "",
      email: "",
      msg: "",
      errors: []
   }

 onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

 onSubmit = (e) => {
    e.preventDefault();

    const { name, email, number, msg } = this.state;

    const errors = validate(name, email, number, msg);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    fetch("/new-message", {
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
          .replace('e', '')
          .split("")
          .reverse()
          .join("")
       })
    })
    this.props.history.push('/view')
 }


   render() {
    const { errors } = this.state;
      return (
        <div className="post-form sm-2 submit-container" style={{ marginTop: '90px', margin: '20px'}}>
          <Link to="/view" className="btn btn-light mb-3"
              style={{marginTop: '30px'}}
                >View Messages</Link>
           <Col md={6} sm={6} xs={8} className="m-auto">
             <Form onSubmit={this.onSubmit}>
             {errors.map(error => (
              <p key={error}>Error: {error}</p>
               ))}
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
