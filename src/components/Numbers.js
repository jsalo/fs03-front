
const Numbers = ({persons, searchTerm, removePerson}) => {
    let people = []
    if (searchTerm.length) {
      people = persons.filter(person => {
        return person.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      })
    } else {
      people = persons
    }
    return (
      <div id='phoneBook'>
      <h2>Numbers</h2>
      <div id="theNumnbers">
      {people.map(person => 
              <div key={person.id}>
              <b>{person.name}</b>  {person.number} 
              <button onClick={removePerson(person.id)}>delete</button>
              </div>
      )}
      </div>
      </div>
      )
  }

export default Numbers;
