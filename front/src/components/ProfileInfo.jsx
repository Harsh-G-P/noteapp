import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getInitials } from '../utils/helper';
import CircularText from './CircularText';

const ProfileInfo = ({ onLogout }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setName(res.data.name);
      } catch (err) {
        console.error('Error fetching user info', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
        
        <CircularText
              text={getInitials(name)}
              onHover="speedUp"
              spinDuration={20}
              className="custom-class font-bold text-xl"
            />
      </div>
      <div>
        <p className='text-sm font-medium'>{name}</p>
        <button className='text-sm text-slate-700 underline' onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
