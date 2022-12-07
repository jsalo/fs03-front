import { useState, useEffect } from 'react'
import phoneBookService from './services/phoneBookService'
import Heading from './components/Heading'
import Numbers from './components/Numbers'
import AddNewPerson from './components/AddNewPerson'
import Search from './components/Search'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMesssage, setNotificationMessage] = useState({notificationMessage: {text: '', class: ''}})

  const getPhoneBook = () => {
    console.log('getPhoneBook loading...', phoneBookService)
    phoneBookService
      .getAll()
      .then(allPeople => {
        console.log('getPhoneBook response', allPeople)
        setPersons(allPeople)
      })
      .catch (error => {
        console.log('getPhoneBook failed', error)
        setNotificationMessage({text: 'Could not retrieve the phonebook', class: 'error'})
      })
  }

  const updatePerson = (person) => {
    console.log('updatePerson update', person)
    if (window.confirm(`${person.name} has already been added. Replace the old number?`)) {
      const id = persons.find(personToUpdate => personToUpdate.name === person.name ).id;
      person.id = id
      phoneBookService
        .update(person.id, person)
        .then(updatedPerson => {
          console.log('updatePerson update response', updatedPerson)
          // this needs a fix:
          setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage({text:`${updatedPerson.name} has been updated`, class: 'notification'})
        }).catch (error => {
          console.log('updatePerson failed', error)
          setNotificationMessage({text:`Error updating ${person.name}`, class:'error'})  
        })
    }

  }

  const removePerson = (id) => {
    return () => {
      const who = persons.find( person => person.id === id ).name
      if (window.confirm(`Do you want to remove ${who}?`)) {
        phoneBookService
          .remove(id)
          .then(status => {
            const newPersons = persons.filter(person => person.id !== id)
            setPersons(newPersons)
            setNotificationMessage({text:`${who} was removed.`, class: 'notification'})
            console.log('removePerson done', id, status)
          })
          .catch(error => {
            setNotificationMessage({text:`Could not remove ${who}.`, class: 'error'})
          })
      }
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const lookup = persons.filter(person => person.name === newName)

    const person = {
      name: newName,
      number: newNumber
    }

    if (lookup.length) {
      person.id = lookup.id
      if (person.number !== lookup.number) {
        updatePerson(person)
      } else {
        setNotificationMessage({text:`${lookup.name} is already in the phonebook with that number.`,class:'notification'})
      }
      return
    }

    console.log('addPerson create', person)

    phoneBookService
      .create(person)
      .then(addedPerson => {
        console.log('addPerson create response', addedPerson)
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage({text:`${person.name} added`, class:'notification'})
      })
      .catch (error => {
        console.log('addPerson failed', error)
        setNotificationMessage({text:`Adding ${person.name} failed`, class:'error'})
      })

  }

  const searchPerson = (event) => {
    event.preventDefault()
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // start by loading the phonebook
  useEffect(() => {
    getPhoneBook()
  }, [])



  return (
    <div>
      <Heading />
      <Notification message={notificationMesssage} />
      <Search 
        searchPerson={searchPerson} 
        searchTerm={searchTerm} 
        handleSearchChange={handleSearchChange} 
      />
      <AddNewPerson 
        addPerson={addPerson} 
        newName={newName} 
        handlePersonChange={handlePersonChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <Numbers persons={persons} searchTerm={searchTerm} removePerson={removePerson} />
    </div>
  )
}

export default App
