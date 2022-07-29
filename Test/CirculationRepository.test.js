const CirculationRepository = require('./../repository/CirculationRepository')

test("Get all items", async () => {
    // Act
    const result = await CirculationRepository.GetItems()
    
    // Assert
    expect(result[0].Newspaper).toEqual("USA Today");
})

test("Should Get By Id", async () => {
    // Act
    const items = await CirculationRepository.GetItems()
    const result = await CirculationRepository.GetItemById(items[0]._id)

    //Assert
    expect(items[0].Newspaper).toEqual(result.Newspaper);
})

test("Should Return null if Id not found", async () => {
    try {
        // Arrange
        const id = "InvalidId"
        let result;
   
        // Act
        result = await CirculationRepository.GetItemById(id)
        
        //Assert    
        expect(result).toEqual(null);

    } catch(error) {
        //Assert
        expect(error.message).toEqual("Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
    }

})

test("Should get item by newspaper", async () => {
    //Arrange
    const name = "USA Today";

    // Act
    const result = await CirculationRepository.GetItem(name);

    // Assert
    expect(result.Newspaper).toEqual(name);
})

test("Should not found a item by invalid name", async () => {
    //Arrange
    const name = "Invalid Name";

    // Act
    const newNewspaper = await CirculationRepository.GetItem(name);
    

    // Assert
    expect(newNewspaper).toEqual(null);
})

test("Should Create new item", async () => {
    //Arrange
    const item = {
        "Newspaper": "Brazil2",
        "Daily Circulation, 2004": 2192,
        "Daily Circulation, 2013": 1674,
        "Change in Daily Circulation, 2004-2013": -24,
        "Pulitzer Prize Winners and Finalists, 1990-2003": 1,
        "Pulitzer Prize Winners and Finalists, 2004-2014": 1,
        "Pulitzer Prize Winners and Finalists, 1990-2014": 2
    }

    // Act
    const newNewspaper = await CirculationRepository.CreateItem(item);
    const result = await CirculationRepository.GetItemById(newNewspaper.insertedId);

    // Assert
    expect(result.Newspaper).toEqual(item.Newspaper);
})

test("Should Delete item by Id", async () => {
    // Arrange
    const name = "Brazil2"
    const item = await CirculationRepository.GetItem(name)

    // Act
    const result = await CirculationRepository.DeleteItem(item._id)
    const tryFindItem = await CirculationRepository.GetItemById(item._id);

    expect(tryFindItem).toEqual(null)
})

test("Should not delete item by invalidId", async () => {
    
    try {
        // Arrange
        const id = "InvalidId"
        // Act
        const result = await CirculationRepository.DeleteItem(id)
        // Assert
        expect(result).toEqual(null)
    } catch (error) {
        // Assert
        expect(error.message).toEqual("Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
    }

})
