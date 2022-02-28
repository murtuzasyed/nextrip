import axios from 'axios';

import { fetchDirections, fetchRoutes, fetchStopDetails, fetchStops } from './data';

jest.mock('axios');

describe('fetchRoutes', () => {
  it('fetches routes successfully from an API', async () => {
    const response = {
      data: [
        {
          route_id: 100,
          route_label: "Mock Label"
        }
      ]
    };
    const expected = [
      {
        value: 100,
        label: "Mock Label"
      }
    ]
    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    await expect(fetchRoutes()).resolves.toEqual(expected);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(fetchRoutes()).rejects.toThrow(errorMessage);
  });
});

describe('fetchDirections', () => {
  it('fetches directions successfully from an API', async () => {
    const response = {
      data: [
        {
          direction_id: 100,
          direction_name: "Mock Direction"
        }
      ]
    };
    const expected = [
      {
        value: 100,
        label: "Mock Direction"
      }
    ]
    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    await expect(fetchDirections("100")).resolves.toEqual(expected);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(fetchDirections("100")).rejects.toThrow(errorMessage);
  });

  it('throws error when invalid route is passed', async () => {
    const errorMessage = 'Please pass a valid route';
    await expect(fetchDirections()).rejects.toEqual(errorMessage);
  });
});

describe('fetchStops', () => {
  it('fetches stops successfully from an API', async () => {
    const response = {
      data: [
        {
          place_code: 100,
          description: "Mock Stop"
        }
      ]
    };
    const expected = [
      {
        value: 100,
        label: "Mock Stop"
      }
    ]
    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    await expect(fetchStops("100", 0)).resolves.toEqual(expected);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(fetchStops("100", 0)).rejects.toThrow(errorMessage);
  });
  it('throws error when invalid route or direction is passed', async () => {
    const errorMessage = 'Please pass a valid route and direction';    
    await expect(fetchStops()).rejects.toEqual(errorMessage);
  });
});


describe('fetchStopDetails', () => {
  it('fetches stop details successfully from an API', async () => {
    const response = {
      data: {
        stops: [
          {
            stop_id: 100,
            description: "Mock Stop"
          }
        ],
        departures: [{
          place_code: 100,
          description: "Mock Stop"
        }]
      }
    };
    const expected = {
       id: 100,
        description: "Mock Stop",
        departures: response.data.departures
      };
    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    await expect(fetchStopDetails("100", 0, "MOCKSTOP")).resolves.toEqual(expected);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(fetchStopDetails("100", 0, "MOCKSTOP")).rejects.toThrow(errorMessage);
  });
  it('throws error when invalid route or direction is passed', async () => {
    const errorMessage = 'Please pass a valid route, direction and stop';    
    await expect(fetchStopDetails()).rejects.toEqual(errorMessage);
  });
});

