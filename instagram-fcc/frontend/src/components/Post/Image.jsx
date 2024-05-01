import { PropTypes } from "prop-types";

export default function Image({src, caption}) {
    return ( 
    <div className="h-50 w-50">
        <img src={src} alt={caption} />
    </div>
     );
}


Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
}
