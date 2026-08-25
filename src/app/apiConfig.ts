interface ApiEnvironment {
  baseUrl: string;
  socketUrl: string;
}

const development: ApiEnvironment = {
  baseUrl: 'http://localhost:8000',
  socketUrl: 'ws://localhost:8000/ws',
};

const production: ApiEnvironment = {
  baseUrl: 'https://api.cloutgrid.com',
  socketUrl: 'wss://api.cloutgrid.com/ws',
};

export const ApiConfig: ApiEnvironment = development;
// export const ApiConfig: ApiEnvironment = import.meta.env.DEV ? development : production;