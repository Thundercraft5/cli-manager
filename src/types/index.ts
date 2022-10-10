export * from "./CliArgMap";
export * from "./CliTypes";
export * from "./CommandParameterValue";
export * from "./ObjectKey";

// 'Workaround' for achieving compile-time type inference with a constructor
type WrapperConstructor = {
	new<TR>(wrapped: () => TR): NullaryWrapper<TR>;
	new<TR, T0>(wrapped: ($0: T0) => TR): UnaryWrapper<TR, T0>;
	new<TR, T0, T1>(wrapped: ($0: T0, $1: T1) => TR): BinaryWrapper<TR, T0, T1>;
};
type $Wrapper = { invoke(...args: any[]): any };
type NullaryWrapper<TR> = $Wrapper & { invoke(): TR };
type UnaryWrapper<TR, T0> = $Wrapper & { invoke($0: T0): TR };
type BinaryWrapper<TR, T0, T1> = $Wrapper & { invoke($0: T0, $1: T1): TR };

const Wrapper: WrapperConstructor = class {
	constructor(private wrapped: Function) {}

	invoke(...args: any[]) {
		const result = this.wrapped(...args);

		console.log(`WRAPPED RESULT: ${ result }`);

		return result;
	}
};

// Above code is runtime-valid...
new Wrapper(() => 42).invoke(); // prints 'WRAPPED RESULT: 42'
new Wrapper((n: number) => n * 2).invoke(10); // prints 'WRAPPED RESULT: 20'

// ...and the invoke method has its type inferred accurately from the ctor argument
new Wrapper((n: number) => n * 2).invoke("foo");// ERROR: 'string' not assignable to 'number'
new Wrapper((a: number, b: number) => a + b).invoke();// ERROR: supplied parameters do not match signature