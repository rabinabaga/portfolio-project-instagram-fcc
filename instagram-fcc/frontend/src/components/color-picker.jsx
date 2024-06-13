import { SketchPicker } from "react-color";
import "../styles/color-picker-component.scss"
import { useState } from "react";
function ColorPicker() {
  const [color, setColor] = useState("#000000");
  const handleChange = (color) => {
    console.log(color.hex);
    setColor(color.hex);
  };

  return (
    <>
    <div style={{width:"200px", height:"200px", border:"1px solid #000", backgroundColor:color}}>hello</div>
      <SketchPicker
        className="background-color"
        color={color}
        onChangeComplete={handleChange}
      />
    </>
  );
}

export default ColorPicker;
