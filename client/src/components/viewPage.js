import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
    ListGroup, 
    ListGroupItem, 
    ListGroupItemHeading, 
    ListGroupItemText,
    Col,
    Row 
} from 'reactstrap';


class View extends Component {
   state = {
      messages: []
   }

   getMessages = () => {
    fetch("http://localhost:5000/get-messages")
       .then(res => res.json())
       .then(json => {
          this.setState({
             messages: json.messages
          })
       })
 }
   componentDidMount () {
      this.getMessages();
   }

   render() {
      return (
         <div className="post-form sm-2 view-container" style={{ marginTop: '90px', margin: '20px'}}>
            <div>
             <Link to="/" className="btn btn-light mb-3"
              style={{marginTop: '30px'}}
              >Submit Message</Link>
             </div>
             <Col md={9} sm={8} xs={10} className="m-auto">
            {this.state.messages.length !== 0 ?
               <ListGroup>
                  {this.state.messages.map(message => (
                    <ListGroupItem style={{ margin: '10px'}} >
                    <div style={{margin: '10px'}}>
                    <ListGroupItemHeading style={{fontSize: '18px'}}>
                     <Row style={{ paddingLeft: '10px'}}>
                     <p id='name'>{message.name}</p> 
                     <p id='datetime'>{message.datetime}</p>
                     </Row>
                     <p>{message.number} </p>
                     <p>{message.email} </p>
                     </ListGroupItemHeading>
                     <ListGroupItemText style={{paddingTop: '5px'}}>
                     {message.msg}
                     </ListGroupItemText>
                     </div>
                     </ListGroupItem>
                  ))}
               </ListGroup>
                  :
               <p>There are no messages</p>
            }
            </Col>
         </div>
      );
   }
}

export default View;
