type meetupCardProps = {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  category: string;
  capacity: number;
  registrations: number;
  onClick?: () => void;
};

const MeetupCard = ({
  title,
  description,
  location,
  date,
  time,
  category,
  capacity,
  registrations,
  onClick,
}: meetupCardProps) => {
  return (
    <article
      onClick={onClick}
      className="bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-300 text-sm mt-1">{description}</p>
        <p className="text-sm text-gray-400 mt-2">{location}</p>
        <p className="text-sm text-gray-400">
          {date} • {time}
        </p>
       <p className="text-sm text-gray-400"> Anmälda: {registrations}/{capacity} </p>
        <p className="text-xs mt-3 text-purple-400 font-medium">Kategori: {category}</p>
      </div>
    </article>
  );
};

export default MeetupCard;
