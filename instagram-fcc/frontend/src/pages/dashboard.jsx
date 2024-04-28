import { useState } from "react";
import Header from "../components/header";
// import Sidebar from "../components/sidebar";
// import Timeline from "../components/Timeline";


export default function Dashboard() {
    const [count, setCount] = useState(3);
    return ( 
        <>
            <Header></Header>
          
            <div className="grid grid-cols-3 gap-4  justify-between mx-auto max-w-screen-lg ">
                {/* <Timeline></Timeline>
                <Sidebar></Sidebar> */}
                hello
            </div>
        </>
     );
}

