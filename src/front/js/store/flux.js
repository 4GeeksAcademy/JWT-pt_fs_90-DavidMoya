const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,
			user: null,
		},
		actions: {
			login: (token, user) => {
				setStore({ token: token, user: user });
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null, user: null });
			},

		}
	};
};

export default getState;
