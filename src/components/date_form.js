import React, {Component} from "react";
import {Col, Form, Button} from 'react-bootstrap';


export default class DateForm extends Component{
	constructor(props){
		super(props);
		this.state = {dateDeb : '', dateFin : ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) { //en fonction du champs modifié on met à jour la valeur concernée
		const target = event.target;
		const name = target.name;
		this.setState({[name] : event.target.value});
	}

	handleSubmit(event) { // Fonction de callback
		this.props.submitHandler(this.state.dateDeb, this.state.dateFin);
		event.preventDefault();

	}

	render() {
	  return (
	  		<>
		    <Form className="mx-auto" inline onSubmit={this.handleSubmit}>
		    	<Col className="px-2 mr-5 ">
		    		<Form.Label> Date de début : </Form.Label>
			        <input name="dateDeb" type= "date" value={this.state.dateDeb} onChange={this.handleChange} />
		        </Col>
		        <Col className="px-2 mx-5 my-auto">
		        	<Button size="lg" variant="primary" type="submit">Rechercher</Button>
		        </Col>
		        <Col className="px-2 ml-5">
			    	<Form.Label> Date de fin : </Form.Label>
			        <input name="dateFin" type= "date" value={this.state.dateFin} onChange={this.handleChange} />
		        </Col>
		    </Form>
		    </>
		  );
		}
	
}