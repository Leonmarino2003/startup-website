// This can be used to respond to client with custom exceptions instead of making them in the route.
// You can write and use new Exception objects here.

// Status codes https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// This is base class for all custom exceptions. Not to be used directly.
class DomainException extends Error {
  constructor(msg) {
    msg = msg || 'Undefined Exception';
    super(msg);
    this.name = this.constructor.name;
    this.msg = msg;
    this.status = 500;
  }
}

class BadRequest extends DomainException {
  constructor(msg) {
    msg = msg || 'Bad request';
    super(msg);
    this.status = 400;
  }
}

class InvalidObjectId extends BadRequest {
  constructor(msg) {
    msg = msg || 'Invalid ObjectId';
    super(msg);
  }
}

class NotFound extends DomainException {
  constructor(msg) {
    msg = msg || 'Not found';
    super(msg);
    this.status = 404;
  }
}
class UserNotFound extends NotFound {
  constructor(msg) {
    msg = msg || 'User not found';
    super(msg);
    this.userNotFound = true;
  }
}

class Conflict extends DomainException {
  constructor(msg) {
    msg = msg || 'Conflict';
    super(msg);
    this.status = 409;
  }
}

class AlreadyExists extends Conflict {
  constructor(msg) {
    msg = msg || 'Already exists';
    super(msg);
  }
}

class UserEmailAlreadyVerified extends Conflict {
  constructor(msg) {
    msg = msg || 'User email already verified';
    super(msg);
    this.userEmailAlreadyVerified = true;
  }
}

class MissingCodeCreated extends Conflict {
  constructor(msg) {
    msg = msg || 'Missing code created';
    super(msg);
    this.codeMissing = true;
  }
}

class PendingPropertyAlreadyExists extends AlreadyExists {
  constructor(msg) {
    msg = msg || 'Pending property already exists';
    super(msg);
    this.propertyAlreadyPending = true;
  }
}

class Unauthorized extends DomainException {
  constructor(msg) {
    msg = msg || 'Unauthorized';
    super(msg);
    this.status = 401;
  }
}

class Forbidden extends DomainException {
  constructor(msg) {
    msg = msg || 'Forbidden';
    super(msg);
    this.status = 403;
  }
}

class ExpiredCode extends Forbidden {
  constructor(msg) {
    msg = msg || 'Expired code';
    super(msg);
    this.codeExpired = true;
  }
}

// This is the object that will be exported and used in other files. Include your exceptions here.
const exceptionsManager = {
  BadRequest,
  InvalidObjectId,
  NotFound,
  AlreadyExists,
  Unauthorized,
  Forbidden,
  UserEmailAlreadyVerified,
  MissingCodeCreated,
  UserNotFound,
  PendingPropertyAlreadyExists,
  ExpiredCode,
};

module.exports = exceptionsManager;
