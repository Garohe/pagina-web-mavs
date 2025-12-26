import { useAppSelector } from '@/store';

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="max-w-2xl">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700">Name</label>
              <p className="mt-1 text-secondary-900">{user?.firstName} {user?.lastName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700">Email</label>
              <p className="mt-1 text-secondary-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700">Role</label>
              <p className="mt-1 text-secondary-900 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
