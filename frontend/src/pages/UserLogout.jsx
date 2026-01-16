import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem('token');

        await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } catch (err) {
        console.error('Logout error:', err.response?.status);
      } finally {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
      }
    };

    logout();
  }, []);

  return <div>Logging out...</div>;
};

export default UserLogout;
