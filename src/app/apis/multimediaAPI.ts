import { getApiBaseUrl, getAuthHeaders } from "./env";

export default class MediaAPI {
  static async mediaupload(
    mediaFile: File,
    mediaType: string,
    docFileName: string,
    areaIndex: number | string,
  ): Promise<any> {
    const formData = new FormData();
    formData.append("mediaFile", mediaFile);
    formData.append("mediaType", mediaType);
    formData.append("docFileName", docFileName);
    formData.append("areaIndex", String(areaIndex));

    const url = `${getApiBaseUrl()}/multimediaAPI/mediaupload`;
    const res = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        ...getAuthHeaders(),
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}, ${res.statusText}`);
    }

    return res.json();
  }

  static async mediaDeleteFile(
    docFileName: string,
    areaIndex: number | string,
    mediaType: string,
    mediaURL: string,
  ): Promise<any> {
    const df = encodeURIComponent(docFileName);
    const ai = encodeURIComponent(String(areaIndex));
    const mt = encodeURIComponent(mediaType);
    const murl = encodeURIComponent(mediaURL);
    const url = `${getApiBaseUrl()}/multimediaAPI/mediadelete?docFileName=${df}&areaIndex=${ai}&mediaType=${mt}&mediaURL=${murl}`;
    const res = await fetch(url, {
      headers: {
        ...getAuthHeaders(),
      },
    });

    if (!res.ok) {
      throw new Error(`delete-image Error: ${res.status}, ${res.statusText}`);
    }

    return res.json();
  }
}
