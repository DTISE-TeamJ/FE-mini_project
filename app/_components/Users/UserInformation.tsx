import React from 'react';

const UserInformation: React.FC = () => {
  // This is a placeholder. We'll integrate with Redux and fetch real data later.
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    points: 100,
    profilePicture: 'https://via.placeholder.com/150',
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-6">
        <img
          src={user.profilePicture}
          alt={user.name}
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">User Information</h3>
        <p><strong>Points:</strong> {user.points}</p>
        {/* Add more user information fields here */}
      </div>
    </div>
  );
};

export default UserInformation;