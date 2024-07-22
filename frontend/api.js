class API{
    #baseURL;
    constructor(baseUrl =null){
        this.#baseURL =baseUrl || 'http://localhost:3000/api/'

    }

    async get(url){
        try {
            const response =await fetch(`${this.#baseURL}${url}`);
            return response.json()
        } catch ({message}) {
            return {message}
        }
        
    }
}

export default API