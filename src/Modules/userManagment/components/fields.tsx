import PropTypes from "prop-types";

interface FieldProps {
  label: string;
  value: string;
}

export const Field: React.FC<FieldProps> = ({ label, value }) => {
  return (
    <div>
      <label
        htmlFor="label"
        className="block text-gray-700 text-sm font-semibold mb-2"
      >
        {label}:
      </label>
      <input
        type="text"
        value={value}
        readOnly
        className="peer bg-white w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />
    </div>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Field;
