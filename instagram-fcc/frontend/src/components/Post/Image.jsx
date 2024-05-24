import { PropTypes } from "prop-types";

export default function Image({src, caption}) {
    const url_imgs = "http://localhost:8001/images/"
    return ( 
    
        <img src={`${url_imgs}${src}`} className="object-cover max-h-72"  alt={caption} />
    
  
     );
}


Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
}
