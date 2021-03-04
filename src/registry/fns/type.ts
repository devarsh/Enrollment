export interface CommonFetcherResponse {
  data: any;
  status: "success" | "failure";
}

export interface sessionObjType {
  baseURL?: URL;
  loginStatus: boolean;
  token?: any;
}
