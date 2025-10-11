import PropTypes from 'prop-types';
import Introduction from "./Introduction.jsx";

// It doesn't do much to the children right now in terms of formatting, I don't currently have anything
// I specifically want to apply to separate containers on multiple components in terms of formatting.
const Wrapper = ({ children }) => {
 return (
     <div className="section">
         <div className="container">
             {children}
         </div>
     </div>
     )
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Wrapper;