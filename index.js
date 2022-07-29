const express =  require("express")
const bodyParser = require("body-parser");

const CirculationRepository = require('./repository/CirculationRepository')
const App =  express();
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());

App.get("/", async (request, response) => {

    try
    {
        const result = await CirculationRepository.GetItems();
        response.send(result)
    } catch (error)
    {
        response.send(error)
    }
    
})

App.get("/:id", async (request, response) => {
    try {
        const result = await CirculationRepository.GetItemById(request.params.id);
        if(!result)
        {
            response.status(404)
        }
        response.send(result)
    } catch (error) {
        response.send(error)
    }
})

App.get("/newspaper/:newspaper", async (request, response) => {
    try {
        const result = await CirculationRepository.GetItem(request.params.newspaper);

        if(!result)
        {
            response.status(404)
        }
        response.send(result)
    } catch (error) {
        response.send(error)
    }
})

App.post('/', async (request, response) => {
    try {
       const result = await CirculationRepository.CreateItem(request.body);
       response.status(202).send(result)
    } catch (error) {
        response.status(500).send(error)
    }
})

App.delete('/:id', async (request, response) => {
    try {
        const item = await CirculationRepository.GetItemById(request.params.id);
        if(item)
        {
            await CirculationRepository.DeleteItem(request.params.id);
        } else {
            response.send("Not Found")
        }

        response.status(204);

    } catch(error) {
        console.log(error)
        response.status(404).send(error)
    }
})

App.listen(3000, () =>{
    console.log("Serve on in port 3000")
})