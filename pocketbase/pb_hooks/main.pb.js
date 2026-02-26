routerAdd('GET', '/location', (e) => { // Location
    const apiKey = process.env.OPENWEATHER_API_KEY
    console.log(apiKey)
    try {
        let city = encodeURIComponent(e.request.url.query().get("city"))
        const res = $http.send({
            url: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`,
            method: "GET",
            timeout: 30000
        })
        return e.json(res.statusCode, res.json)
    }
    catch (error) {
        console.error(error)
    }
})

routerAdd('GET', '/weather/{lat}/{lon}', (e) => { // Weather
    const apiKey = process.env.OPENWEATHER_API_KEY
    try {
        let lat = e.request.pathValue("lat")
        let lon = e.request.pathValue("lon")
        
        const res = $http.send({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
            method: "GET",
            timeout: 30000
        })
        return e.json(res.statusCode, res.json)
        
    }
    catch (error) {
        console.error(error)
    }
})

routerAdd('GET', '/forecast/{lat}/{lon}', (e) => { // Forecast
    const apiKey = process.env.OPENWEATHER_API_KEY
    try {
        let lat = e.request.pathValue("lat")
        let lon = e.request.pathValue("lon")
        
        const res = $http.send({
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
            method: "GET",
            timeout: 30000
        })
        return e.json(res.statusCode, res.json)
        
    }
    catch (error) {
        console.error(error)
    }
})

routerAdd('GET', '/image/{query}', (e) => { // Image
    const paxelsApiKey = process.env.PEXELS_API_KEY
    try {
        let query = e.request.pathValue("query")

        const res = $http.send({
            url: `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`,
            headers: { Authorization: paxelsApiKey },
            method: "GET",
            timeout: 30000
        })
        return e.json(res.statusCode, res.json)
    }
    catch (error) {
        console.error(error)
    }
})