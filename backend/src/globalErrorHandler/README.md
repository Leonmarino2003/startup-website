Documentation for Global error handling

errorHandler is added as the last route in server.js.

exceptionsManager store custom exception objects for reuse.

When an error is thrown anywhere in the code, you catch it and pass with next(e).

The errorHandler recieves the next(e) and responds to the client with the error.

catchAsync can be used to wrap the route in a try catch. Instead of putting the try catch inside the route

Minimal example:

Inside exceptionsManager:

const exceptionsManagerManager = {
notFound : {status: 404, msg: 'Not found.'},
badRequest : {status: 400, msg: 'Bad request.'},
}

Inside service that throws exception:

async function willGiveNotFoundError(){
throw new exceptionsManager.NotFound;
}

Routes:
These 2 routes do the same but first one is smaller and uses catchAsync.js.

router.get('/thisWillGiveNotFound', catchAsync(async (req, res, next) => {
willGiveNotFoundError();
}));

router.get('/thisWillGiveNotFoundError', async (req, res, next) => {
try{
willGiveNotFound();
}catch(e){
return next(e);
}
});

Client gets:

Status 404 Bad Request
body: {success: false, msg: 'Not found.'}
