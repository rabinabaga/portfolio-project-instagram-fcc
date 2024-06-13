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
      <div
        className="auth-one-bg-position  auth-one-bg"
        style={{
          width: "200px",
          height: "200px",
          border: "1px solid #000",
        }}
      >
        {" "}
        <div className="bg-overlay"></div>{" "}
      </div>
      <button className="button">Get Started</button>
      <SketchPicker
        className="background-color"
        color={color}
        onChangeComplete={handleChange}
      />
    </>
  );
}

export default ColorPicker;
