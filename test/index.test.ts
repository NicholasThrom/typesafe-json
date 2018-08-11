import { assert } from "chai";
import "mocha";
import sinon = require("sinon");

import { TypedJSON } from "../src/index";

describe("index.ts", function () {

    afterEach(function () {
        sinon.restore();
    });

    describe("TypedJSON", function () {

        it("should be exported in index.ts", function () {
            assert.exists(TypedJSON);
        });

    });

});
