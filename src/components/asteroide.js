import React, {useState} from "react";
import {Card, Accordion, Row, Col } from "react-bootstrap";
import AsteroideDetails from "./asteroidDetails";

export function Asteroide(props){

		//Je voulais observer le changement de state au clique pour lancer la requête détaillée de l'asteroid
		//mais je rencontre un problème de state. Ma dernière tentative a été de tenter le hook :

		var [clicked,setClicked] = useState([false,false])

		const asteroide = props.asteroide
		const id = asteroide.id;
		const nom_asteroide = asteroide.name;
		const diametreMin = asteroide.estimated_diameter.meters.estimated_diameter_min;
		const diametreMax = asteroide.estimated_diameter.meters.estimated_diameter_max;
		const distance_Terre = asteroide.close_approach_data[0].miss_distance.kilometers;
		const datePassage = asteroide.close_approach_data[0].close_approach_date_full;
		const risqueAst = asteroide.is_potentially_hazardous_asteroid ? "OUI ! " : "Non.";

		function clickhandler() {
			setClicked(true);
		}

		return ( <>
			<Accordion key={id}>
				<Card className="bg-light text-info">
					<Accordion.Toggle as={Card.Header} eventKey={"0"} onClick={clickhandler} >
						<Row>
							<Col>
								<div className="Etiquette">
						    		<p className="Case">{datePassage}</p>
						    	</div>
						    </Col>
						    <Col>
						    	<div className="Etiquette">
									<p  className="Case">{nom_asteroide}</p>
								</div>
							</Col>
							<Col>
								<div className="Etiquette">
									<p className="Case">{Math.floor(diametreMin)} {'<'} {Math.floor(diametreMax)}</p>
								</div>
							</Col>
							<Col>
								<div className="Etiquette">
									<p className="Case">{Math.floor(distance_Terre)}</p>
								</div>
							</Col>
							<Col>
								<div className="Etiquette">
									<p className="Case">{risqueAst}</p>
								</div>
							</Col>
						</Row>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="0" >
					  {clicked ? <AsteroideDetails name={nom_asteroide}/> : <p></p>}
					</Accordion.Collapse>
				</Card>
			</Accordion>
 
			</>
			)
	

};