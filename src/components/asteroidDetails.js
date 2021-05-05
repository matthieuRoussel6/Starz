import React,{Component} from 'react';
import {getAsteroideDetail} from "../API/APIfunctions";


export default class AsteroideDetails extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id : props.id,
			detail : undefined,
			loading : true
		}
	}

	getData() { //fonction récupérant les données de l'API, l'appel se passe mais l'affichage bug.
		getAsteroideDetail(this.state.id).then(data =>{
			this.setState({
				detail : data,
				loading : false,
			});
			console.log(data)
			})
	}

	render() {

		return(
			<p>Hello! I'm {this.props.name}</p>
			)
	};

};