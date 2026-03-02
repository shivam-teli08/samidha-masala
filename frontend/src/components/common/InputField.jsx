function InputField({ id, label, type = 'text', value, onChange, placeholder }) {
  return (
    <label className="input-group" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </label>
  );
}

export default InputField;
