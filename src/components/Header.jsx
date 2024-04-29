import "./Header.css";

const Header = ({ title, leftChild, rightChild }) => {
  return (
    <header className="Header">
      <div className="leftChild">{leftChild}</div>
      <div className="center">{title}</div>
      <div className="rightChild">{rightChild}</div>
    </header>
  );
};

export default Header;
