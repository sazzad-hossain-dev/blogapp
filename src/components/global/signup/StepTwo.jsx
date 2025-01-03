const StepTwo = ({ formData, onInputChange }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold dark:text-gray-200">
                Additional Information
            </h2>
            <input
                type="text"
                placeholder="Gender"
                value={formData.gender}
                onChange={(e) => onInputChange("gender", e.target.value)}
                className="w-full px-4 py-3 mt-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-violet-500"
            />
            <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => onInputChange("location", e.target.value)}
                className="w-full px-4 py-3 mt-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-violet-500"
            />
            <input
                type="text"
                placeholder="Study"
                value={formData.study}
                onChange={(e) => onInputChange("study", e.target.value)}
                className="w-full px-4 py-3 mt-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-violet-500"
            />
        </div>
    );
};

export default StepTwo;
