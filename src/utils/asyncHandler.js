//asyncHandler is a wrapper function 



//using .then().catch()

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
            .resolve(requestHandler(req, res, next))
            .catch((error) => next(error));
    };
};

export { asyncHandler };







//using try and catch

    // const asyncHandler = (requestHandler) => {
    //     async (err, req, res, next) => {
    //         try {
    //             await requestHandler(err, req, res, next);
    //         } catch (error) {
    //             res.status(error.code || 500).json({
    //                 success: false,
    //                 message : error.message
    //             })
    //         }
    //     }
    // }