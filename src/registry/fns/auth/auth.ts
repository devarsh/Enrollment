import { CommonFetcherResponse } from "../type";

const authAPI = () => {
  let baseURL: URL | null = null;
  const inititateAPI = (APIURL: string) => {
    baseURL = new URL(APIURL);
  };
  const internalFetcher = async (
    url: string,
    payload: any
  ): Promise<CommonFetcherResponse> => {
    if (baseURL === null) {
      return {
        status: "failure",
        data: "API not inititated",
      };
    }
    try {
      let response = await fetch(new URL(url, baseURL).href, {
        method: "POST",
        ...payload,
      });
      if (String(response.status) === "200") {
        let data = await response.json();
        return {
          status: String(data.status) === "0" ? "success" : "failure",
          data: data,
        };
      } else {
        return {
          status: "failure",
          data: "",
        };
      }
    } catch (e) {
      return {
        status: "failure",
        data: e,
      };
    }
  };
  const veirfyUsername = async (username: any, loginType: string) => {
    const { data, status } = await internalFetcher(
      `./los/${loginType}/verify`,
      {
        body: JSON.stringify({
          request_data: {
            userId: username,
          },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data?.error_data };
    }
  };

  const verifyPasswordAndLogin = async (
    transactionId,
    username,
    password,
    loginType
  ) => {
    const { data, status } = await internalFetcher(`./los/${loginType}/login`, {
      body: JSON.stringify({
        request_data: {
          transactionId: transactionId,
          password: password,
          userId: username,
        },
        channel: "W",
      }),
    });
    if (status === "success") {
      return {
        status,
        data: {
          token: data?.response_data?.token?.access_token,
          tokenType: data?.response_data?.token?.token_type,
          user: {
            branch: data?.response_data?.user?.baseBranch,
            lastLogin: data?.response_data?.user?.lastLoginDate,
            type: data?.response_data?.user?.flag,
            firstName: data?.response_data?.user?.firstName,
            lastName: data?.response_data?.user?.lastName,
          },
        },
      };
    } else {
      return { status, data: data?.error_data };
    }
  };

  const verifyToken = async (loginType, token) => {
    const { data, status } = await internalFetcher(
      `./los/${loginType}/token/verify`,
      {
        body: JSON.stringify({
          request_data: {
            tokenID: token,
          },
          channel: "W",
        }),
      }
    );
    if (status === "success") {
      return { status, data: data?.response_data };
    } else {
      return { status, data: data instanceof Error ? data : data?.error_data };
    }
  };

  return {
    inititateAPI,
    veirfyUsername,
    verifyPasswordAndLogin,
    verifyToken,
  };
};

export const AuthSDK = authAPI();
