type Props = {
  message: string;
  onClose: () => void;
};

export default function ModalMessage({ message, onClose }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative bg-gray-900 p-6 rounded-xl text-white max-w-sm w-full z-10">
        <p>{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
          onClick={onClose}
        >
          Stäng
        </button>
      </div>
    </div>
  );
}
