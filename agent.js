"use strict";


var go=function(txt){
    console.log("go:"+txt);
    var outputbox=document.getElementById('output');
    outputbox.innerHTML=process(txt);
}


var process=function(txt){
    if(txt=="hola"){
        return "que tal";
    }else{
        return "no entiendo";
    }
}
