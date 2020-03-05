function savePositionSelectIndex(){
    let position=document.getElementById("positions-select");
    let positionChoice=position.options[position.selectedIndex].value;
    //setting cookies
    //member?posisionId=1
    //member
    document.cookie='positionChoice='+positionChoice;
    document.cookie='poleChoice='+0;
    self.location.href=position.options[position.selectedIndex].value;
}

function savePoleSelectIndex(){
    let pole=document.getElementById("pole-select");
    let poleChoice=pole.options[pole.selectedIndex].value;
    //setting cookies
    //member?posisionId=1
    //member
    document.cookie='poleChoice='+poleChoice;
    document.cookie='positionChoice='+0;
    self.location.href=pole.options[pole.selectedIndex].value;
}


function selectIndex(){
    console.log('loading select index');
    //remember to initialize
    let positionChoice=0;
    let poleChoice=0;
    //getting cookies
    let coosStr=document.cookie;
    console.log(coosStr);
    //splitting by ; and space
    let coos=coosStr.split("; ");
    for(let i=0;i<coos.length;i++){
        //splitting by =
        let coo=coos[i].split("=");
        console.log(coo);
        if(coo[0]=="positionChoice"){
            if(coo[2]===undefined){
                positionChoice='all';//all members or all consultants
            }
            else
            {
                positionChoice = coo[2];
            }
        }
        if(coo[0]=="poleChoice"){
            if(coo[2]===undefined){
                poleChoice='all';//all members or all consultants
            }
            else
            {
                poleChoice = coo[2];
            }

        }
    }


    let position=document.getElementById("positions-select");
    let pole=document.getElementById("pole-select");

    //POSITION
    //not chose
    if(positionChoice==0) {
        position.selectedIndex = 0;
    }else if(positionChoice=='all'){
        position.selectedIndex = 1;
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
    //not chose
    if(poleChoice==0) {
        pole.selectedIndex = 0;
    }else if(poleChoice=='all'){
        pole.selectedIndex= 1;
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