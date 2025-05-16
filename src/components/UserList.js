// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { getData } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // เรียกใช้ API และเซ็ตข้อมูลที่ได้
    const fetchData = async () => {
      const result = await getData();
      setUsers(result);
    };

    fetchData();
  }, []);  // จะทำงานเมื่อ component ถูก mount เท่านั้น

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email}
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
