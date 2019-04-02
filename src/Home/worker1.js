

export default () => {
	let quantidade=0;
	let tempo=0;
	let tempMax=0;
	let quantMax=0;
	self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
		if (!e) return;

	if(e.data.comand=="iniciar"){
		tempMax=e.data.tempMax;
		quantMax=e.data.quantMax;
		setInterval(()=>{
			if((tempo+1)===tempMax){
				if(quantidade<quantMax){
					quantidade++;
					if(quantidade<quantMax){
						tempo=0;
					}
				}
			}else{
				tempo++;
			}
			}, 1000);
	}

	if(e.data.comand=="status"){
		
		postMessage({tempo:tempo, quantidade:quantidade});
	}
	})
}