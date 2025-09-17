import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useDebounce } from '../../hooks/useDebounce';
import useGithubUserSearch from './useGithubUserSearch';
import './search.css';

interface SearchFormProps {
  variant?: 'hero' | 'compact';
  initialValue?: string;
}

const SearchForm = ({ variant = 'hero', initialValue = '' }: SearchFormProps) => {
  const [term, setTerm] = useState(initialValue);
  const navigate = useNavigate();
  const debounced = useDebounce(term);
  const enableSuggestions = variant === 'hero' && debounced.trim().length >= 2;
  const { data: suggestions = [], isFetching, isError } = useGithubUserSearch(
    debounced,
    enableSuggestions
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = term.trim();
    if (!value) return;
    navigate(`/user/${value}`);
  };

  const suggestionList = useMemo(() => suggestions.slice(0, 5), [suggestions]);

  return (
    <div className={clsx('search-form', variant)}>
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input
          aria-label="Search GitHub users"
          className="search-form__input"
          placeholder="Search GitHub usernames"
          value={term}
          onChange={event => setTerm(event.target.value)}
        />
        <button className="primary" type="submit">
          Search
        </button>
      </form>

      {variant === 'hero' && (
        <div className="search-suggestions">
          {isError && <p className="hint error">Unable to load suggestions.</p>}
          {!isError && debounced.trim().length < 2 && (
            <p className="hint">Type at least two characters to search.</p>
          )}
          {!isError && enableSuggestions && (
            <>
              {isFetching && <p className="hint">Searching…</p>}
              {!isFetching && suggestionList.length === 0 && (
                <p className="hint">No matching users found.</p>
              )}
              {!isFetching && suggestionList.length > 0 && (
                <ul className="suggestion-list">
                  {suggestionList.map(user => (
                    <li key={user.id}>
                      <button
                        type="button"
                        onClick={() => navigate(`/user/${user.login}`)}
                      >
                        <img src={user.avatar_url} alt="" />
                        <span>{user.login}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
