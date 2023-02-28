import axios from "axios";

var searchText = "";

const fetchSearchText = () =>{
    if(window.localStorage.getItem('searchText')){
        searchText = window.localStorage.getItem('searchText') 
        console.log(searchText);
        localStorage.removeItem('searchText');
    }else{
        console.log('No text detected');
    }
}

const searchTextFunc = async () =>{
    if(searchText.length>1){

    }else{

    }
}

fetchSearchText();
searchTextFunc();
