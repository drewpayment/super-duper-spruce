

const Checkbox = ({name, label, isSelected, onCheckboxChange}) => {
  const inputClasses =
    'block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring';
  return (
    <div>
      <label htmlFor={name} className="text-gray-700 dark:text-gray-200">{label}</label>
      <input type="checkbox" id={name} className={inputClasses} checked={isSelected} onChange={onCheckboxChange} />
    </div>
  )
}

export default Checkbox
