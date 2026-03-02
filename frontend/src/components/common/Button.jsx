function Button({ children, loading = false, ...props }) {
  return (
    <button className="btn" disabled={loading || props.disabled} {...props}>
      {loading ? 'Please wait...' : children}
    </button>
  );
}

export default Button;
