export const logOut = () => {
  localStorage.removeItem('token');
  window.location.reload();
};

