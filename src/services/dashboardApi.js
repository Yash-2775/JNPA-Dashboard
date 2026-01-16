import mockData from "../mock/jnpaDashboard.json";

export async function fetchDashboardData() {
  // simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });
}
