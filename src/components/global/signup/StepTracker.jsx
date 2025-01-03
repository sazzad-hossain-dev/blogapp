const StepTracker = ({ currentStep }) => {
    const steps = ["Basic Info", "Additional Info", "Profile Picture"];
    return (
        <ul className="steps mb-6">
            {steps.map((label, index) => (
                <li
                    key={index}
                    className={`step ${
                        index + 1 <= currentStep ? "step-primary" : ""
                    }`}
                >
                    {label}
                </li>
            ))}
        </ul>
    );
};

export default StepTracker;
