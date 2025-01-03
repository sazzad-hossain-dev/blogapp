import { useState } from "react";

const StepOne = ({ formData, onInputChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <h2 className="text-xl font-semibold dark:text-gray-200">
                Basic Information
            </h2>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => onInputChange("username", e.target.value)}
                className="w-full px-4 py-3 mt-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:ring-violet-500"
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                className="w-full px-4 py-3 mt-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:ring-violet-500"
            />
            <div className="relative mt-2">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => onInputChange("password", e.target.value)}
                    className="w-full px-4 py-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:ring-violet-500"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-3 text-gray-600 dark:text-gray-400"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                    onInputChange("confirmPassword", e.target.value)
                }
                className="w-full px-4 py-3 mt-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:ring-violet-500"
            />
        </div>
    );
};

export default StepOne;
