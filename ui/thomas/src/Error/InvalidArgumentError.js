class InvalidArgumentError extends Error {
    constructor(args) {
        super(args);

        this.name = args.name;
        if(args.expectedType) {
            this.message = `Invalid value for argument ${args.name}, expected ${args.expectedType}`
        } else {
            this.message = `Invalid value for argument ${args.name}.`
        }
    }
}

export default InvalidArgumentError
