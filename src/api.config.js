import { useState } from "react";

export const base_url = "https://jsonplaceholder.typicode.com";
export const apiEndpoints = {
    getToDos: "/todos/1",
    getPosts: "/posts",
    getphotos: "/photos"
}

/** A utility for fetching
 * Recieves configuratons..
 */
export const useFetch = (endPoint) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    const fetchData = async ({ body, header = {}, method }) => {
        setisLoading(true);
        let url = `${base_url}${endPoint}`;

        try {
            let response = await fetch(url, {
                method: method
                , body: method !== "GET" ? JSON.stringify(body) : undefined,
                headers: {
                    "Content-Type": "application/json",
                    ...header
                }
            });
            let data = await response?.json();
            setData(data);
            setisLoading(false);
            return data;
        }
        catch (e) {
            console.error("API HIT-ERROR", e);
            setError(e);
            setisLoading(false);
        }


    }

    return { fetchData, data, error, isLoading }

}


//my new fetch
