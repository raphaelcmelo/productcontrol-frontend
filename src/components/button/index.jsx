const ButtonComponent = ({ label, onClick, type, disabled, variant }) => {
  return (
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`btn ${variant}`}
      >
        {label}
      </button>
  );
};

export default ButtonComponent;