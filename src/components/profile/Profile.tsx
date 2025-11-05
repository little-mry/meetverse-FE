type Props = {
  username: string;
  email: string;
};
// p
const Profile = ({ username, email }: Props) => {
  return (
    <div className="flex flex-col items-start ">
      <h2 className="text-6xl">{username}</h2>
      <h4 className="text-sm ml-0.5">{email} </h4>
    </div>
  );
};

export default Profile;
