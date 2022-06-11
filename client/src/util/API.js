const fetchAPI = async (url, config) => {
  const { method, headers, body, token } = config;
  const res = await fetch(`https://banksystem-fwd.herokuapp.com/${url}`, {
    method: method || 'GET',
    headers: headers || {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: body ? JSON.stringify(body) : null,
  });
  return res.json();
};

export const LogInAPI = async (userInfo) => {
  try {
    const data = await fetchAPI('users/login', {
      method: 'POST',
      body: userInfo,
    });
    if (data.status === false) {
      throw new Error(
        data.message === 'Account is not Active'
          ? "Account is't active waiting for admin to activate it. Please try agian later!"
          : data.message
      );
    }
    if (data.status === true) {
      return {
        user: {
          ...data.user,
          token: data.accesstoken,
        },
      };
    }
  } catch (err) {
    return {
      error: err.message || 'Something went wrong!',
    };
  }
};

export const SignUpAPI = async (userInfo) => {
  try {
    const data = await fetchAPI('users/add', {
      method: 'POST',
      body: userInfo,
    });
    if (data.status === false) {
      throw new Error(data.message);
    }
    if (data.status === true) {
      return {
        msg: 'Register Successfully Waiting for Admin approval Please try logging in after a while!',
      };
    }
  } catch (err) {
    return {
      error: err.message || 'Something went wrong!',
    };
  }
};

export const MyAccountsAPI = async (token) => {
  try {
    const accounts = await fetchAPI('account/myaccounts', { token });
    if (accounts && accounts.length === 0)
      throw new Error("You don't have accounts please add your first account!");
    return { accounts };
  } catch (err) {
    return { error: err.message || 'Something went wrong!' };
  }
};

export const AddAccountAPI = async (token) => {
  try {
    const data = await fetchAPI('account/addaccount', {
      method: 'POST',
      token,
    });
    if (data.status === false) throw new Error(data.message);
    return { account: data.account };
  } catch (err) {
    return { error: err.message || 'Something went wrong!' };
  }
};

export const operateMoneyAPI = async (type, id, amount, token) => {
  try {
    const data = await fetchAPI(`account/${type}/${id}`, {
      token,
      body: { money: amount },
      method: 'PUT',
    });
    if (data.status === false) throw new Error(data.message);
    return { account: data.account };
  } catch (err) {
    return { error: err.message || 'Something went wrong!' };
  }
};

export const transferMoneyAPI = async (to, from, amount, token) => {
  try {
    console.log(to, from, amount, token);
    const data = await fetchAPI(`transformations`, {
      token,
      body: {
        amount,
        transferTo: to.trim(),
        transferFrom: from.trim(),
      },
      method: 'POST',
    });
    if (data.status === false) throw new Error(data.message);
    return { transferObj: data.transfer };
  } catch (err) {
    return { error: err.message || 'Something went wrong!' };
  }
};
