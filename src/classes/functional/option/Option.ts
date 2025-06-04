import {Functor} from "@/classes/functional/Functor";

export class Option<A> extends Functor<A> {
    _value: A | undefined;
    isDefined: boolean
    isEmpty: boolean

    constructor(value?: A) {
        super()
        this._value = value
        if (value === undefined) {
            this.isDefined = false
            this.isEmpty = true
        }

        this.isDefined = true
        this.isEmpty = false
    }

    static of<T>(value?: T): Option<T> {
        if (value === undefined) {
            return new None()
        }

        return new Some(value)
    }

    get(): A {
        if (this.isEmpty) {
            throw new Error('Value is not defined!');
        }

        return this._value as A
    }

    getOrElse(orElse: A): A {
        if (this.isEmpty) {
            return orElse
        }

        return this._value as A
    }

    orElse(orElse: Option<A>): Option<A> {
        if (this.isEmpty) {
            return orElse
        }

        return this
    }

    map<B>(fn: (value: A) => B): Option<B> {
        if (this.isEmpty) {
            return new None()
        }

        return new Some(fn(this._value as A))
    }

    flatMap<B>(fn: (value: A) => Option<B>): Option<B> {
        if (this.isEmpty) {
            return new None()
        }

        return fn(this.get())
    }
}

export class Some<T> extends Option<T>{
    isDefined = true
    isEmpty = !this.isDefined

    constructor(value: T) {
        super(value)
    }
}


export class None extends Option<never> {
    isDefined = false
    isEmpty = !this.isDefined
    private static instance: None;

    constructor() {
        super(undefined)

        if (!!None.instance) {
            return None.instance;
        }

        None.instance = this;

        return this;
    }

    toString(): string {
        return 'None'
    }
}