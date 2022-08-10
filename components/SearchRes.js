function SearchRes({ searchResults }) {
  if (searchResults && searchResults.length > 0) {
    return (
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{`${result.title} by ${result.artists.join(', ')}`}</li>
        ))}
      </ul>
    );
  }
  return null;
}

export default SearchRes;
