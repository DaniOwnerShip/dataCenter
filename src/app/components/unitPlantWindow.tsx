"use client";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import Area from "./area";
import Loading from "./loading";
import FileMetadata from "./fileMetadata";
import type { ReportDocument } from "@/types/report";

type Props = {
  _spot: string;
  report: ReportDocument;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UnitPlantWindow({ _spot, report, setIsShow }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDisableDragg, setIsDisableDragg] = useState(true);
  const spot = _spot;
  const unitN = `_${spot.split("-")[1]}`;
  const [windowStyle, setWindowStyle] = useState({ place: unitN, isDraggable: "", isDragging: "" });

  useEffect(() => {
    setWindowStyle((style) => ({ ...style, place: unitN }));
  }, [unitN]);

  return (
    <Draggable nodeRef={nodeRef} disabled={isDisableDragg} onStart={() => setWindowStyle((style) => ({ ...style, isDragging: "isDragging" }))} onStop={() => setWindowStyle((style) => ({ ...style, isDragging: "" }))}>
      <div ref={nodeRef} className={`UnitPlantWindow ${Object.values(windowStyle).join(" ")}`}>
        <ResizableBox width={870} height={250} minConstraints={[100, 100]} style={{ overflow: "auto" }}>
          <div className="resizableWindow">
            {report ? (
              <div className="mainContainer window">
                <FileMetadata reportMetadata={report[0].metaData} />
                <div className="UnitPlantWindowBar">
                  <button type="button" className="button" onClick={() => setIsShow(false)}>
                    ❌
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => {
                      setIsDisableDragg((v) => !v);
                      setWindowStyle((style) => ({ ...style, isDraggable: isDisableDragg ? "isDraggable" : "" }));
                    }}
                  >
                    {isDisableDragg ? "📍" : "📌"}
                  </button>
                </div>
                <section className="areas-container">
                  {report[2].areas.map((area, indexArea) => (
                    <div key={`areaw-${indexArea}`} className="area">
                      <Area report={report} spot={spot} _area={area} indexArea={indexArea} windowKey={"w2"} />
                    </div>
                  ))}
                </section>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}
