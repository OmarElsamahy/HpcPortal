export const state = () => {
    user: { };
    status: false;
}


export const getters = {
    getUser(state) {
        return state.user;
    },
    getStatus(state) {
        return state.status;
    }
}

export const mutations = {
    setUser(state , user) {
        state.user= user;
    },
    removeUser(state) {
        state.user = {};
    },
    setLoggedIn(state , status) {
        state.status = true;
    },
    setLoggedOut(state , status) {
        state.status =false;
    }

}