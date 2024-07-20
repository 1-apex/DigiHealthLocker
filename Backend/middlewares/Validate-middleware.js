

const Validate = (schema) => async (req, res, next) => {
    try {
        //the schema is the zod schema which will passed from from the in the contreoller
        // console.log(req.body);
        const paserseBody = await schema.parseAsync(req.body);
        req.body = paserseBody;
        next();

    } catch (e) {
        console.log(e);
        res.status(400).send({ result: false, message: e.errors[0].message })



    }
}

module.exports = Validate;