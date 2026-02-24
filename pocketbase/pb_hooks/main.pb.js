routerAdd('GET', '/location', (e) => { // Location
    try {
        let city = encodeURIComponent(e.request.url.query().get("city"))
        const res = $http.send({
            url: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=46c9ee8f1274c2734c84066d7b4ffabe`,
            method: "GET",
            timeout: 30
        })
        return e.json(res.statusCode, res.json)
    }
    catch (error) {
        console.error(error)
    }
})



routerAdd('GET', '/weather/{lat}/{lon}', (e) => { // Weather
    try {
        let lat = e.request.pathValue("lat")
        let lon = e.request.pathValue("lon")
        
        const res = $http.send({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=46c9ee8f1274c2734c84066d7b4ffabe`,
            method: "GET",
            timeout: 30
        })
        return e.json(res.statusCode, res.json)
        
    }
    catch (error) {
        console.error(error)
    }
})

routerAdd('GET', '/forecast/{lat}/{lon}', (e) => { // Forecast
    try {
        let lat = e.request.pathValue("lat")
        let lon = e.request.pathValue("lon")
        
        const res = $http.send({
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=46c9ee8f1274c2734c84066d7b4ffabe&units=metric`,
            method: "GET",
            timeout: 30
        })
        return e.json(res.statusCode, res.json)
        
    }
    catch (error) {
        console.error(error)
    }
})

routerAdd('GET', '/image/{query}', (e) => { // Image
    try {
        let query = e.request.pathValue("query")

        const res = $http.send({
            url: `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`,
            headers: { Authorization: 'CYJ2yN02aKa6NXFHENRS20ck9BV76yEJYQyWwiWaZt1wYBV1pv6sJfhE' },
            method: "GET",
            timeout: 30
        })
        return e.json(res.statusCode, res.json)
    }
    catch (error) {
        console.error(error)
    }
})