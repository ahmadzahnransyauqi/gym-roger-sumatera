export default function InputField({ label, type = "text", placeholder }) {
  return (
    <div className="w-full mb-5">
      <p className="ml-1 mb-1 text-white">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="border placeholder-[#444444] bg-white border-gray-300 rounded-lg p-2 w-full"
      />
    </div>
  );
}
