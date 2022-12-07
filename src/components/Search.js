
const Search = ({searchPerson, searchTerm, handleSearchChange}) => {
    return (
      <div>
        <h3>Search the phonebook</h3>
        <form onSubmit={searchPerson}>
          <div>
            search: <input value={searchTerm} onChange={handleSearchChange} />
          </div>
        </form>
      </div>
    )
}

export default Search;
