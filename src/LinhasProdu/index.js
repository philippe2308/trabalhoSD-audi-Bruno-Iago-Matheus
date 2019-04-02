import React, { Component } from 'react';
import ReactCountdownClock from "react-countdown-clock";
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import worker from './worker1.js';
import WebWorker from './workerSetup';
import './style.css';

class LinhasProdu extends Component {
	 

     constructor(props) {
      super(props);

      this.state = {
		completed: 0.0,
		count:0,
		quantidade:0,
		tempo:0,
		
		
	  };
    }
  
	iniciar = () => {

	this.worker.postMessage({comand:"iniciar",tempMax:this.props.duration,quantMax:this.props.estoque});

		this.worker.addEventListener('message', event => {
			const{tempo,quantidade}=event.data;
			this.setState({tempo:tempo, quantidade:quantidade, completed: (tempo)*100/this.props.duration});
			
			if(quantidade>=this.props.pecarPorCarro){
				this.props.pecasDisponivel(true);
			}else{
				this.props.pecasDisponivel(false);
				
			}
			//console.log(event);
		});
	}
	
	componentWillReceiveProps(nextProps){
	  if(this.props.novoCarro===false&&nextProps.novoCarro===true){
		this.worker.postMessage({comand:"newCar", pecarPorCarro:this.props.pecarPorCarro});
		if(this.props.addNewCar){
			this.props.addNewCar();
		}
	  }
	}
	
	getStatus = () => {

	this.worker.postMessage({comand:"status"});

	}
	
	
  componentDidMount() {
    this.timer = setInterval(this.getStatus, 100);//1000/100
    //this.timerCount = setInterval(this.progressCount, 1000);//1000/100
	
		this.worker = new WebWorker(worker);
		this.iniciar();

	}
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  /*progress = () => {
    const { completed, count } = this.state;
    if (completed >= 100) {
		this.fetchWebWorker();
      this.setState({ count: 0.0 ,completed:0});
    } else {
      const diff = 0.1;
      this.setState({ count: count+diff ,completed:(count+diff)*100/this.props.duration});
    }
  };

  progressCount = () => {
    const { count } = this.state;
    if (count === this.props.duration) {
      this.setState({ count: 1 });
    } else {
      const diff = 1;
      this.setState({ count: count + diff });
    }
  };*/
  
  
  render() {
	  
	  
	  

	  
	  
	  
	  
	  
	  
	  const{title,duration,color}=this.props;
    return (
      <div className="produLine">
			
      
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
		  <div className="time">
          <Typography  variant="h6" color="inherit">
		  {this.state.tempo}/{this.props.duration}
          </Typography>
		  </div>
        </Toolbar>
      </AppBar>
        <LinearProgress variant="determinate" value={this.state.completed} />
		
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
          >
            <ListItemText
              primary="Quantidade de peças"
              secondary={this.state.quantidade}
            />
          </ListItem>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
          >
            <ListItemText
              primary="Quantidade maxima de estoque"
              secondary={this.props.estoque}
            />
          </ListItem>
        </List>
		<div className={this.props.estoque===this.state.quantidade?'parado':'emproducao'}>
			{this.props.estoque===this.state.quantidade?'Linha de produção parada':'Em produção'}
		</div>
      </div>
    );
  }
}

export default LinhasProdu;
