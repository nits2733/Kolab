import React from "react";
import SideNav from "./[documentid]/_components/SideNav";
import { Room } from "@/app/Room";

function Workspace({ params }) {
  return (
    <div>
      <SideNav params={params} />
      <Room params={params}>
        <SideNav params={params} />
      </Room>
    </div>
  );
}

export default Workspace;
