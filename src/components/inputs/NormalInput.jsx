import { FaChevronDown } from "react-icons/fa";

const NormalInput = ({
  placeholder,
  value,
  setValue,
  label,
  type,
  id,
  className,
  inputClassName,
  options,
  ...props
}) => {
  const renderBasedOnType = () => {
    switch (type) {
      case "textarea": {
        return (
          <textarea
            className={`normal-input-textarea ${inputClassName || ""}`}
            id={id}
            placeholder={placeholder}
            value={value || ""}
            onChange={(e) => setValue(e?.target?.value)}
            {...props}
          />
        );
      }
      case "checkbox": {
        return (
          <div className="normal-input-checkbox-container">
            <input
              className={`normal-input-checkbox ${inputClassName || ""}`}
              id={id}
              type={"checkbox"}
              checked={value || false}
              onChange={(e) => setValue(e?.target?.checked)}
              {...props}
            />
            {label && (
              <label
                htmlFor={id}
                className="normal-input-label normal-input-checkbox-label"
                onClick={() => setValue(!value)}
              >
                {label}
              </label>
            )}
          </div>
        );
      }
      case "select": {
        return (
          <div className={`select-input-container ${className}`}>
            <div className="select-wrapper">
            <select
              className={`select-input-field ${className}`}
              placeholder="Select Task Status"
              type="select"
              value={value}
              onChange={(e) => setValue(e?.target?.value)}
            >
            {placeholder && (
            <option value="" disabled className="select-placeholder">
              {placeholder}
            </option>
          )}
          {options?.map((option, index) => (
            <option key={index} value={option} className="select-option">
              {option}
            </option>
              ))}
            </select>
            <div className="select-arrow">
          <FaChevronDown className="fas fa-chevron-down"/>
        </div>
          </div>
          </div>
        );
      }
      default: {
        return (
          <input
            className={`normal-input-field ${inputClassName || ""}`}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value || ""}
            onChange={(e) => setValue(e?.target?.value)}
            {...props}
          />
        );
      }
    }
  };

  // For checkbox, we render the label differently (inside the container)
  if (type === "checkbox") {
    return (
      <div className={`normal-input-container ${className || ""}`}>
        {renderBasedOnType()}
      </div>
    );
  }

  return (
    <div className={`normal-input-container ${className || ""}`}>
      {label && (
        <label className="normal-input-label" htmlFor={id}>
          {label}
        </label>
      )}
      {renderBasedOnType()}
    </div>
  );
};

export default NormalInput;
