export type ReportMetadata = {
  fileID: string;
  tittle: string;
  DayNight: string;
  dayDate: string;
  place: string;
  checksum?: string;
  isComplete?: boolean;
  lastEdit?: string;
  [key: string]: any;
};

export type HandshakeParty = {
  type: string;
  leader: string;
  number?: string;
};

export type HandshakeData = {
  party: HandshakeParty[];
};

export type ReportAreaItem = {
  desc: string;
  state: boolean[];
  comments: string;
};

export type ReportArea = {
  areaName: string;
  units: string;
  areaItems: ReportAreaItem[];
  urlImages: string[];
  urlVideos: string[];
  urlAudios: string[];
};

export type ReportDocument = [
  { metaData: ReportMetadata },
  { handshake: HandshakeData },
  { areas: ReportArea[] },
];

export type ReportApiResponse = {
  data: ReportDocument;
  fileType?: string | null;
};
