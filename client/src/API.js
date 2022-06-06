export const GetAllUsersAPI = () =>
  fetch(`https://banksystem-fwd.herokuapp.com/users`)
    .then((res) => res.json())
    .then((data) => data);
