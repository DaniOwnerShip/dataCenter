import { useEffect, useState } from "react";
import MediaTabs from "./mediaTabs";
import type { ReportArea, ReportAreaItem, ReportDocument } from "@/types/report";

type Props = {
  report: ReportDocument;
  spot: string;
  _area: ReportArea;
  indexArea: number;
  windowKey: string;
  isTemplate?: boolean;
  isDocReserved?: boolean;
};

export default function Area({ report, spot, _area, indexArea, windowKey, isTemplate = false, isDocReserved = false }: Props) {
  const [expandArea, setExpandArea] = useState(true);
  const unitN = spot.split("-")[1];

  return (
    <>
      <AreaTittle spot={spot} area={_area} expandArea={expandArea} setExpandArea={setExpandArea} />
      {expandArea && (
        <div className="area-items-container">
          {_area.areaItems.map((item, indexItem) => (
            <div key={`item-${indexArea}-${indexItem}`} className="area-items">
              <AreaItem area={item} uKey={`${windowKey}-${spot}-${indexArea}-${indexItem}`} />
            </div>
          ))}
          {unitN === "0" && <MediaTabs report={report} _area={_area} indexArea={indexArea} isTemplate={isTemplate} isDocReserved={isDocReserved} />}
        </div>
      )}
    </>
  );
}

function AreaTittle({
  spot,
  area,
  expandArea,
  setExpandArea,
}: {
  spot: string;
  area: ReportArea;
  expandArea: boolean;
  setExpandArea: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const unitN = `_${spot.split("-")[1]}`;
  return (
    <div className={` ${expandArea ? `area-tittle expand ${unitN}` : `area-tittle ${unitN}`} `}>
      {area.areaName}
      <div className="flex center">{area.units}</div>
      Comentarios
      <button type="button" className="button expandArea" onClick={() => setExpandArea(!expandArea)}>
        {`${expandArea ? "➖" : "➕"}`}
      </button>
    </div>
  );
}

function AreaItem({ area, uKey }: { area: ReportAreaItem; uKey: string }) {
  return (
    <>
      {area.desc}
      <ButtonsStates areaItem={area} uKey={uKey} />
      <Commensts areaItem={area} uKey={uKey} />
    </>
  );
}

function ButtonsStates({ areaItem, uKey }: { areaItem: ReportAreaItem; uKey: string }) {
  const [forceRender, setForceRender] = useState(false);
  void forceRender;
  const buttonStates = areaItem.state;

  return (
    <div className="flex center">
      {areaItem.state.map((states, indexstate) => (
        <button
          type="button"
          key={`btnstate-${uKey}-${indexstate}`}
          className="button states"
          id={`btnstate-${uKey}-${indexstate}`}
          onClick={() => {
            buttonStates[indexstate] = !buttonStates[indexstate];
            setForceRender((v) => !v);
          }}
        >
          {`${states ? "✅" : "❌"}`}
        </button>
      ))}
    </div>
  );
}

function Commensts({ areaItem, uKey }: { areaItem: ReportAreaItem; uKey: string }) {
  const id = `txtarea-${uKey}`;
  const [isExpanded, setIsExpanded] = useState(true);
  const [forceRender, setForceRender] = useState(false);
  void forceRender;

  useEffect(() => {
    const txtObj = document.getElementById(id) as HTMLTextAreaElement | null;
    if (!txtObj) return;
    const lines = txtObj.value.split("\n").length;
    if (lines === 1) {
      txtObj.style.height = "1.2rem";
      return;
    }
    txtObj.style.height = "auto";
    txtObj.style.height = `${txtObj.scrollHeight}px`;
  }, [id]);

  return (
    <div className="textarea-container">
      <button
        type="button"
        id={`tbt-${uKey}`}
        className="textarea-button"
        onClick={() => {
          const txtObj = document.getElementById(id) as HTMLTextAreaElement | null;
          if (!txtObj) return;
          if (isExpanded) txtObj.style.height = "1rem";
          else {
            txtObj.style.height = "auto";
            txtObj.style.height = `${txtObj.scrollHeight}px`;
          }
          setIsExpanded(!isExpanded);
        }}
      >
        {`${isExpanded ? "-" : "+"}`}
      </button>

      <textarea
        className="textarea"
        id={id}
        placeholder="comentarios"
        value={areaItem.comments}
        onChange={(e) => {
          areaItem.comments = e.target.value;
          const txtObj = e.target;
          txtObj.style.height = "auto";
          txtObj.style.height = `${txtObj.scrollHeight}px`;
          setForceRender((v) => !v);
        }}
      ></textarea>
    </div>
  );
}
