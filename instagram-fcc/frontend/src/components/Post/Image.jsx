import { PropTypes } from "prop-types";

export default function Image({src, caption}) {
    const url_imgs = "http://localhost:8001/images/"
    return ( 
    
       <div className="min-h-fit">
        {/* //min-h-max */}
        <img src={`${url_imgs}${src}`} className="w-full h-full object-cover" alt="" />
       </div>
             

    
  
     );
}


Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
}
