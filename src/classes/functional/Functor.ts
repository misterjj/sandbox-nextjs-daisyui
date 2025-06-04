export abstract class Functor<A> {
   abstract map<B>(fn: (value: A) => B): Functor<B>
   abstract flatMap< B>(fn: (value: A) => Functor<B>): Functor<B>
}