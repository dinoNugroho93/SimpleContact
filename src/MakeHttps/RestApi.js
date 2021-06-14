import { Alert } from 'react-native';
import * as SERVER from './BaseAPi';

export async function getAPI(parameter) {
    let parameters = parameter;
    try{
        const fetchAPI = await fetch(SERVER.SERVER + parameters );
        if(fetchAPI.ok) {
            let temp = await fetchAPI.json();
            if(temp !== undefined || temp.callback !== undefined)
            {
                if(temp.statusCode === "0")
                {
                    return temp;
                }else{
                    return temp;
                }
            }else{
                if (__DEV__) console.log('%c UNDEFINED ==> ' + JSON.stringify(temp), 'color: red; font-style: italic');
            }
        } else {
            let temp = await fetchAPI.json();
            Alert.alert("Terjadi Kesalahan", temp.message)
            throw Error(`Request rejected with status ${fetchAPI.status}`);
        }
    } catch (e) {
        if (__DEV__) console.log('%c CATCH ==> ' + SERVER.SERVER + parameter +' ===> ' + JSON.stringify(e), 'color: red; font-style: bold; font-size:15px');

    }
}

export async function postAPI(request, urlAction) {
    let header = null;
    let requestAPI = request;
    let decryptUrlAction = urlAction;

    try{
            header ={
                'Content-Type': 'application/json',
            };
        const fetchAPI = await fetch(SERVER.SERVER + decryptUrlAction, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(requestAPI)
        });

        if (__DEV__) console.log('%c FETCH ==> ' + JSON.stringify(fetchAPI), 'color: red; font-style: italic');
        if(fetchAPI.ok) {
            let temp = await fetchAPI.json();
                if(temp !== undefined || temp.callback !== undefined)
                {
                    if (__DEV__) {
                        console.log('%c CALLING ==> ' + JSON.stringify(SERVER.SERVER + decryptUrlAction), 'color: red; font-style: italic');
                        console.log('%c HEADER ==> ' + JSON.stringify(header), 'color: blue; font-style: italic');
                        console.log('%c REQUEST ==> ' + JSON.stringify(request), 'color: blue; font-style: italic');
                        console.log('%c RESPONSE ==> ' + JSON.stringify(temp), 'color: green; font-style: italic');
                    }

                    if(temp.status === "0")
                    {
                        return temp;
                    }else{
                        return temp;
                    }
                }else{
                    if (__DEV__) console.log('%c UNDEFINED ==> ' + JSON.stringify(temp), 'color: red; font-style: italic');
                }
        } else {
            let temp = await fetchAPI.json();
            Alert.alert("Terjadi Kesalahan", temp.message)
            throw Error(`Request rejected with status ${fetchAPI.status}`);
        }
    } catch (e) {
        if (__DEV__) console.log('%c CATCH ==> ' + SERVER.SERVER  + decryptUrlAction +' ===> ' + JSON.stringify(e), 'color: red; font-style: bold; font-size:15px');


    }
}


export async function deleteAPI(urlAction, params) {
    let parameterId = params
    let header = null;
    let decryptUrlAction = urlAction;

    try{
            header ={
                'Content-Type': 'application/json',
            };
        const fetchAPI = await fetch(SERVER.SERVER + decryptUrlAction + `/${parameterId}`, {
            method: 'DELETE',
            headers: header,
        });

        if (__DEV__) console.log('%c FETCH ==> ' + JSON.stringify(fetchAPI), 'color: red; font-style: italic');
        if(fetchAPI.ok) {
            let temp = await fetchAPI.json();
                if(temp !== undefined || temp.callback !== undefined)
                {
                    if (__DEV__) {
                        console.log('%c CALLING ==> ' + JSON.stringify(SERVER.SERVER + decryptUrlAction), 'color: red; font-style: italic');
                        console.log('%c HEADER ==> ' + JSON.stringify(header), 'color: blue; font-style: italic');
                        console.log('%c REQUEST ==> ' + JSON.stringify(request), 'color: blue; font-style: italic');
                        console.log('%c RESPONSE ==> ' + JSON.stringify(temp), 'color: green; font-style: italic');
                    }

                    if(temp.status === "0")
                    {
                        return temp;
                    }else{
                        return temp;
                    }
                }else{
                    if (__DEV__) console.log('%c UNDEFINED ==> ' + JSON.stringify(temp), 'color: red; font-style: italic');
                }
        } else {
            let temp = await fetchAPI.json();
            Alert.alert("Terjadi Kesalahan", temp.message)
            throw Error(`Request rejected with status ${fetchAPI.status}`);
        }
    } catch (e) {
        if (__DEV__) console.log('%c CATCH ==> ' + SERVER.SERVER  + decryptUrlAction +' ===> ' + JSON.stringify(e), 'color: red; font-style: bold; font-size:15px');


    }
}



export async function putAPI(request, urlAction, paramId) {
    let header = null;
    let requestAPI = request;
    let decryptUrlAction = urlAction;

    try{
            header ={
                'Content-Type': 'application/json',
            };
        const fetchAPI = await fetch(SERVER.SERVER + decryptUrlAction + `/${paramId}`, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(requestAPI)
        });

        if (__DEV__) console.log('%c FETCH ==> ' + JSON.stringify(fetchAPI), 'color: red; font-style: italic');
        if(fetchAPI.ok) {
            let temp = await fetchAPI.json();
                if(temp !== undefined || temp.callback !== undefined)
                {
                    if (__DEV__) {
                        console.log('%c CALLING ==> ' + JSON.stringify(SERVER.SERVER + decryptUrlAction), 'color: red; font-style: italic');
                        console.log('%c HEADER ==> ' + JSON.stringify(header), 'color: blue; font-style: italic');
                        console.log('%c REQUEST ==> ' + JSON.stringify(request), 'color: blue; font-style: italic');
                        console.log('%c RESPONSE ==> ' + JSON.stringify(temp), 'color: green; font-style: italic');
                    }

                    if(temp.status === "0")
                    {
                        return temp;
                    }else{
                        return temp;
                    }
                }else{
                    if (__DEV__) console.log('%c UNDEFINED ==> ' + JSON.stringify(temp), 'color: red; font-style: italic');
                }
        } else {
            let temp = await fetchAPI.json();
            Alert.alert("Terjadi Kesalahan", temp.message)
            throw Error(`Request rejected with status ${fetchAPI.status}`);
        }
    } catch (e) {
        if (__DEV__) console.log('%c CATCH ==> ' + SERVER.SERVER  + decryptUrlAction + paramId +' ===> ' + JSON.stringify(e), 'color: red; font-style: bold; font-size:15px');


    }
}