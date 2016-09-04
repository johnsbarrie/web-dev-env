import { EventEmitter } from 'events';
import _ from "lodash";
import axios from "axios"

import dispatcher from "../Dispatcher";

class AppModel extends EventEmitter {
	constructor(){
		super();
		this.students=[]
		axios.get("/students.json")
  			.then((response)=> {
  				try{
  					this.students=JSON.parse(JSON.stringify(response.data));
  					this.emit("change");
  				}catch(e){
  					console.log("student json erreur",e);
  				}
  			})

		this.studentTableInfo=[ 
								{ key:'surname', lang:{'fr':"Nom", 'en':"Name"} },
								{ key:'firstname', lang:{'fr':"Prénom", 'en':'firstname'} }, 
								{ key:'year', lang:{'fr':"Année", 'en':'Year'} }, 
								{ key:'cursus', lang:{'fr':"Cursus", 'en':'Cursus'} },
								{ key:'cycle', lang:{'fr':"Cycle", 'en':'Cycle'} },
								{ key:'specialisation',lang:{'fr':"Spécialisation", 'en':'Cursus'}}]

		this.years=["1", "2", "3", "4", "5",  "6"];
		this.cycles=["1", "2", "3", "4", "5"];
		this.cursus=["Massage", "Acupuncture", "Pharmacopée"];
		this.specialisations=["Aucune", "Otologie", "Rhinologie", "Pharyngologie", 
								"Laryngologie", "Ophtalmologie", "Rhumatologie", 
								"Hématologie", "Endocrinologie", "Gastro-entérologie", 
								"Hépatologie", "Pneumologie", "Cardiologie", "Neurologie",
								"Uro-néphrologie", "Dermatologie", "Gynécologie"];
	}

	addStudent(student){
		student.id=String(Date.now());
		this.students.push(student);
		this.emit("change");
	}

	updateStudent(student){
		var studentToUpdate=_.find(this.students, function(obj) { return obj.id == student.id })
		
		for (var prop in studentToUpdate){
			studentToUpdate[prop]= student[prop];
		}

		
		this.emit("change");
	}

	getStudentTableInfo(){
		return this.studentTableInfo;
	}

	getStudentArray(){
		return this.students;
	}

	getStudentById(id){
		return _.find(this.students, function(obj) { return obj.id === id } );
	}

	getYears(){
		return this.years;
	}

	getCycles(){
		return this.cycles;
	}

	getCursus(){
		return this.cursus;
	}

	getSpecialisations(){
		return this.specialisations;
	}

	handleAction(action){
		
		switch(action){
			case "firstnameChanged" :{
				console.log("YES!! ");		
			}

			break;

			
		}
	}
}



const studentStore = new StudentStore;
window.studentStore=studentStore;
window.dispatcher=dispatcher;
export default studentStore;

dispatcher.register(studentStore.handleAction.bind(studentStore))
