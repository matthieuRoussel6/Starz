import React, {Component} from "react";
import {getAsteroideFromApi, getNewPage, getAsteroideFromApiOneDate}  from "../API/APIfunctions.js";
import DateForm from "./date_form";
import ListAsteroide from "./listAsteroide";
import {Col,Row,Navbar, Button,Card,Container} from 'react-bootstrap';

export default class SearchAsteroide extends Component {
	constructor(props) {
		super(props)
		this.state = {
			page : 1,
			asteroids : undefined,
			isLoading : true,
			dateDeb : undefined,
			dateFin : undefined,
			premier : true,
			prevPage : '',
			nextPage : '',
			dernierPage : 1
		}
		this.onSubmit = this.onSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this._newPage = this._newPage.bind(this);
	}

	_searchedAsteroids() { // Nouvelle recherche
		this.setState({asteroids : []}, () => 
		{
			this._loadAsteroids()
		})
		
	}

	_newPage(link,compteur) { //On tourne une page dans un sens ou l'autre
		this.setState({isLoading : true});
    	getNewPage(link).then(data => {
    		console.log(data.near_earth_objects);
    		const pageActuelle = this.state.page
    		this.setState({
    			page : pageActuelle+compteur,
    			asteroids : [].concat(data.near_earth_objects),
    			isLoading : false,
    			prevPage : data.links.prev,
    			nextPage : data.links.next
    		});
		});
	}

	handleClick(event) { //gestion du sens de déplacement
		const name = event.target.name;
		if(name === 'Next') {
			this._newPage(this.state.nextPage,1);
		} else {
			this._newPage(this.state.prevPage,-1);
		};
		event.preventDefault();
	}

	dayDiff(d1, d2) //petite fonction pour faire la difference entre deux dates
	{
	  d1 = d1.getTime() / 86400000;
	  d2 = d2.getTime() / 86400000;
	  const resultat = Number(d2 - d1).toFixed(0);
	  return resultat;
	}


	onSubmit(depart, fin) { //Lancement de la recherche et donc du chargement
		this.setState({
			page : 1,
			asteroids : undefined,
			isLoading : true,
			premier : false,
			dateDeb : depart,
			dateFin : fin});
		this._searchedAsteroids();
	}

	_loadAsteroids() { //récupération des données
		// Calcul de la durée totale entre les dates désirées
    	const dateDebTab = this.state.dateDeb.split('-');
		const dateFinTab = this.state.dateFin.split('-');
		const dateDebObj = new Date(dateDebTab[0], dateDebTab[1] - 1, dateDebTab[2]);
		const dateFinObj = new Date(dateFinTab[0], dateFinTab[1] - 1, dateFinTab[2]);
		const taille = this.dayDiff(dateDebObj, dateFinObj);
		const nbPage = Math.floor(taille/7)+1;
		if( taille > 7) { //Il faut plus que une page
			getAsteroideFromApiOneDate(this.state.dateDeb).then(data => {
	    		this.setState({
	    			asteroids : this.state.asteroids.concat(data.near_earth_objects),
	    			isLoading : false,
	    			premier : true,
	    			prevPage : data.links.prev,
	    			nextPage : data.links.next,
	    			dernierPage : nbPage
	    		});
	    	});	
		} else { //une page suffit
	    	getAsteroideFromApi(this.state.dateDeb, this.state.dateFin).then(data => {
	    		this.setState({
	    			asteroids : this.state.asteroids.concat(data.near_earth_objects),
	    			isLoading : false,
	    			prevPage : data.links.prev,
	    			nextPage : data.links.next,
	    			dernierPage : nbPage
	    		});
	    	});}
	}
	

	render() {
		return(
		<>
			<Row>
				<Navbar className="text-dark text-right shadow-sm fixed-top" bg="light " expand="lg">
				  <Navbar.Brand className="text-info" href="#home">Find Your StarZ</Navbar.Brand>
					<DateForm name="date de debut " required={false} submitHandler={this.onSubmit} />
				</Navbar>
			</Row>
			<Row>
			<Card className="mt-5">
				<Card.Body className="mt-5">
				<Card.Text >
					Bienvenu sur la seule plateforme pouvant réellement donner le nom de votre bonne étoile ! <br/>
					 Pour cela il vous suffit de rentrer les dates correspondantes au laps de temps concerné
					  puis naviguer à travers les asteroids. (personnellement je suis né sous : 436763 (2012 FN52))
				</Card.Text>
				</Card.Body>
			</Card>
			</Row>
			{this.state.isLoading ?
			 this.state.premier ? <div></div> : <div>Chargement...</div>
			: <>
			<Row className="my-3 shadow-sm">
				<Col className="p-0">
					<Button className=" mw-100 my-2" name="Prev" onClick={this.handleClick} > Page précedente </Button>
				</Col>
				<Col>
					<p>Page {this.state.page} / {this.state.dernierPage}</p>
				</Col>
				<Col className="p-0">
					<Button className=" mw-100 my-2" name="Next" onClick={this.handleClick} > Page suivante </Button>
				</Col>
			</Row>
			<Container fluid className="overflow" style={{height : '600px'}}>
				<ListAsteroide Asteroids={this.state.asteroids[0]} />
			</Container>
			</>



		}
		</> 
	);
	};
};