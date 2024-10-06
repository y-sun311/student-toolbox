import PropTypes from "prop-types";
import "./styles/title.css";

Title.propTypes = {
  text: PropTypes.string.isRequired
};

export default function Title({ text }) {
  return <h1 className="title">{text}</h1>
}