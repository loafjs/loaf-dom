class Error {

  /**
   * Print an error message
   *
   * @private
   */
  static warn(type, method) {
    if(type === 1) console.warn(`No elements selected by ${method}`);
  }

}

export default Error