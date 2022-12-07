const AddNewPerson = ({addPerson, newName, handlePersonChange, newNumber, handleNumberChange}) => {
    return (
      <div>
      <h3>Add a new person</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
    )
  }

export default AddNewPerson;
