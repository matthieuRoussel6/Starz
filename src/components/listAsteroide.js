import React,{Component} from 'react';
import {Asteroide} from './asteroide';
import {Row, Col} from 'react-bootstrap';


export default class ListAsteroide extends Component{


	render() {
		
		const listAsteroide = this.props.Asteroids;

		var tableauAsteroids = [] //tableau contenant la liste des astéroides à afficher
		for (var date in listAsteroide){ // On transforme les données recue pour pouvoir appliquer un map()
			if (listAsteroide.hasOwnProperty(date)) {
				const infoJour = listAsteroide[date]
				tableauAsteroids = tableauAsteroids.concat(infoJour) 
			}
		}
		
		const visuelAsteroid = tableauAsteroids.map((element) =>
				<>
					<Asteroide asteroide={element} key={element.id}/>
				</>
					); 
		
				
		return(
			<>
				<Row>
					<Col className="bg-light text-info">
						<p> Le : </p>
					</Col>
					<Col className="bg-light text-info">
						<p> Nom : </p>
					</Col>
					<Col className="bg-light text-info">
						<p> diamètre (mètres) :  </p>
					</Col >
					<Col className="bg-light text-info">
						<p> Distance de la Terre (kilomètres) :  </p>
					</Col>
					<Col className="bg-light text-info">
						<p> Hasardeux {'?'}  </p>
					</Col>  
				</Row>
				{visuelAsteroid}
			</>
			);
		}
		};
