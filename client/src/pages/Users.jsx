import axiosInstance from 'axios';
import { useEffect, useState } from 'react';
import DynamicTable from '../components/DynamicTable';

const USERS_URL = 'http://localhost:3000/users';

export default function Users() {
  const [users, setUsers] = useState([]);
  const columns= [
    { key: "name", label: "Name" },
    { key: "actionsAllowed", label: "Actions allowed" },
    { key: "currentActionsAllowed", label: "Current Actions Allowed" },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const {data} = await axiosInstance.get(USERS_URL, {
          headers: {
            'x-access-token': token // Include the token in the headers
          }
        });
        const tranformedUsers = data.map(user => ({
          name: user.FullName,
          actionsAllowed: user.NumOfActions,
          currentActionsAllowed: user.RemainingActions,
        }))
        setUsers(tranformedUsers); // Save users to state
        console.log('Fetched Users:', data); // Print users to the console
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); 

  return (
    <div>
      <h2>Users</h2>
        <DynamicTable columns={columns} data={users}/>
    </div>
  );
}
