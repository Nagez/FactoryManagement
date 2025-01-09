import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const navigate = useNavigate();
  const url = 'http://localhost:3000/auth/login';

  const login = async () => {
    try {
      const resp = await axios.post(url, { username, mail });
      const { token } = resp.data;

      sessionStorage.setItem('token', token); // Save the token
      navigate('/MainPage'); // Redirect to the users page
      window.location.reload(); //refresh required to reload name 
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your username and email.');
    }
  };

  return (
    <div>
      <div>
        Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        Email: <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
      </div>
      <button onClick={login}>Login</button>
    </div>
  );
}
