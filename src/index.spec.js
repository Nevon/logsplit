const createLogSplitter = require("../");
const apiResponse = require("./fixtures/apiresponse");

describe("Logsplit", () => {
  describe("when called with a non-object", () => {
    it("returns the original string", () => {
      const logger = jest.fn();
      const logsplit = createLogSplitter(logger);
      const message = "Foo";

      expect(logsplit(message)).toBe(message);
      expect(logger).not.toHaveBeenCalled();
    });

    it("returns the original number", () => {
      const logger = jest.fn();
      const logsplit = createLogSplitter(logger);
      const message = 1;

      expect(logsplit(message)).toBe(message);
      expect(logger).not.toHaveBeenCalled();
    });

    it("returns the original null", () => {
      const logger = jest.fn();
      const logsplit = createLogSplitter(logger);
      const message = null;

      expect(logsplit(message)).toBe(message);
      expect(logger).not.toHaveBeenCalled();
    });

    it("returns undefined", () => {
      const logger = jest.fn();
      const logsplit = createLogSplitter(logger);
      const message = undefined;

      expect(logsplit(message)).toBe(message);
      expect(logger).not.toHaveBeenCalled();
    });

    it("returns the original NaN", () => {
      const logger = jest.fn();
      const logsplit = createLogSplitter(logger);
      const message = NaN;

      expect(logsplit(message)).toBe(message);
      expect(logger).not.toHaveBeenCalled();
    });
  });

  describe("When called with an array", () => {
    it("returns an array", () => {
      const logger = jest.fn();
      const logsplit = createLogSplitter(logger);
      const message = [];

      expect(logsplit(message)).toEqual(message);
      expect(logger).not.toHaveBeenCalled();
    });

    describe("When an item in the array is big", () => {
      let logger, logsplit, message;

      beforeEach(() => {
        logger = jest.fn();
        logsplit = createLogSplitter(logger, {
          maxByteSize: 35,
          createReference: () => "Log-Reference"
        });
        message = [{ something: "larger", than: "limit" }, { small: null }];
      });

      it("Replaces it with a reference", () => {
        expect(logsplit(message)).toEqual(["Log-Reference", message[1]]);
      });

      it("Logs the item separately with the reference", () => {
        logsplit(message);

        expect(logger).toHaveBeenCalledWith({
          $reference: "Log-Reference",
          $item: message[0]
        });
      });
    });
  });

  describe("when called with an object", () => {
    let logger, logsplit, message;

    beforeEach(() => {
      logger = jest.fn();
      logsplit = createLogSplitter(logger, {
        maxByteSize: 45,
        createReference: () => "Log-Reference"
      });
      message = {
        small: "small",
        large: [
          "This message is larger than 40 bytes, so the array should be extracted"
        ]
      };
    });

    it("returns the object", () => {
      const message = { a: "b" };
      expect(logsplit(message)).toEqual(message);
    });

    describe("When a value in the object is too large", () => {
      it("Replaces it with a reference", () => {
        expect(logsplit(message)).toEqual({
          small: "small",
          large: "Log-Reference"
        });
      });

      it("Logs the item separately with the reference", () => {
        logsplit(message);

        expect(logger).toHaveBeenCalledWith({
          $reference: "Log-Reference",
          $item: message.large
        });
      });
    });
  });

  describe("Real API response", () => {
    it("Extracts large objects", () => {
      const logger = jest.fn();
      let i = 1;
      const logsplit = createLogSplitter(logger, {
        maxByteSize: 75,
        createReference: () => `Log-Reference-${i++}`
      });

      expect(logsplit(apiResponse)).toMatchSnapshot("Return value");
      expect(logger.mock.calls).toMatchSnapshot("Extracted values");
    });
  });
});
