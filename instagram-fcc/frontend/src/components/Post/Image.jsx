import { PropTypes } from "prop-types";

export default function Image({src, caption}) {
    const url_imgs = "http://localhost:8001/images/"
    return ( 
    <div className="h-50 w-50">
        <img src={`${url_imgs}${src}`}  alt={caption} />
    </div>
     );
}


Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
}
