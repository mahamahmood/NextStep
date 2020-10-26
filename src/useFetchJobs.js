import { useReducer, useEffect } from 'react';// to handle all different types of states inside of useFetchJobs
import axios from 'axios';

//the three actions we want to preform in our state
const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}
//https://cors-anywhere.herokuapp.com actes as a proxy to aviod http cors error
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: [] }//new request loading and empty array
        case ACTIONS.GET_DATA://passing jobs into action.payload and set it to jobsfor acitons.get_data
            return { ...state, loading: false, jobs: action.payload.jobs }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: []}//clear out jobs if we have an error
        default:
            return state //if we pass action we don't have, return current state
    }
}
//useReducer takes a function reducer and initial state which in this case is object that has an array of jobs and loading true so the object loads first.
// reducer function gets called everytime we update dispatch
// dispatch whatever we pass to it, it gets populated inside action variable
//state is the current state of the application
//type is set for different values or actions we want to preform
//payload is the data for that type 

export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true } )

    // every time we change params(typeing in a search bar) or page num we need to load our data so we'll use useEffect hook
    useEffect(()=> {
        const cancelToken = axios.CancelToken.source()//to stop making many requests
        dispatch({ type: ACTIONS.Make_REQUEST })//setting state to loading state
        axios.get(BASE_URL, {//passing it options 
            cancelToken: cancelToken.token,
            params: { markdown: true, page: page, ...params }//page is current page num. take all current paramaters and add it our params like description, location, full_time
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
        }).catch(e => {
            if (axios.isCancel(e)) return//if cancel return nothing
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        })

        return () => {// run a function to clear our code above in useEffect
            cancelToken.cancel()
        }
    }, [params, page])//whenever they change we would re-run the useEffect
    
    
    return state
};