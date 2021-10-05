import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api/API";

export const IsLoggedContext = createContext();
export const NotificationContext = createContext();

export const IsLoggedContextProvider = ({ children }) => {

    // const gettoken = [document.cookie ? document.cookie.split('=')[1] : ""]
    const gettoken = [localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')) : '']

    const [posts, setPosts] = useState([]);
    const [loggeduser, setLoggedUser] = useState([]);
    const [isLogged, setIsLogged] = useState(gettoken);
    const [isCreatedPost, setIsCreatedPost] = useState([])

    const requestUser = async (token) => {
        try {    
            document.getElementById('App').classList.add('loading')
            const res = await API.get("/user",  {
               headers: {
                   'Content-Type': 'application/json',
                   'Athorization': `Bearer ${token}`
               }
            });
            setLoggedUser([
                res.data.user
            ])
            
            setPosts([
               ...res.data.getPosts
            ]
            )

            const app = document.getElementById('App');
            if(app){

                app.classList.remove('loading')
                document.getElementById('main').classList.remove('d-none')
            }

        } catch (error) {
           const app = document.getElementById('App')
           if(app) {app.classList.remove('loading')}
           const main = document.getElementById('main')
           if(main) {main.classList.remove('d-none')}
           console.log(error);
           
       }
    }


    useEffect(()=> {
        if(isLogged.length> 0){
            const token = isLogged[0];
            requestUser(token);
        } 
    }, [isLogged])
    useEffect(()=> {
        
        if(isLogged.length> 0){
            const token = isLogged[0];
            requestUser(token);
        } 
    }, [isCreatedPost])

    return (
        <IsLoggedContext.Provider value={{
            isLoggedState: [isLogged, setIsLogged],
            loggeduserState: [loggeduser, setLoggedUser], 
            postState: [posts, setPosts],
            isCreatedPostState: [isCreatedPost, setIsCreatedPost],  
        }}>
            {children}
        </IsLoggedContext.Provider>
    )
}


export const NotificationContextProvider = ({ children }) => {
    const [getNotification, setGetNotification] = useState([])
    const { loggeduserState } = useContext(IsLoggedContext)
    const [ loggeduser ] = loggeduserState;
    const requestNotification = async () => {
        try {
            const res = await API.get("/notification",  {
                headers: {
                    'Content-Type': 'application/json',
                    'Athorization': `Bearer ${loggeduser[0]._id}`
                }
             });

            setGetNotification([
                res.data
            ])
            console.log(res.data);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if(loggeduser.length > 0){
            requestNotification();
        }
    }, [loggeduser])


    return (
        <NotificationContext.Provider value={[getNotification, setGetNotification]}>
            {children}
        </NotificationContext.Provider>
    )
}