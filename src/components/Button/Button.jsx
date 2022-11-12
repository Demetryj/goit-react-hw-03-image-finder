export const Button = ({ handleClickLoadMore, children }) => {
  return (
    <button type="button" onClick={handleClickLoadMore}>
      {children}
    </button>
  );
};
