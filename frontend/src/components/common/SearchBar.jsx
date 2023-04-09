import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  border: '2px solid #B79F93',
  backgroundColor: '#FFF9F9',
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
  marginRight: '1vw',
  width: '100%',
  height: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '24ch',
      },
    },
  },
  fontFamily: 'GangwonEduAll',
  fontSize: '1rem',
}));

export default function SearchBar({ onSearch }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // 검색 기능 구현
    onSearch(search);
    navigate('/search');
  };

  const location = useLocation().pathname;

  useEffect(() => {
    setSearch('');
  }, [location]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="검색어를 입력하세요."
        inputProps={{ 'aria-label': 'search' }}
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
    </Search>
  );
}
