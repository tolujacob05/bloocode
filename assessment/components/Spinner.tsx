import Image from "next/image";
import ani from "@/assets/ani.gif";

function Spinner() {
  return (
    <div className="spinner">
      <Image src={ani} alt="" />
    </div>
  );
}

export default Spinner;
