import React, { Component } from 'react';
import LinhasProdu from './../LinhasProdu';
import worker from './worker1.js';
import WebWorker from '../LinhasProdu/workerSetup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './style.css';

class Home extends Component {

     constructor(props) {
      super(props);

      this.state = {
		  tempo:0,
		  carros:0,
		linha1:false,
		linha2:false,
		linha3:false,
		linha4:false,
		linha5:false
		
		
	  };
	  
    this.timer = setInterval(()=>this.progress(), 1000);//1000/100
    }
	fetchWebWorker = () => {

	this.worker.postMessage({comand:"iniciar",tempMax:3,quantMax:3});

		this.worker.addEventListener('message', event => {
			console.log(event);
		});
	}
	
	
	getStatus = () => {

	this.worker.postMessage({comand:"status"});

	}
	
  componentDidMount() {
    //this.timerCount = setInterval(this.progressCount, 1000);//1000/100
	
		this.worker = new WebWorker(worker);

	}

	progress(){
		const{tempo}=this.state;
		
		this.setState({tempo:tempo+1})
	}

  render() {
	  
	  const {linha1,linha2,linha3,linha4,linha5}=this.state;
	  let novoCarro=false;
	  if(linha1&&linha2&&linha3&&linha4&&linha5){
		  novoCarro=true;
		  
	  }
    return (
      <div className="App">
	  <div className="myDivs">
	  
        <LinhasProdu linha={linha1} novoCarro={novoCarro} pecasDisponivel={(value)=>{this.setState({linha1:value});}} pecarPorCarro={1} title="Motor" duration={12} estoque={10} color="#5F5"/>
        <LinhasProdu linha={linha2} novoCarro={novoCarro} pecasDisponivel={(value)=>this.setState({linha2:value})} pecarPorCarro={1} title="Carroceria" duration={15} estoque={20}  color="#F55"/>
        <LinhasProdu linha={linha3} novoCarro={novoCarro} addNewCar={()=>this.setState({carros:this.state.carros+1})} pecasDisponivel={(value)=>this.setState({linha3:value})} pecarPorCarro={4} title="Pneus" duration={9} estoque={100}  color="#55F"/>
        <LinhasProdu linha={linha4} novoCarro={novoCarro} pecasDisponivel={(value)=>this.setState({linha4:value})} pecarPorCarro={5} title="Bancos" duration={6} estoque={25}  color="#555"/>
		<LinhasProdu linha={linha5} novoCarro={novoCarro} pecasDisponivel={(value)=>this.setState({linha5:value})} pecarPorCarro={1} title="Eletrônica" duration={7} estoque={8}  color="#FF5"/>
		</div>
		<div className="myDivs">
		
		
		
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Quantidade de carros produzidos
        </Typography>
        <Typography variant="h5" component="h2">
		{this.state.carros}
        </Typography>
        <Typography color="textSecondary">
          Carros produzidos por segundo
        </Typography>
        <Typography component="p">
		{(this.state.carros/this.state.tempo).toFixed(2)}
        </Typography>
        <Typography color="textSecondary">
          Carros produzidos por minuto
        </Typography>
        <Typography component="p">
		{(this.state.carros*60/this.state.tempo).toFixed(2)}
        </Typography>
        <Typography color="textSecondary">
          Carros produzidos por hora
        </Typography>
        <Typography component="p">
		{(this.state.carros*60*60/this.state.tempo).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
		
		
		{/*this.state.tempo}
		{(this.state.linha1)?'T':'F'}
		{(this.state.linha2)?'T':'F'}
		{(this.state.linha3)?'T':'F'}
		{(this.state.linha4)?'T':'F'}
		{(this.state.linha5)?'T':'F'}
		{(novoCarro)?'novoCarro':'F'}
      <Button variant="contained" onClick={this.fetchWebWorker}>
        Default
      </Button>
      <Button variant="contained" onClick={this.getStatus}>
        Get status
  </Button>*/}
	  </div>
      </div>
    );
  }
}

export default Home;
