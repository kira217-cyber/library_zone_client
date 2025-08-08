import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user, setUser } = useAuth();
  const auth = getAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");

  const handleSave = async () => {
    if (!newName.trim()) {
      toast.error("Name cannot be empty!");
      return;
    }

    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      setUser({ ...user, displayName: newName }); // লোকাল স্টেট আপডেট
      toast.success("Name updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update name!");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl overflow-hidden">
        {/* প্রোফাইল ছবি */}
        <div className="flex justify-center mt-6">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} alt="User" />
            </div>
          </div>
        </div>

        {/* ইউজার ইনফো */}
        <div className="card-body text-center">
          {isEditing ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="input input-bordered w-full"
              />
              <div className="mt-3 flex gap-3 justify-center">
                <button onClick={handleSave} className="btn btn-primary btn-sm">
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{user?.displayName}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-outline btn-primary btn-sm mt-3"
              >
                Edit Name
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
