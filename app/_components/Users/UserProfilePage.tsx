import React, { useState } from 'react';
import UserInformation from './UserInformation';
import EditUserInformation from './EditUserInformation';

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <UserInformation />;
      case 'edit':
        return <EditUserInformation />;
      default:
        return <UserInformation />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left-side menu */}
      <div className="w-64 bg-white shadow-md">
        <nav className="mt-8">
          <ul>
            <li>
              <button
                className={`w-full text-left py-2 px-4 ${
                  activeTab === 'info' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('info')}
              >
                User Information
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left py-2 px-4 ${
                  activeTab === 'edit' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('edit')}
              >
                Edit User Information
              </button>
            </li>
            {/* Add more menu items here if needed */}
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default UserProfilePage;