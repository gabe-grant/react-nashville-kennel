// This code imports the main React library, and two functions that it exports. 
import React, { useState, createContext } from "react"
// We will useState to hold and set the array of animals.

// A context stores a certain kind of data to be used in your application. Therefore, when you create a data provider component in React, you need to create a context.
export const AnimalContext = createContext()
// Nothing is stored in the context when it's defined. At this point, it's just an empty warehouse waiting to be filled.

// Now that the required functions are imported, and an empty context is created, it's time to define the data provider component that will allow other components to use the data in the context.
export const AnimalProvider = (props) => {
// You define a single property for each provider defined in your system. This is because the components that uses the data must be defined as children components (more about this in the next chapter), and React will send an object to each component. One of the properties on that object will be children, which contains the child elements.

    // Next, you will use the useState() hook to define a variable that holds the state of the component, and a function that updates it.
    const [animals, setAnimals] = useState([])

    const getAnimals = () => {
        return fetch("http://localhost:8088/animals?_expand=location")
        .then(res => res.json())
        .then(setAnimals)
    }

    const addAnimal = animalObj => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
        .then(getAnimals)
    }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <AnimalContext.Provider value={{
            animals, getAnimals, addAnimal
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}