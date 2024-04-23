const mockAxios = {
    get: jest.fn().mockResolvedValue({ data: {} }), // Mock the get method with a resolved promise
    // You can add other mocked methods here if needed
};

export default mockAxios;