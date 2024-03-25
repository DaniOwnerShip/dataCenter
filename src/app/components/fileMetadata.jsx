

export default function FileMetadata({ reportMetadata, unit }) {


    const reportName = reportMetadata.fileID.split('.')[0];

    return (
        <div className="flex fileMetadata">
            <h4 className="noMargin">{reportMetadata.place}&nbsp;</h4>

            <h4 className="noMargin paddingL">📑{reportName}</h4>
            <p className="noMargin">&nbsp;&nbsp;T.{reportMetadata.DayNight}&nbsp;{`${reportMetadata.DayNight === 'Día' ? '☀️' : '🌙'}`}</p>

            <p className="noMargin paddingL">Última edición:&nbsp;&nbsp;</p>
            <h4 className="noMargin">{reportMetadata.lastEdit}</h4>

            {unit === 'main1' && <><p className="noMargin paddingL">Estado:&nbsp;&nbsp;</p>
                <h4 className="noMargin">{reportMetadata.checksum ? "completado📗" : "en edición📖"}</h4></>}
        </div>
    );
}