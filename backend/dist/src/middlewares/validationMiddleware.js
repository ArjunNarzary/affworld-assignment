"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const zod_1 = require("zod");
function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    [issue.path.join(".")]: issue.message,
                }));
                res.status(400).json({
                    success: false,
                    message: "Invalid data",
                    details: errorMessages,
                });
            }
            else {
                res
                    .status(500)
                    .json({ success: false, message: "Internal Server Error" });
            }
        }
    };
}
