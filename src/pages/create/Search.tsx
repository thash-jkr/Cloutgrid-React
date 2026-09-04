import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CloutCapsule from '@/components/CloutCapsule';
import CloutEmpty from '@/components/CloutEmpty';
import { fetchSuggestions, handleSearch } from '@/slices/searchSlice';
import type { UserProfile } from '@/types/authTypes';
import { getCategoryLabel } from '@/utils/categories';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from 'actify';
import { useEffect, useState } from 'react';
import box from '@/assets/isometric/box.png';
import { useNavigate } from 'react-router-dom';

interface UserListProps {
  profiles: UserProfile[];
}

function UserList({ profiles }: UserListProps) {
  const navigate = useNavigate();

  return (
    <div>
      {profiles.length > 0 ? (
        <div className="grid w-full grid-cols-2 gap-3">
          {profiles.map((profile) => (
            <div
              key={profile.username}
              className="w-full transform overflow-hidden rounded-2xl border
            transition-transform duration-300 ease-in-out hover:scale-95"
              onClick={() => navigate(`/profile/${profile.username}/`)}
            >
              <img src={profile.profile_photo} className="w-full" alt={profile.name} />

              <div className="flex flex-col items-center justify-center gap-2 p-2">
                <h1 className="font-semibold">{profile.name}</h1>
                <CloutCapsule text={getCategoryLabel(profile.category)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CloutEmpty icon={box} message="Nothing to see here!" />
      )}
    </div>
  );
}

const Search = () => {
  const [query, setQuery] = useState('');

  const { suggestions, results } = useAppSelector((state) => state.search);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSuggestions());
  }, [dispatch]);

  useEffect(() => {
    if (query.length == 0) {
      return;
    }

    dispatch(handleSearch(query));
  }, [query, dispatch]);

  return (
    <div className="flex flex-col p-3 gap-3 h-full w-full min-h-0 overflow-y-auto">
      <TextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={setQuery}
        trailingIcon={<FontAwesomeIcon icon={faSearch} />}
      />

      <UserList profiles={query != '' ? results : suggestions} />
    </div>
  );
};

export default Search;
