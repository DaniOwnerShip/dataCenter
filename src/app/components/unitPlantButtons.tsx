"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import UnitPlantWindow from "./unitPlantWindow";
import FileApi from "../apis/fileApi";
import SocketAPI from "../apis/socketAPI";
import type { ReportDocument } from "@/types/report";

type Props = {
  spot: string;
  pickerDate?: string;
};

export default function UnitPlantButtons({ spot, pickerDate }: Props) {
  const router = useRouter();
  const spots = [
    ["Unidad-0-dia", "Unidad-0-noche"],
    ["Unidad-1-dia", "Unidad-1-noche"],
    ["Unidad-2-dia", "Unidad-2-noche"],
  ];
  const [report, setReport] = useState<ReportDocument | null>(null);
  const [isShow, setIsShow] = useState(false);
  const [activeSpot, setActiveSpot] = useState("");
  const [btnUrlActive, setBtnUrlActive] = useState(spot);
  const [btnWindowActive, setBtnWindowActive] = useState<string | null>(null);

  const clickOpenWindow = (_spot: string) => {
    const fileName = `informe_${_spot}_${pickerDate}.json`;
    FileApi.downloadjson(fileName)
      .then((res) => {
        if (res.fileType === "Plantilla hidratada") return window.alert(`❌ no existe el archivo : ${fileName.split(".")[0]}`);
        setReport(res.data);
        setIsShow(true);
        setActiveSpot(_spot);
        setBtnWindowActive(_spot);
      })
      .catch((e) => window.alert(`❌ ${e.message}`));
  };

  const clickToUnit = (_spot: string) => {
    if (SocketAPI.socket.isOn) return window.alert("necesita desconectar la interfaz");
    router.push(`/pages/unitreport/${_spot}`);
    setBtnUrlActive(_spot);
  };

  return (
    <>
      {spots.map((_spot, index) => (
        <div className="button-sidebar-Box" key={`x-${index}`}>
          <p className="noMargin">Unidad {index === 0 ? "Admin" : index}</p>
          {_spot.map((spotDN, iunit) => (
            <div key={`spot-${index}-${iunit}`}>
              <div className="flex" key={`spot-${index}-${iunit}`}>
                <button type="button" className={`button sidebar ${btnUrlActive === spotDN ? "BSactive" : ""}`} onClick={() => clickToUnit(spotDN)}>
                  {`${spotDN.split("-")[2]}`}
                </button>
                <button type="button" className={`button BSWindow ${btnWindowActive === spotDN && isShow ? "BSactive" : ""}`} onClick={() => clickOpenWindow(spotDN)}>
                  🔎
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {report && isShow && <UnitPlantWindow _spot={activeSpot} report={report} setIsShow={setIsShow} />}
    </>
  );
}
