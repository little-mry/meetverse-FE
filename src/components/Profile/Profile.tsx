type Props = {
  username: string;
  email: string;
};

const Profile = ({ username, email }: Props) => {
  return (
    <div>
      <h2 className="text-4xl">{username}</h2>
      <h4 className="text-lg">{email} </h4>
    </div>
  );
};

export default Profile;
