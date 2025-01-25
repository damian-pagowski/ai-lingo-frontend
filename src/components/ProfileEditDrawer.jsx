import Button from './Button';

const ProfileEditDrawer = ({ isOpen, onClose, formData, onInputChange, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-300 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={onInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={onInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <div className="flex justify-between">
          <Button className="bg-gray-500 hover:bg-gray-600" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={onSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditDrawer;