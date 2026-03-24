"use client";

import React, { useRef, useState } from "react";
import Area from "@/components/area";
import Loading from "@/components/loading";
import FileMetadata from "@/components/fileMetadata";
import SocketInterface from "@/components/socketInterface";
import SocketFastReq from "@/components/socketFastReq";
import Handshake from "@/components/handshake";
import UnitPlantButtons from "@/components/unitPlantButtons";
import FileDatePicker from "@/components/fileDatePicker";
import FileButtons from "@/components/fileButtons";
import "@/styles/shiftChange.css";
import "@/styles/scrollbar.css";
import "react-resizable/css/styles.css";
import type { ReportApiResponse } from "@/types/report";

type SpotPageProps = {
  params: {
    spot: string;
  };
};

export default function Spot({ params }: SpotPageProps) {
  const spot = params.spot;
  const refToPDF = useRef<HTMLDivElement | null>(null);
  const [report, setReport] = useState<ReportApiResponse>();
  const [pickerDate, setPickerDate] = useState<string>();
  const [template, setTemplate] = useState({ isTemplate: false, type: "Plantilla hidratada" });
  const [isDocReserved, setIsDocReserved] = useState(false);
  const [isFastSocket, setIsFastSocket] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpandApp = () => {
    setIsExpanded(!isExpanded);
  };

  const callbackSocket = (isDocReserve: boolean, isFast: boolean) => {
    setIsDocReserved(isDocReserve);
    setIsFastSocket(isFast);
  };

  const clearTemplate = () => {
    report?.data[2].areas.forEach((area) => {
      area.areaItems.forEach((item) => {
        item.state.forEach((_state, index) => {
          item.state[index] = false;
        });
        item.comments = "";
      });
    });
    setReport(report ? { ...report } : report);
    setTemplate({ ...template, type: "Plantilla vacía" });
  };

  return (
    <>
      <div className="sideBarLeft">
        <div className="sidebarBox">
          <UnitPlantButtons spot={spot} pickerDate={pickerDate} />
        </div>
        <FileDatePicker setReport={setReport} spot={spot} setPickerDate={setPickerDate} setTemplate={setTemplate} />
        {report && <FileButtons report={report.data} refToPDF={refToPDF} setTemplate={setTemplate} />}
      </div>

      {report ? (
        <>
          <h1 className="flex center header">
            {report.data[0].metaData.tittle}&nbsp;{report.data[0].metaData.DayNight === "dia" ? "☀️" : "🌙"}
          </h1>

          {template.isTemplate && (
            <div className="flex center header noMargin">
              <h3>
                <em>{template.type}</em>
              </h3>
              {template.type === "Plantilla hidratada" && (
                <button type="button" title="limpiar" className="button template" onClick={clearTemplate}>
                  🧹
                </button>
              )}
            </div>
          )}

          <div className="app">
            {!isFastSocket ? (
              <SocketInterface report={report.data} callback={callbackSocket} isDocReserved={isDocReserved} />
            ) : (
              <div className="socket-interface">
                <h4>
                  <em> &nbsp;reserva rápida&nbsp; </em>
                </h4>
                <div className="lineAnim-background"></div> <div className="lineAnim"></div>
              </div>
            )}

            <div className="mainContainer">
              <div className="fileContent" ref={refToPDF}>
                <div className="flex center rightpos">
                  {!report.data[0].metaData.checksum && (
                    <>
                      <SocketFastReq docID={report.data[0].metaData.fileID} callback={callbackSocket} />
                      {isDocReserved ? "🔓" : "🔒"}&nbsp;&nbsp;
                    </>
                  )}

                  <button type="button" className="button" onClick={() => toggleExpandApp()}>
                    {`${isExpanded ? "➖" : "➕"}`}
                  </button>
                </div>

                <FileMetadata reportMetadata={report.data[0].metaData} />

                {isExpanded && (
                  <div className={`areas-container ${isDocReserved ? "enabled" : "disabled"}`}>
                    <Handshake report={report.data} />

                    {report.data[0].metaData.checksum && (
                      <p className="noMargin segSing paddingL enabled">
                        <em>Firma de seguridad: </em>
                        <strong>{report.data[0].metaData.checksum}</strong>
                      </p>
                    )}
                    <section className="areas-container">
                      {report.data[2].areas.map((area, indexArea) => (
                        <div key={`area-${indexArea}`} className="area">
                          <Area
                            report={report.data}
                            spot={spot}
                            _area={area}
                            indexArea={indexArea}
                            windowKey={"w1"}
                            isTemplate={template.isTemplate}
                            isDocReserved={isDocReserved}
                          />
                        </div>
                      ))}
                    </section>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
