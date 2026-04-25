export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken'); 
}
export const getType = (value, body) => {
    if (value.params) {
        return { params: body || {} };
    }

    if (value.query) {
        if (!body) return {};

        return {
            query:
                typeof body === "object"
                    ? body._id
                    : body
        };
    }

    return {};
};

   