interface PostJobOfferParams {
  data: EmploymentsPostTypes;
  headers?: {
    'Content-Type': string;
  };
}

const postJobOffer = (data: EmploymentsPostTypes) => {
  return axiosInstance.post('/employments/', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}; 