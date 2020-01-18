
//Types should be in const to avoid typos and duplication since it's a string and could be easily miss spelled
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SUB_QUANTITY = 'SUB_QUANTITY';
export const ADD_QUANTITY = 'ADD_QUANTITY';

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";


export function fetchPostsRequest(){
    return {
      type: "FETCH_REQUEST"
    }
  }
  
 export function fetchPostsSuccess(payload) {
    return {
      type: "FETCH_SUCCESS",
      payload
    }
  }

 export function fetchPostsError() {
    return {
      type: "FETCH_ERROR"
    }
  }

export function fetchPostsWithRedux() {
	return (dispatch) => {
  	dispatch(fetchPostsRequest());
    return fetchPosts().then(([response, json]) =>{
    	if(response.status === 200){
          dispatch(fetchPostsSuccess(json))
          //console.log("/test", json)
      } 
      else{
      	dispatch(fetchPostsError())
      }
    })
  }
}

function fetchPosts() {
  const URL = "https://api.myjson.com/bins/qhnfp";
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}
