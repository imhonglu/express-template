function refineData(allowedData = []) {
    return (req, res, next) => {
        try {
            if (allowedData.length === 0) {
                next();
            }
            const result = allowedData.reduce((acc, key) => {
                acc[key] = req.body[key];
                return acc;
            }, {});

            req.body = result;
            next();
        } catch (err) {
            next(err);
        }
    };
}

export default refineData;
