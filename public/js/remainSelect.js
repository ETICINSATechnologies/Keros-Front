function savePositionSelectIndex(){
    let position=document.getElementById("positions-select");
    let positionChoice=position.options[position.selectedIndex].value;
    document.cookie='positionChoice='+positionChoice;
    document.cookie='poleChoice='+0;
    self.location.href=position.options[position.selectedIndex].value;
}

function savePoleSelectIndex(){
    let pole=document.getElementById("pole-select");
    let poleChoice=pole.options[pole.selectedIndex].value;
    document.cookie='poleChoice='+poleChoice;
    document.cookie='positionChoice='+0;
    self.location.href=pole.options[pole.selectedIndex].value;
}

function selectIndex(){
    //remember to initialize
    let positionChoice=0;
    let poleChoice=0;
    let cookieString =document.cookie;
    let cookies=cookieString .split("; ");
    for(let i=0;i<cookies.length;i++){
        let cookie=cookies[i].split("=");
        if(cookie[0]=="positionChoice"){
            if(cookie[2]===undefined){
                positionChoice='all';//all members
            }
            else
            {
                positionChoice = cookie[2];
            }
        }
        if(cookie[0]=="poleChoice"){
            if(cookie[2]===undefined){
                poleChoice='all';//all members
            }
            else
            {
                poleChoice = cookie[2];
            }
        }
    }

    let position=document.getElementById("positions-select");
    let pole=document.getElementById("pole-select");

    //POSITION
    if(positionChoice==0) {
        position.selectedIndex = 0; //choix par defaut
    }else if(positionChoice=='all'){
        position.selectedIndex = 1; //AFFICHER TOUT
    } else{
        let length=position.options.length;
        for(let i=0;i<length;i++){
            if(position.options[i].value=='member?positionId='+positionChoice){
                position.selectedIndex=i;
                break;
            }
        }
    }

    //POLE
    if(poleChoice==0) {
        pole.selectedIndex = 0;//choix par defaut
    }else if(poleChoice=='all'){
        pole.selectedIndex= 1;//AFFICHER TOUT
    }else{
        let length=pole.options.length;
        for(let i=0;i<length;i++){
            if(pole.options[i].value=='member?poleId='+poleChoice){
                pole.selectedIndex=i;
                break;
            }
        }
    }
}