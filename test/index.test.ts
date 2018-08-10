import { assert } from "chai";
import "mocha";
import sinon = require("sinon");

import { HelloWorld } from "../src/index";

describe("index.ts", function () {

    afterEach(function () {
        sinon.restore();
    });

    it("should exist", function () {
        assert.exists(HelloWorld);
    });

});
