

export default function FileMetadata({ reportMetadata }) {


    // const reportName = reportMetadata.fileID.split('.')[0];

    return (
        <div className="flex fileMetadata">
            
            <h4 className="noMargin">{reportMetadata.place}&nbsp;</h4>
            
            <h4 className="noMargin paddingL">📑Informe {reportMetadata.dayDate}</h4>
            <p className="noMargin paddingL">&nbsp;{`${reportMetadata.DayNight === 'Día' ? '☀️ Turno día' : '🌙 Turno noche'}`}</p>
   {/* <p className="noMargin paddingL">Última edición:&nbsp;&nbsp;</p>
            <h4 className="noMargin">{reportMetadata.lastEdit}</h4> */}

            <p className="noMargin paddingL">Estado:&nbsp;&nbsp;</p>
            <h4 className="noMargin">{reportMetadata.checksum ? "completado📗" : "en edición📖"}</h4>

        </div>
    );
}