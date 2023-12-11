export class AppFetch {
  private APIHost: string;
  private config?: RequestInit;

  constructor(APIHost: string, config?: RequestInit) {
    if (config) {
      this.config = config;
    }
    this.APIHost = APIHost;
  }

  async get(url: string, config?: RequestInit) {
    const response = await fetch(this.APIHost + url, {
      method: "GET",
      ...this.config,
      ...config,
    });

    if (response.status === 401) {
      // handle unauthorized error here.
    }

    return response.json();
  }

  async delete(url: string, config?: RequestInit) {
    const response = await fetch(this.APIHost + url, {
      method: "DELETE",
      ...this.config,
      ...config,
    });

    if (response.status === 401) {
      // handle unauthorized error here.
    }

    return response.json();
  }

  async put(url: string, data: { [key: string]: any }, config?: RequestInit) {
    const response = await fetch(this.APIHost + url, {
      method: "PUT",
      body: typeof data === "object" ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    });

    if (response.status === 401) {
      // handle unauthorized error here.
    }

    return response.json();
  }

  async patch(url: string, data: { [key: string]: any }, config?: RequestInit) {
    const response = await fetch(this.APIHost + url, {
      method: "PATCH",
      body: typeof data === "object" ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    });

    if (response.status === 401) {
      // handle unauthorized error here.
    }

    return response.json();
  }

  async post(url: string, data: { [key: string]: any }, config?: RequestInit) {
    const response = await fetch(this.APIHost + url, {
      method: "POST",
      body: typeof data === "object" ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    });

    if (response.status === 401) {
      // handle unauthorized error here.
    }

    return response.json();
  }
}
