class ExpressError extends Error {
    constructor(message, status){
        super()
        this.message = message
        this.status = status
    }
}
  /** 400 BAD REQUEST error. */
  
  class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
      super(message, 400)
    }
  }
  module.exports = {
    ExpressError,
    BadRequestError
  }