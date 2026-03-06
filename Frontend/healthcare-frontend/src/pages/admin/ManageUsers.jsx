import React, { useEffect, useMemo, useState } from 'react';
import { getAllUsers } from '../../api/adminApi';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getAllUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const usersByRole = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        const role = (user.role || 'UNKNOWN').toUpperCase();
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      },
      { USER: 0, DOCTOR: 0, ADMIN: 0, UNKNOWN: 0 }
    );
  }, [users]);

  if (loading) return <Loader text="Loading users..." />;

  return (
    <div className="dashboard">
      <h2>Manage Users</h2>
      {error && <ErrorState message={error} />}
      {!error && (
        <>
          <p>
            Total: {users.length} | Users: {usersByRole.USER} | Doctors: {usersByRole.DOCTOR}
            {' '}| Admins: {usersByRole.ADMIN}
          </p>
          {users.length === 0 ? (
            <EmptyState message="No users found." />
          ) : (
            <div className="users-list">
              {users.map((user) => (
                <div key={user.id} className="user-item">
                  <h3>{user.name || 'Unnamed User'}</h3>
                  <p>Email: {user.email || 'N/A'}</p>
                  <p>Role: {user.role || 'N/A'}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageUsers;

